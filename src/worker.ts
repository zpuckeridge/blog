import { handle } from "@astrojs/cloudflare/handler";

import { recordListeningRecent } from "@/lib/record-listening-recent";
import { recordStatusSample } from "@/lib/status-history";

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
