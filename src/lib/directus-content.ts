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

const NOTE_FIELDS = [
  "id",
  "status",
  "date_created",
  "date_updated",
  "content",
  "tags",
  "is_x",
  "x_url",
] as const;

const NOTE_FIELDS_WITHOUT_X = NOTE_FIELDS.filter(
  (field) => field !== "is_x" && field !== "x_url"
);

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

const isUnknownDirectusFieldError = (
  error: unknown,
  fieldNames: readonly string[]
): boolean => {
  const extracted = extractDirectusError(error);
  const text =
    `${extracted.message} ${JSON.stringify(extracted.details ?? "")}`.toLowerCase();

  return (
    fieldNames.some((field) => text.includes(field.toLowerCase())) ||
    text.includes("does not exist") ||
    text.includes("invalid field") ||
    text.includes("unknown field") ||
    text.includes("don't have permission to access field")
  );
};

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
    if (!isUnknownDirectusFieldError(error, ["work_in_progress"])) {
      throw error;
    }

    // Directus rejects unknown fields. Retry without the toggle until it exists.
    return (await directus.request(
      readItems("posts", {
        fields: [...POST_FIELDS_WITHOUT_WIP],
        ...query,
      })
    )) as Post[];
  }
};

/**
 * Retrieve all published posts from Directus
 */
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

/**
 * Retrieve a single post by slug
 */
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

const requestPublishedNotes = async (): Promise<Note[]> => {
  try {
    return (await directus.request(
      readItems("notes", {
        fields: [...NOTE_FIELDS],
        filter: {
          status: {
            _eq: "published",
          },
        },
      })
    )) as Note[];
  } catch (error) {
    if (!isUnknownDirectusFieldError(error, ["is_x", "x_url"])) {
      throw error;
    }

    // Directus rejects unknown fields. Retry without X fields until they exist.
    return (await directus.request(
      readItems("notes", {
        fields: [...NOTE_FIELDS_WITHOUT_X],
        filter: {
          status: {
            _eq: "published",
          },
        },
      })
    )) as Note[];
  }
};

/**
 * Retrieve all published notes from Directus
 */
export const getNotes = (): Promise<Note[]> =>
  withContentCache("notes", async () => {
    try {
      return await requestPublishedNotes();
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
