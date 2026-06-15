/**
 * Prefer `requestIdleCallback` when available; uses `Reflect` so the timeout fallback
 * is not narrowed to `never` under TypeScript DOM typings (`in window` guards).
 */
export const scheduleIdleOrFallback = function scheduleIdleOrFallback(
  fn: () => void,
  fallbackMs: number
): { cancel: () => void } {
  const ricUnknown = Reflect.get(globalThis, "requestIdleCallback");
  const cicUnknown = Reflect.get(globalThis, "cancelIdleCallback");

  if (typeof ricUnknown === "function" && typeof cicUnknown === "function") {
    const id = ricUnknown(fn) as number;
    return {
      cancel: () => {
        cicUnknown(id);
      },
    };
  }

  const id = globalThis.setTimeout(fn, fallbackMs);
  return {
    cancel: () => globalThis.clearTimeout(id),
  };
};
