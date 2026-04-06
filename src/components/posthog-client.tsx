"use client";

import { posthog } from "posthog-js";
import { useEffect } from "react";

export default function PostHogClient() {
  useEffect(() => {
    const key = import.meta.env.PUBLIC_POSTHOG_KEY ?? "";
    if (!key) {
      return;
    }
    posthog.init(key, {
      api_host: import.meta.env.PUBLIC_POSTHOG_HOST,
      defaults: "2025-11-30",
    });
  }, []);

  return null;
}
