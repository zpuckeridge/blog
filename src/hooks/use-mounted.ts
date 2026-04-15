"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {
  /* no-op: useSyncExternalStore requires a subscribe function */
};

/**
 * Returns true only on the client after hydration.
 * Use for components that must avoid SSR/hydration mismatches (e.g. theme-dependent UI).
 */
export const useMounted = (): boolean =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
