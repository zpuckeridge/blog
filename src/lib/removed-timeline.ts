import type { Post } from "@/interfaces/content-item";
import { tagSlugsFromPosts } from "@/lib/related-posts";
import { timelinePostPath, timelineTagPath } from "@/lib/site";

/** Permanently removed timeline posts (still 410 if present in Directus). */
export const REMOVED_TIMELINE_POST_SLUGS = new Set([
  "monitor-windows-with-grafana-and-prometheus",
  "react-based-age-calculator",
  "resize-a-proxmox-virtual-machine",
]);

/** Tag listing pages that are permanently gone. */
export const REMOVED_TIMELINE_TAG_SLUGS = new Set(["technical"]);

/**
 * Permanent redirects for removed paths. Only set when a clear replacement exists.
 * Keys are absolute site paths (no origin).
 */
export const TIMELINE_PERMANENT_REDIRECTS: Readonly<Record<string, string>> =
  {};

export const isRemovedTimelinePostSlug = (slug: string): boolean =>
  REMOVED_TIMELINE_POST_SLUGS.has(slug);

export const isRemovedTimelineTagSlug = (slug: string): boolean =>
  REMOVED_TIMELINE_TAG_SLUGS.has(slug);

export const timelinePermanentRedirect = (
  pathname: string
): string | undefined => TIMELINE_PERMANENT_REDIRECTS[pathname];

export const isRemovedTimelinePostPath = (pathname: string): boolean => {
  const prefix = "/timeline/";
  if (!pathname.startsWith(prefix) || pathname.startsWith("/timeline/tag/")) {
    return false;
  }
  const slug = pathname.slice(prefix.length).replace(/\/$/u, "");
  return slug.length > 0 && isRemovedTimelinePostSlug(slug);
};

export const isRemovedTimelineTagPath = (pathname: string): boolean => {
  const prefix = "/timeline/tag/";
  if (!pathname.startsWith(prefix)) {
    return false;
  }
  const tag = pathname.slice(prefix.length).replace(/\/$/u, "");
  return tag.length > 0 && isRemovedTimelineTagSlug(tag);
};

export const isGoneTimelinePath = (pathname: string): boolean =>
  isRemovedTimelinePostPath(pathname) || isRemovedTimelineTagPath(pathname);

export const filterPostsForPublicSite = (posts: readonly Post[]): Post[] =>
  posts.filter((post) => !isRemovedTimelinePostSlug(post.slug));

export const tagSlugsForPublicSite = (posts: readonly Post[]): string[] =>
  tagSlugsFromPosts(filterPostsForPublicSite(posts)).filter(
    (slug) => !isRemovedTimelineTagSlug(slug)
  );

export const removedTimelinePaths = (): string[] => [
  ...[...REMOVED_TIMELINE_POST_SLUGS].map((slug) => timelinePostPath(slug)),
  ...[...REMOVED_TIMELINE_TAG_SLUGS].map((tag) => timelineTagPath(tag)),
];
