import { readItems } from "@directus/sdk";

import type {
  Book,
  Credit,
  Movie,
  Note,
  Project,
  UseItem,
  Video,
} from "@/interfaces/content-item";
import { withContentCache } from "@/lib/directus-content-cache";
import {
  extractDirectusError,
  isUnknownUsesSortFieldError,
} from "@/lib/directus-sdk-errors";

import directus from "./directus";

const VIDEO_FIELDS = [
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
] as const;

export type { DirectusFileMeta } from "@/lib/directus-files";
export { getDirectusFileMeta } from "@/lib/directus-files";
export { getPostBySlug, getPosts } from "@/lib/directus-posts";

const USE_FIELDS = [
  "id",
  "status",
  "date_created",
  "date_updated",
  "category",
  "category_sort",
  "sort",
  "title",
  "description",
] as const;

const USE_FIELDS_WITHOUT_SORT = USE_FIELDS.filter(
  (field) => field !== "category_sort" && field !== "sort"
);

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

export const getVideos = (): Promise<Video[]> =>
  withContentCache("videos", async () => {
    try {
      const videos = await directus.request(
        readItems("videos", {
          fields: [...VIDEO_FIELDS],
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

export const getVideoBySlug = (slug: string): Promise<Video | null> =>
  withContentCache(`video:${slug}`, async () => {
    try {
      const videos = await directus.request(
        readItems("videos", {
          fields: [...VIDEO_FIELDS],
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
          sort: ["-date_created"],
        })
      );

      return books as Book[];
    } catch (error) {
      console.error("Error fetching books:", error);
      return [];
    }
  });

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
          sort: ["-date_created"],
        })
      );

      return movies as Movie[];
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  });

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
          sort: ["-release_date"],
        })
      );

      return credits as Credit[];
    } catch {
      return [];
    }
  });

export const getUses = (): Promise<UseItem[]> =>
  withContentCache(
    "uses",
    async () => {
      try {
        const uses = await directus.request(
          readItems("uses", {
            fields: [...USE_FIELDS],
            filter: {
              status: {
                _eq: "published",
              },
            },
            sort: ["category_sort", "sort"],
          })
        );

        return uses as UseItem[];
      } catch (error) {
        if (!isUnknownUsesSortFieldError(error)) {
          console.error("Error fetching uses:", error);
          return [];
        }

        try {
          const uses = await directus.request(
            readItems("uses", {
              fields: [...USE_FIELDS_WITHOUT_SORT],
              filter: {
                status: {
                  _eq: "published",
                },
              },
            })
          );

          return uses as UseItem[];
        } catch (retryError) {
          console.error("Error fetching uses:", retryError);
          return [];
        }
      }
    },
    { shouldCache: (items) => items.length > 0 }
  );

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
