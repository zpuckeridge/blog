import { handle } from "@astrojs/cloudflare/handler";

import { recordAppleMusicRecent } from "@/lib/record-apple-music-recent";
import { recordListeningRecent } from "@/lib/record-listening-recent";
import { recordStatusSample } from "@/lib/status-history";

const APPLE_MUSIC_CRON = "*/30 * * * *";

export { ActivityFeedStore } from "@/lib/activity-feed-store";

export default {
  fetch: handle,

  async scheduled(
    _controller: ScheduledController,
    env: Cloudflare.Env
  ): Promise<void> {
    const kv = env.LOCATION_KV;
    if (!kv) {
      console.error("LOCATION_KV is not configured; skipping listening poll");
      return;
    }

    try {
      if (_controller.cron === APPLE_MUSIC_CRON) {
        const appleResult = await recordAppleMusicRecent(
          kv,
          env,
          _controller.scheduledTime
        );

        if (appleResult.baselineOnly) {
          console.log("Apple Music poll stored baseline track list");
        } else if (appleResult.skippedAuth) {
          console.warn("Apple Music poll skipped (missing or rejected token)");
        } else if (appleResult.ingested > 0) {
          console.log(
            `Apple Music poll ingested ${appleResult.ingested} track(s)`
          );
        }

        return;
      }

      const [listeningResult, statusResult] = await Promise.all([
        recordListeningRecent(kv),
        recordStatusSample(kv, _controller.scheduledTime),
      ]);

      if (listeningResult.recorded) {
        console.log(
          "Recorded listening recent:",
          listeningResult.recents[0]?.track,
          "—",
          listeningResult.recents[0]?.artist
        );
      }

      if (listeningResult.historyRecorded) {
        console.log(
          "Recorded listening history:",
          listeningResult.recents[0]?.track,
          "—",
          listeningResult.recents[0]?.artist
        );
      }

      if (statusResult.recorded) {
        console.log("Recorded status history sample");
      }
    } catch (error) {
      console.error("Scheduled worker poll failed", error);
      throw error;
    }
  },
};

interface ScheduledController {
  cron: string;
  scheduledTime: number;
}
