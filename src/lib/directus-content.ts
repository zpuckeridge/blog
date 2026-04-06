import { readItems } from "@directus/sdk";

import type {
  Book,
  Credit,
  Movie,
  Note,
  Post,
  Project,
  Video,
} from "@/interfaces/content-item";

import directus from "./directus";

interface CacheEntry<T> {
  expiresAt: number;
  value: Promise<T>;
}

const CONTENT_CACHE_TTL_MS = 1000 * 60 * 5;
const contentCache =
  (
    globalThis as typeof globalThis & {
      __blogContentCache?: Map<string, CacheEntry<unknown>>;
    }
  ).__blogContentCache ?? new Map<string, CacheEntry<unknown>>();

(
  globalThis as typeof globalThis & {
    __blogContentCache?: Map<string, CacheEntry<unknown>>;
  }
).__blogContentCache = contentCache;

const withContentCache = <T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> => {
  const now = Date.now();
  const cached = contentCache.get(key);
  if (cached && cached.expiresAt > now) {
    return cached.value as Promise<T>;
  }

  const value = (async () => {
    try {
      return await fetcher();
    } catch (error) {
      contentCache.delete(key);
      throw error;
    }
  })();
  contentCache.set(key, {
    expiresAt: now + CONTENT_CACHE_TTL_MS,
    value,
  });
  return value;
};

/**
 * Helper function to extract error details from Directus SDK errors
 */
const extractDirectusError = (
  error: unknown
): {
  message: string;
  status?: number;
  statusText?: string;
  details?: unknown;
} => {
  if (error instanceof Error) {
    // Check if error has response-like properties
    const errorAny = error as unknown as {
      response?: { status?: number; statusText?: string };
      status?: number;
      statusText?: string;
      errors?: unknown[];
    };

    const status = errorAny.response?.status ?? errorAny.status;
    const statusText = errorAny.response?.statusText ?? errorAny.statusText;
    const details = errorAny.errors ?? errorAny.response;

    return {
      details,
      message: error.message,
      status,
      statusText,
    };
  }

  return {
    message: String(error),
  };
};

/**
 * Retrieve all published posts from Directus
 */
export const getPosts = (): Promise<Post[]> =>
  withContentCache("posts", async () => {
    try {
      const posts = await directus.request(
        readItems("posts", {
          fields: [
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
          ],
          filter: {
            status: {
              _eq: "published",
            },
          },
        })
      );

      return posts as Post[];
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  });

/**
 * Retrieve a single post by slug
 */
export const getPostBySlug = (slug: string): Promise<Post | null> =>
  withContentCache(`post:${slug}`, async () => {
    try {
      const posts = await directus.request(
        readItems("posts", {
          fields: [
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
          ],
          filter: {
            slug: {
              _eq: slug,
            },
            status: {
              _eq: "published",
            },
          },
          limit: 1,
        })
      );

      return posts.length > 0 ? (posts[0] as Post) : null;
    } catch {
      return null;
    }
  });

/**
 * Retrieve all published notes from Directus
 */
export const getNotes = (): Promise<Note[]> =>
  withContentCache("notes", async () => {
    try {
      const notes = await directus.request(
        readItems("notes", {
          fields: [
            "id",
            "status",
            "date_created",
            "date_updated",
            "content",
            "tags",
          ],
          filter: {
            status: {
              _eq: "published",
            },
          },
        })
      );

      return notes as Note[];
    } catch (error) {
      const errorDetails = extractDirectusError(error);
      console.error("Error fetching notes:", {
        details: errorDetails.details,
        fullError: error,
        message: errorDetails.message,
        status: errorDetails.status,
        statusText: errorDetails.statusText,
      });
      return [];
    }
  });

/**
 * Retrieve all published videos from Directus
 */
export const getVideos = (): Promise<Video[]> =>
  withContentCache("videos", async () => {
    try {
      const videos = await directus.request(
        readItems("videos", {
          fields: [
            "id",
            "status",
            "date_created",
            "date_updated",
            "title",
            "slug",
            "description",
            "tags",
            "duration",
            "playback_id",
          ],
          filter: {
            status: {
              _eq: "published",
            },
          },
        })
      );

      return videos as Video[];
    } catch {
      return [];
    }
  });

/**
 * Retrieve a single video by slug
 */
export const getVideoBySlug = (slug: string): Promise<Video | null> =>
  withContentCache(`video:${slug}`, async () => {
    try {
      const videos = await directus.request(
        readItems("videos", {
          fields: [
            "id",
            "status",
            "date_created",
            "date_updated",
            "title",
            "slug",
            "description",
            "tags",
            "duration",
            "playback_id",
          ],
          filter: {
            slug: {
              _eq: slug,
            },
            status: {
              _eq: "published",
            },
          },
          limit: 1,
        })
      );

      return videos.length > 0 ? (videos[0] as Video) : null;
    } catch {
      return null;
    }
  });

/**
 * Retrieve all published books from Directus
 */
export const getBooks = (): Promise<Book[]> =>
  withContentCache("books", async () => {
    try {
      const books = await directus.request(
        readItems("books", {
          fields: [
            "id",
            "status",
            "date_created",
            "date_updated",
            "title",
            "isbn",
            "rating",
            "image",
            "published",
            "author",
          ],
          filter: {
            status: {
              _eq: "published",
            },
          },
        })
      );

      return books as Book[];
    } catch (error) {
      console.error("Error fetching books:", error);
      return [];
    }
  });

/**
 * Retrieve all published movies from Directus
 */
export const getMovies = (): Promise<Movie[]> =>
  withContentCache("movies", async () => {
    try {
      const movies = await directus.request(
        readItems("movies", {
          fields: [
            "id",
            "status",
            "date_created",
            "date_updated",
            "title",
            "rating",
            "setting",
            "image",
            "with",
          ],
          filter: {
            status: {
              _eq: "published",
            },
          },
        })
      );

      return movies as Movie[];
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  });

/**
 * Retrieve all published credits from Directus
 */
export const getCredits = (): Promise<Credit[]> =>
  withContentCache("credits", async () => {
    try {
      const credits = await directus.request(
        readItems("credits", {
          fields: [
            "id",
            "status",
            "date_created",
            "date_updated",
            "title",
            "description",
            "image",
            "link",
            "director",
            "tags",
            "release_date",
          ],
          filter: {
            status: {
              _eq: "published",
            },
          },
        })
      );

      return credits as Credit[];
    } catch {
      return [];
    }
  });

/**
 * Retrieve all published projects from Directus
 */
export const getProjects = (): Promise<Project[]> =>
  withContentCache("projects", async () => {
    try {
      const projects = await directus.request(
        readItems("projects", {
          fields: [
            "id",
            "status",
            "date_created",
            "date_updated",
            "name",
            "description",
            "image",
            "video",
            "link",
            "year_completed",
            "tags",
          ],
          filter: {
            status: {
              _in: ["published", "archived", "work_in_progress"],
            },
          },
        })
      );

      return projects as Project[];
    } catch {
      return [];
    }
  });
