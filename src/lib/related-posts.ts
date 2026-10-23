import type { Post } from "@/interfaces/content-item";

export interface RelatedPostLink {
  slug: string;
  title: string;
}

export const tagSlug = (tag: string): string =>
  tag
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gu, "-")
    .replaceAll(/^-|-$/gu, "");

const byNewest = (left: Post, right: Post): number =>
  new Date(right.date_created).getTime() -
  new Date(left.date_created).getTime();

export const postsForTag = (posts: readonly Post[], slug: string): Post[] =>
  posts
    .filter((post) => (post.tags ?? []).some((tag) => tagSlug(tag) === slug))
    .toSorted(byNewest);

export const relatedPostLinks = (
  post: Pick<Post, "slug" | "tags">,
  posts: readonly Post[],
  limit = 3
): RelatedPostLink[] => {
  const tags = new Set(
    (post.tags ?? []).map((tag) => tagSlug(tag)).filter((tag) => tag.length > 0)
  );
  if (tags.size === 0) {
    return [];
  }

  return posts
    .filter(
      (candidate) =>
        candidate.slug !== post.slug &&
        (candidate.tags ?? []).some((tag) => tags.has(tagSlug(tag)))
    )
    .toSorted(byNewest)
    .slice(0, limit)
    .map((candidate) => ({ slug: candidate.slug, title: candidate.title }));
};

export const tagSlugsFromPosts = (posts: readonly Post[]): string[] => {
  const slugs = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      const slug = tagSlug(tag);
      if (slug) {
        slugs.add(slug);
      }
    }
  }
  return [...slugs].toSorted();
};
