const BOT_PATTERN =
  /bot|crawl|spider|slurp|lighthouse|pagespeed|headless|preview|website.?carbon|gtmetrix|pingdom|uptime/iu;

export const isLikelyBotUserAgent = (
  userAgent: string | null | undefined
): boolean => (userAgent ? BOT_PATTERN.test(userAgent) : false);

/** Heuristic for audit crawlers and bots that should not load analytics widgets. */
export const isLikelyBot = (): boolean => {
  if (typeof navigator === "undefined") {
    return true;
  }

  if (navigator.webdriver) {
    return true;
  }

  return isLikelyBotUserAgent(navigator.userAgent);
};
