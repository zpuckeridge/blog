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

export const recordAppleMusicRecent = async (
  kv: AppleMusicPollKv,
  env: AppleMusicPollEnv,
  scheduledTime = Date.now()
): Promise<{
  baselineOnly: boolean;
  ingested: number;
  recents: RecentListen[];
  skippedAuth: boolean;
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
      written: false,
    };
  }

  const tracks = await fetchAppleMusicRecentTracks(
    developerToken,
    musicUserToken
  );

  if (tracks === null) {
    console.warn(
      "Apple Music user token was rejected; skipping poll until reconnect"
    );
    return {
      baselineOnly: false,
      ingested: 0,
      recents: existingRecents,
      skippedAuth: true,
      written: false,
    };
  }

  const nextIds = trackIdsFromPoll(tracks);
  const previousIds = pollState?.trackIds ?? [];
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
      written: true,
    };
  }

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

  const writes = [pollStateWrite];

  if (applied.ingested > 0 || applied.recents !== existingRecents) {
    writes.push(
      kv.put(LISTENING_RECENTS_KV_KEY, JSON.stringify(applied.recents))
    );
  }

  if (applied.historyChanged) {
    writes.push(
      kv.put(LISTENING_HISTORY_KV_KEY, JSON.stringify(applied.history))
    );
  }

  await Promise.all(writes);

  return {
    baselineOnly: false,
    ingested: applied.ingested,
    recents: applied.recents,
    skippedAuth: false,
    written:
      applied.ingested > 0 ||
      applied.recents !== existingRecents ||
      applied.historyChanged,
  };
};
