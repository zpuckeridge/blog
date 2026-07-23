import { handle } from "@astrojs/cloudflare/handler";

import { recordListeningRecent } from "@/lib/record-listening-recent";

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
      const result = await recordListeningRecent(kv);
      if (result.recorded) {
        console.log(
          "Recorded listening recent:",
          result.recents[0]?.track,
          "—",
          result.recents[0]?.artist
        );
      }
    } catch (error) {
      console.error("Scheduled listening poll failed", error);
      throw error;
    }
  },
};

interface ScheduledController {
  cron: string;
  scheduledTime: number;
}
