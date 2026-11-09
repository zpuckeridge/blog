import { readItems } from "@directus/sdk";

import type { Post } from "@/interfaces/content-item";
import { withContentCache } from "@/lib/directus-content-cache";
import { isUnknownWorkInProgressFieldError } from "@/lib/directus-sdk-errors";

import directus from "./directus";

const POST_FIELDS = [
  "id",
  "status",
  "date_created",
  "date_updated",
  "title",
  "slug",
  "image",
  "image_alt",
  "description",
  "tags",
  "content",
  "signature",
  "work_in_progress",
] as const;

const POST_FIELDS_WITHOUT_WIP = POST_FIELDS.filter(
  (field) => field !== "work_in_progress"
);

const requestPublishedPosts = async (query: {
  filter: {
    slug?: { _eq: string };
    status: { _eq: "published" };
  };
  limit?: number;
}): Promise<Post[]> => {
  try {
    return (await directus.request(
      readItems("posts", {
        fields: [...POST_FIELDS],
        ...query,
      })
    )) as Post[];
  } catch (error) {
    if (!isUnknownWorkInProgressFieldError(error)) {
      throw error;
    }

    return (await directus.request(
      readItems("posts", {
        fields: [...POST_FIELDS_WITHOUT_WIP],
        ...query,
      })
    )) as Post[];
  }
};

export const getPosts = (): Promise<Post[]> =>
  withContentCache("posts", async () => {
    try {
      return await requestPublishedPosts({
        filter: {
          status: {
            _eq: "published",
          },
        },
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  });

export const getPostBySlug = (slug: string): Promise<Post | null> =>
  withContentCache(`post:${slug}`, async () => {
    try {
      const posts = await requestPublishedPosts({
        filter: {
          slug: {
            _eq: slug,
          },
          status: {
            _eq: "published",
          },
        },
        limit: 1,
      });

      return posts.length > 0 ? (posts[0] as Post) : null;
    } catch {
      return null;
    }
  });
