"use client";

import { useEffect } from "react";

import { isLikelyBot } from "@/lib/is-likely-bot";

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
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("keydown", onInteraction);
      window.removeEventListener("scroll", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
      void start();
    };

    window.addEventListener("pointerdown", onInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", onInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("scroll", onInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("touchstart", onInteraction, {
      once: true,
      passive: true,
    });

    const idleFallbackId = globalThis.setTimeout(() => {
      void start();
    }, 12_000);

    return () => {
      disposed = true;
      globalThis.clearTimeout(idleFallbackId);
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("keydown", onInteraction);
      window.removeEventListener("scroll", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
    };
  }, []);

  return null;
}
