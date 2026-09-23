import { useEffect } from "react";

import { getActivityVisitorId } from "@/lib/activity-visitor";
import { scheduleIdleOrFallback } from "@/lib/defer-after-idle";
import { isLikelyBot } from "@/lib/is-likely-bot";

const CAPTURE_FALLBACK_MS = 2000;

const ActivityCapture = () => {
  useEffect(() => {
    if (isLikelyBot()) {
      return;
    }

    let disposed = false;
    let captured = false;
    let idle: { cancel: () => void } | null = null;

    const capture = (): void => {
      idle = null;

      if (disposed || captured || document.visibilityState === "hidden") {
        return;
      }

      captured = true;

      const payload = new Blob(
        [
          JSON.stringify({
            title: document.title,
            visitorId: getActivityVisitorId(),
          }),
        ],
        { type: "application/json" }
      );
      navigator.sendBeacon("/api/activity/capture", payload);
    };

    const scheduleCapture = (): void => {
      if (
        disposed ||
        captured ||
        document.visibilityState === "hidden" ||
        idle
      ) {
        return;
      }

      idle = scheduleIdleOrFallback(capture, CAPTURE_FALLBACK_MS);
    };

    const handleVisibilityChange = (): void => {
      if (document.visibilityState === "hidden") {
        idle?.cancel();
        idle = null;
        return;
      }

      scheduleCapture();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    scheduleCapture();

    return () => {
      disposed = true;
      idle?.cancel();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
};

export default ActivityCapture;
