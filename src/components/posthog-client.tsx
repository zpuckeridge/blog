"use client";

import { useEffect } from "react";

import { scheduleIdleOrFallback } from "@/lib/defer-after-idle";
import { isLikelyBot } from "@/lib/is-likely-bot";

const INTERACTION_EVENTS = [
  "pointerdown",
  "keydown",
  "scroll",
  "touchstart",
] as const;

export default function PostHogClient() {
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

    const onInteraction = () => {
      for (const eventName of INTERACTION_EVENTS) {
        window.removeEventListener(eventName, onInteraction);
      }
      void start();
    };

    for (const eventName of INTERACTION_EVENTS) {
      window.addEventListener(eventName, onInteraction, {
        once: true,
        passive: true,
      });
    }

    const deferred = scheduleIdleOrFallback(() => {
      void start();
    }, 12000);

    return () => {
      disposed = true;
      deferred.cancel();
      for (const eventName of INTERACTION_EVENTS) {
        window.removeEventListener(eventName, onInteraction);
      }
    };
  }, []);

  return null;
}
