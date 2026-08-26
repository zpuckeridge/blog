import { useEffect } from "react";

import { scheduleIdleOrFallback } from "@/lib/defer-after-idle";
import { isLikelyBot } from "@/lib/is-likely-bot";

/** Idle fallback so first-page views still fire if the browser stays busy. */
const IDLE_FALLBACK_MS = 1500;

interface PostHogClientProps {
  apiHost: string;
  apiKey: string;
}

/**
 * Key and host must be passed as props. Reading an empty
 * `import.meta.env.PUBLIC_POSTHOG_KEY` at build time lets Vite dead-code
 * eliminate `posthog.init`.
 */
const PostHogClient = ({ apiHost, apiKey }: PostHogClientProps) => {
  useEffect(() => {
    if (!apiKey || isLikelyBot()) {
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
          posthog.init(apiKey, {
            api_host: apiHost,
            defaults: "2026-01-30",
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
  }, [apiHost, apiKey]);

  return null;
};

export default PostHogClient;
