import { subscribeLanyardPresence } from "@/lib/lanyard-client";
import type { LanyardPresence } from "@/lib/lanyard-status";

type PresenceListener = (presence: LanyardPresence) => void;

const listeners = new Set<PresenceListener>();
let cleanup: (() => void) | null = null;
let lastPresence: LanyardPresence | null = null;
let activeUserId: string | null = null;

export const watchLanyardPresence = (
  userId: string,
  listener: PresenceListener
): (() => void) => {
  listeners.add(listener);

  if (lastPresence) {
    listener(lastPresence);
  }

  if (!cleanup || activeUserId !== userId) {
    cleanup?.();
    activeUserId = userId;
    cleanup = subscribeLanyardPresence(userId, (presence) => {
      lastPresence = presence;
      for (const fn of listeners) {
        fn(presence);
      }
    });
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0) {
      cleanup?.();
      cleanup = null;
      lastPresence = null;
      activeUserId = null;
    }
  };
};

export const teardownLanyardPresenceHub = (): void => {
  cleanup?.();
  cleanup = null;
  lastPresence = null;
  activeUserId = null;
  listeners.clear();
};
