"use client";

import { useEffect } from "react";

import { scheduleIdleOrFallback } from "@/lib/defer-after-idle";

export default function PostHogClient() {
  useEffect(() => {
    const key = import.meta.env.PUBLIC_POSTHOG_KEY ?? "";
    if (!key) {
      return;
    }

    let disposed = false;
    const start = async () => {
      try {
        if (disposed) {
          return;
        }

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

    const deferred = scheduleIdleOrFallback(() => {
      void start();
    }, 1500);

    return () => {
      disposed = true;
      deferred.cancel();
    };
  }, []);

  return null;
}
