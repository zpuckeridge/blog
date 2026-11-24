import { isDuplicateListenAcrossSources } from "@/lib/apple-music-dedupe";
import type { AppleMusicPollDiffEntry } from "@/lib/apple-music-poll-logic";
import { mapAppleMusicSong } from "@/lib/apple-music-track";
import { appendListenPlay } from "@/lib/listening-history";
import type { ListenPlay } from "@/lib/listening-history";
import { upsertRecentListen } from "@/lib/listening-recents";
import type { RecentListen } from "@/lib/listening-recents";

export interface AppleMusicIngestResult {
  history: ListenPlay[];
  historyChanged: boolean;
  ingested: number;
  newPlays: ListenPlay[];
  recents: RecentListen[];
}

export const applyAppleMusicAdditions = (
  additions: readonly AppleMusicPollDiffEntry[],
  listenTimes: readonly number[],
  scheduledTime: number,
  existingRecents: readonly RecentListen[],
  existingHistory: readonly ListenPlay[]
): AppleMusicIngestResult => {
  let recents = [...existingRecents];
  let history = [...existingHistory];
  let historyChanged = false;
  let ingested = 0;
  const newPlays: ListenPlay[] = [];

  for (let index = additions.length - 1; index >= 0; index -= 1) {
    const addition = additions[index];
    const mapped = mapAppleMusicSong(addition.track);
    if (!mapped) {
      continue;
    }

    const listenedAt = listenTimes[index] ?? scheduledTime;
    if (
      isDuplicateListenAcrossSources(
        mapped.track,
        mapped.artist,
        listenedAt,
        history
      )
    ) {
      continue;
    }

    const { appleId: _appleId, ...song } = mapped;
    recents = upsertRecentListen(recents, song, listenedAt);
    const appended = appendListenPlay(history, song, listenedAt);
    history = [...appended.plays];
    historyChanged ||= appended.changed;
    if (appended.appended) {
      ingested += 1;
      const [play] = appended.plays;
      if (play) {
        newPlays.push(play);
      }
    }
  }

  return {
    history,
    historyChanged,
    ingested,
    newPlays,
    recents,
  };
};
