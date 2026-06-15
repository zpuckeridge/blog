const BOT_PATTERN =
  /bot|crawl|spider|slurp|lighthouse|pagespeed|headless|preview|website.?carbon|gtmetrix|pingdom|uptime/i;

/** Heuristic for audit crawlers and bots that should not load analytics widgets. */
export const isLikelyBot = (): boolean => {
  if (typeof navigator === "undefined") {
    return true;
  }

  if (navigator.webdriver) {
    return true;
  }

  return BOT_PATTERN.test(navigator.userAgent);
};
