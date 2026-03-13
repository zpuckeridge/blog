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
export const getPosts = async (): Promise<Post[]> => {
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
};

/**
 * Retrieve a single post by slug
 */
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
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
};

/**
 * Retrieve all published notes from Directus
 */
export const getNotes = async (): Promise<Note[]> => {
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
};

/**
 * Retrieve all published videos from Directus
 */
export const getVideos = async (): Promise<Video[]> => {
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
};

/**
 * Retrieve a single video by slug
 */
export const getVideoBySlug = async (slug: string): Promise<Video | null> => {
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
};

/**
 * Retrieve all published books from Directus
 */
export const getBooks = async (): Promise<Book[]> => {
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
};

/**
 * Retrieve all published movies from Directus
 */
export const getMovies = async (): Promise<Movie[]> => {
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
};

/**
 * Retrieve all published credits from Directus
 */
export const getCredits = async (): Promise<Credit[]> => {
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
};

/**
 * Retrieve all published projects from Directus
 */
export const getProjects = async (): Promise<Project[]> => {
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
};

/**
 * Retrieve a single project by ID
 */
export const getProjectById = async (id: number): Promise<Project | null> => {
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
          id: {
            _eq: id,
          },
          status: {
            _in: ["published", "archived"],
          },
        },
        limit: 1,
      })
    );

    return projects.length > 0 ? (projects[0] as Project) : null;
  } catch {
    return null;
  }
};

/**
 * Retrieve content by tags
 */
export const getContentByTags = async (
  tags: string[],
  contentType: "posts" | "videos" | "books" | "movies" | "projects"
): Promise<Post[] | Video[] | Book[] | Movie[] | Project[]> => {
  try {
    const content = await directus.request(
      readItems(contentType, {
        filter: {
          status: {
            _eq: "published",
          },
          tags: {
            _in: tags,
          },
          ...(contentType === "projects" && {
            status: {
              _in: ["published", "archived", "work_in_progress"],
            },
          }),
        },
      })
    );

    return content as Post[] | Video[] | Book[] | Movie[] | Project[];
  } catch {
    return [];
  }
};

/**
 * Search content across all types
 */
export const searchContent = async (
  query: string
): Promise<{
  posts: Post[];
  videos: Video[];
  books: Book[];
  movies: Movie[];
  credits: Credit[];
  projects: Project[];
}> => {
  try {
    const [posts, videos, books, movies, credits, projects] = await Promise.all(
      [
        directus.request(
          readItems("posts", {
            filter: {
              _or: [
                { title: { _icontains: query } },
                { description: { _icontains: query } },
                { content: { _icontains: query } },
              ],
              status: { _eq: "published" },
            },
          })
        ),
        directus.request(
          readItems("videos", {
            filter: {
              _or: [
                { title: { _icontains: query } },
                { description: { _icontains: query } },
              ],
              status: { _eq: "published" },
            },
          })
        ),
        directus.request(
          readItems("books", {
            filter: {
              _or: [
                { title: { _icontains: query } },
                { author: { _icontains: query } },
              ],
              status: { _eq: "published" },
            },
          })
        ),
        directus.request(
          readItems("movies", {
            filter: {
              _or: [
                { title: { _icontains: query } },
                { setting: { _icontains: query } },
              ],
              status: { _eq: "published" },
            },
          })
        ),
        directus.request(
          readItems("credits", {
            filter: {
              _or: [
                { title: { _icontains: query } },
                { description: { _icontains: query } },
              ],
              status: { _eq: "published" },
            },
          })
        ),
        directus.request(
          readItems("projects", {
            filter: {
              _or: [
                { name: { _icontains: query } },
                { description: { _icontains: query } },
              ],
              status: { _in: ["published", "archived", "work_in_progress"] },
            },
          })
        ),
      ]
    );

    return {
      books: books as Book[],
      credits: credits as Credit[],
      movies: movies as Movie[],
      posts: posts as Post[],
      projects: projects as Project[],
      videos: videos as Video[],
    };
  } catch {
    return {
      books: [],
      credits: [],
      movies: [],
      posts: [],
      projects: [],
      videos: [],
    };
  }
};
