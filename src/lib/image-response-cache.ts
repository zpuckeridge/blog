/**
 * Transformed `/img/` bytes are public and addressed by their query string.
 *
 * `s-maxage` implies `proxy-revalidate`, which disables `stale-while-revalidate`
 * and makes Cloudflare block on Directus once the object expires. The Cache API
 * also ignores `stale-while-revalidate` on `cache.put`. Keep that directive on
 * the Cloudflare-only header, and give `Cache-Control` a positive `max-age`
 * with no `private`, `no-store`, or `no-cache`.
 */
export const IMAGE_EDGE_TTL_SECONDS = 2_592_000;

const IMAGE_STALE_WHILE_REVALIDATE_SECONDS = 86_400;

export const IMAGE_CACHE_CONTROL = `public, max-age=${IMAGE_EDGE_TTL_SECONDS}`;

/** Edge policy. Cloudflare strips this header before the browser sees it. */
export const IMAGE_CDN_CACHE_CONTROL = `public, max-age=${IMAGE_EDGE_TTL_SECONDS}, stale-while-revalidate=${IMAGE_STALE_WHILE_REVALIDATE_SECONDS}`;
