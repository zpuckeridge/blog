"use client";

import { useEffect } from "react";

export default function PostHogClient() {
  useEffect(() => {
    const key = import.meta.env.PUBLIC_POSTHOG_KEY ?? "";
    if (!key) {
      return;
    }

    let disposed = false;
    const start = async () => {
      try {
        const { posthog } = await import("posthog-js");
        if (disposed) {
          return;
        }

        posthog.init(key, {
          api_host: import.meta.env.PUBLIC_POSTHOG_HOST,
          defaults: "2025-11-30",
        });
      } catch (error) {
        console.error("Failed to initialize PostHog", error);
      }
    };

    const idleCallbackId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(start)
        : window.setTimeout(start, 1500);

    return () => {
      disposed = true;
      if (
        "cancelIdleCallback" in window &&
        typeof idleCallbackId === "number"
      ) {
        window.cancelIdleCallback(idleCallbackId);
        return;
      }
      window.clearTimeout(idleCallbackId);
    };
  }, []);

  return null;
}
