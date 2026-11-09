import type { MutableRefObject } from "react";

import type { ObservedListen } from "@/lib/lanyard-status";
import { sameListeningSession } from "@/lib/listening-history";
import type { RecentListen } from "@/lib/listening-recents";

export const recordRecent = async (): Promise<RecentListen[] | null> => {
  try {
    const response = await fetch("/api/listening/recents", { method: "POST" });
    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as {
      accepted?: boolean;
      recents?: RecentListen[];
    };
    if (payload.accepted === false) {
      return null;
    }
    return Array.isArray(payload.recents) ? payload.recents : null;
  } catch {
    return null;
  }
};

export const persistRecentSession = async (
  listen: ObservedListen,
  lastRecordedRef: MutableRefObject<ObservedListen | null>,
  afterRecord: (recents: RecentListen[] | null) => Promise<void>
): Promise<void> => {
  if (
    lastRecordedRef.current &&
    sameListeningSession(lastRecordedRef.current, listen)
  ) {
    return;
  }

  lastRecordedRef.current = listen;
  const recorded = await recordRecent();
  await afterRecord(recorded);
};
