/** Matches Tailwind `animate-pulse` duration. */
export const STATUS_PULSE_DURATION_MS = 2000;

const STATUS_DOT_SELECTOR = "[data-status-dot]";

const wallClockPulseDelayMs = (): number =>
  -(Date.now() % STATUS_PULSE_DURATION_MS);

/** Restart so `animation-delay` applies from a clean timeline origin. */
const applyPulseDelay = (element: HTMLElement, delayMs: number): void => {
  element.style.animation = "none";
  void element.offsetWidth;
  element.style.removeProperty("animation");
  element.style.animationDelay = `${delayMs}ms`;
};

/**
 * Phase-align status pulses to one shared wall-clock timeline.
 * Re-syncs every pulsing status dot so location + Lanyard stay locked.
 */
export const syncStatusPulse = (
  element: HTMLElement,
  enabled: boolean
): void => {
  element.dataset.statusDot = "";

  if (!enabled) {
    element.classList.remove("status-pulse");
    element.style.removeProperty("animation");
    element.style.removeProperty("animation-delay");
    return;
  }

  element.classList.add("status-pulse");
  const delayMs = wallClockPulseDelayMs();

  for (const dot of document.querySelectorAll(STATUS_DOT_SELECTOR)) {
    if (!(dot instanceof HTMLElement)) {
      continue;
    }
    if (!dot.classList.contains("status-pulse")) {
      continue;
    }
    applyPulseDelay(dot, delayMs);
  }
};
