import { useEffect } from "react";

import { scheduleIdleOrFallback } from "@/lib/defer-after-idle";
import { isLikelyBot } from "@/lib/is-likely-bot";

/** Idle fallback so first-page views still fire if the browser stays busy. */
const IDLE_FALLBACK_MS = 1500;

/**
 * Production must set PUBLIC_POSTHOG_KEY and PUBLIC_POSTHOG_HOST
 * (see .env.example). Never log those values.
 */
const PostHogClient = () => {
  useEffect(() => {
    const key = import.meta.env.PUBLIC_POSTHOG_KEY ?? "";
    if (!key || isLikelyBot()) {
      return;
    }

    let disposed = false;
    let started = false;

    const start = async () => {
      if (disposed || started) {
        return;
      }
      started = true;

      try {
        const { posthog } = await import("posthog-js");
        if (!disposed) {
          posthog.init(key, {
            api_host: import.meta.env.PUBLIC_POSTHOG_HOST,
            defaults: "2025-11-30",
          });
        }
      } catch (error) {
        console.error("Failed to initialize PostHog", error);
      }
    };

    const idle = scheduleIdleOrFallback(() => {
      void start();
    }, IDLE_FALLBACK_MS);

    return () => {
      disposed = true;
      idle.cancel();
    };
  }, []);

  return null;
};

export default PostHogClient;
