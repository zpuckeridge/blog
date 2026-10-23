/**
 * HTML content security policy. Image responses keep their own sandbox policy.
 * Allows the Cloudflare Web Analytics beacon and challenge scripts, plus the
 * third parties this site already calls.
 */
export const HTML_CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://challenges.cloudflare.com https://us.i.posthog.com https://us-assets.i.posthog.com https://platform.twitter.com https://cdn.syndication.twimg.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self'",
  "connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com https://challenges.cloudflare.com https://us.i.posthog.com https://us-assets.i.posthog.com https://api.lanyard.rest wss://api.lanyard.rest https://*.mux.com https://*.litix.io https://cdn.discordapp.com https://i.scdn.co https://syndication.twitter.com",
  "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com https://challenges.cloudflare.com https://platform.twitter.com https://syndication.twitter.com",
  "media-src 'self' blob: https://*.mux.com",
  "worker-src 'self' blob:",
].join("; ");
