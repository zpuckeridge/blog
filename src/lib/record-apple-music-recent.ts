import { fetchAppleMusicRecentTracks } from "@/lib/apple-music-api";
import { createAppleMusicDeveloperToken } from "@/lib/apple-music-developer-token";
import type { AppleMusicSigningEnv } from "@/lib/apple-music-developer-token";
import {
  APPLE_MUSIC_POLL_STATE_KV_KEY,
  APPLE_MUSIC_USER_TOKEN_KV_KEY,
  parseAppleMusicPollState,
} from "@/lib/apple-music-kv";
import {
  diffAppleMusicPoll,
  spreadAppleMusicListenTimes,
  trackIdsFromPoll,
} from "@/lib/apple-music-poll-logic";
import { applyAppleMusicAdditions } from "@/lib/apply-apple-music-additions";
import {
  LISTENING_HISTORY_KV_KEY,
  parseListenHistory,
} from "@/lib/listening-history";
import { persistListeningUpdates } from "@/lib/listening-kv-writes";
import {
  LISTENING_RECENTS_KV_KEY,
  parseRecentListens,
} from "@/lib/listening-recents";
import type { RecentListen } from "@/lib/listening-recents";

interface AppleMusicPollKv {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
}

export interface AppleMusicPollEnv extends AppleMusicSigningEnv {
  APPLE_MUSIC_USER_TOKEN?: string;
}

const commitApplePollAdditions = async (
  kv: AppleMusicPollKv,
  pollStateWrite: Promise<void>,
  additions: ReturnType<typeof diffAppleMusicPoll>,
  scheduledTime: number,
  existingRecents: RecentListen[],
  existingHistory: ReturnType<typeof parseListenHistory>
): Promise<{
  ingested: number;
  recents: RecentListen[];
  written: boolean;
}> => {
  const listenTimes = spreadAppleMusicListenTimes(
    additions.length,
    scheduledTime
  );
  const applied = applyAppleMusicAdditions(
    additions,
    listenTimes,
    scheduledTime,
    existingRecents,
    existingHistory
  );

  const writes: Promise<void>[] = [pollStateWrite];

  if (applied.ingested > 0 || applied.recents !== existingRecents) {
    writes.push(
      kv.put(LISTENING_RECENTS_KV_KEY, JSON.stringify(applied.recents))
    );
  }

  await Promise.all(writes);

  if (applied.historyChanged || applied.newPlays.length > 0) {
    await persistListeningUpdates(kv, {
      history: {
        appended: applied.ingested > 0,
        changed: applied.historyChanged,
        plays: applied.history,
      },
      statsPlays: applied.newPlays,
    });
  }

  return {
    ingested: applied.ingested,
    recents: applied.recents,
    written:
      applied.ingested > 0 ||
      applied.recents !== existingRecents ||
      applied.historyChanged,
  };
};

export const recordAppleMusicRecent = async (
  kv: AppleMusicPollKv,
  env: AppleMusicPollEnv,
  scheduledTime = Date.now()
): Promise<{
  baselineOnly: boolean;
  ingested: number;
  recents: RecentListen[];
  skippedAuth: boolean;
  skippedEmptyPoll: boolean;
  written: boolean;
}> => {
  const [recentsRaw, historyRaw, pollStateRaw, storedUserToken] =
    await Promise.all([
      kv.get(LISTENING_RECENTS_KV_KEY),
      kv.get(LISTENING_HISTORY_KV_KEY),
      kv.get(APPLE_MUSIC_POLL_STATE_KV_KEY),
      kv.get(APPLE_MUSIC_USER_TOKEN_KV_KEY),
    ]);

  const existingRecents = parseRecentListens(recentsRaw);
  const existingHistory = parseListenHistory(historyRaw);
  const pollState = parseAppleMusicPollState(pollStateRaw);
  const musicUserToken =
    storedUserToken?.trim() || env.APPLE_MUSIC_USER_TOKEN?.trim() || "";

  if (!musicUserToken) {
    return {
      baselineOnly: false,
      ingested: 0,
      recents: existingRecents,
      skippedAuth: true,
      skippedEmptyPoll: false,
      written: false,
    };
  }

  const developerToken = await createAppleMusicDeveloperToken(env);
  if (!developerToken) {
    console.error(
      "Apple Music developer token could not be created; check signing secrets"
    );
    return {
      baselineOnly: false,
      ingested: 0,
      recents: existingRecents,
      skippedAuth: true,
      skippedEmptyPoll: false,
      written: false,
    };
  }

  const tracks = await fetchAppleMusicRecentTracks(
    developerToken,
    musicUserToken
  );

  if (tracks === null) {
    console.warn(
      "Apple Music user token was rejected; skipping poll until token is renewed"
    );
    return {
      baselineOnly: false,
      ingested: 0,
      recents: existingRecents,
      skippedAuth: true,
      skippedEmptyPoll: false,
      written: false,
    };
  }

  const previousIds = pollState?.trackIds ?? [];

  if (tracks.length === 0 && previousIds.length > 0) {
    console.warn(
      "Apple Music poll returned no tracks; keeping previous poll baseline"
    );
    return {
      baselineOnly: false,
      ingested: 0,
      recents: existingRecents,
      skippedAuth: false,
      skippedEmptyPoll: true,
      written: false,
    };
  }

  const nextIds = trackIdsFromPoll(tracks);
  const additions = diffAppleMusicPoll(previousIds, tracks);

  const pollStateWrite = kv.put(
    APPLE_MUSIC_POLL_STATE_KV_KEY,
    JSON.stringify({
      trackIds: nextIds,
      updatedAt: scheduledTime,
    })
  );

  if (previousIds.length === 0) {
    await pollStateWrite;
    return {
      baselineOnly: true,
      ingested: 0,
      recents: existingRecents,
      skippedAuth: false,
      skippedEmptyPoll: false,
      written: true,
    };
  }

  if (additions.length === 0) {
    await pollStateWrite;
    return {
      baselineOnly: false,
      ingested: 0,
      recents: existingRecents,
      skippedAuth: false,
      skippedEmptyPoll: false,
      written: true,
    };
  }

  const committed = await commitApplePollAdditions(
    kv,
    pollStateWrite,
    additions,
    scheduledTime,
    existingRecents,
    existingHistory
  );

  return {
    baselineOnly: false,
    ingested: committed.ingested,
    recents: committed.recents,
    skippedAuth: false,
    skippedEmptyPoll: false,
    written: committed.written,
  };
};
