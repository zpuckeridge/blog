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
 * Retrieve all published posts from Directus
 */
export async function getPosts(): Promise<Post[]> {
  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        sort: ["-date_created"],
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
      })
    );

    return posts as Post[];
  } catch (_error) {
    return [];
  }
}

/**
 * Retrieve a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          status: {
            _eq: "published",
          },
          slug: {
            _eq: slug,
          },
        },
        limit: 1,
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
      })
    );

    return posts.length > 0 ? (posts[0] as Post) : null;
  } catch (_error) {
    return null;
  }
}

/**
 * Retrieve all published notes from Directus
 */
export async function getNotes(): Promise<Note[]> {
  try {
    const notes = await directus.request(
      readItems("notes", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        sort: ["-date_created"],
        fields: [
          "id",
          "status",
          "date_created",
          "date_updated",
          "content",
          "tags",
        ],
      })
    );

    return notes as Note[];
  } catch (_error) {
    return [];
  }
}

/**
 * Retrieve all published videos from Directus
 */
export async function getVideos(): Promise<Video[]> {
  try {
    const videos = await directus.request(
      readItems("videos", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        sort: ["-date_created"],
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
      })
    );

    return videos as Video[];
  } catch (_error) {
    return [];
  }
}

/**
 * Retrieve a single video by slug
 */
export async function getVideoBySlug(slug: string): Promise<Video | null> {
  try {
    const videos = await directus.request(
      readItems("videos", {
        filter: {
          status: {
            _eq: "published",
          },
          slug: {
            _eq: slug,
          },
        },
        limit: 1,
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
      })
    );

    return videos.length > 0 ? (videos[0] as Video) : null;
  } catch (_error) {
    return null;
  }
}

/**
 * Retrieve all published books from Directus
 */
export async function getBooks(): Promise<Book[]> {
  try {
    const books = await directus.request(
      readItems("books", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        sort: ["-date_created"],
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
      })
    );

    return books as Book[];
  } catch (_error) {
    return [];
  }
}

/**
 * Retrieve all published movies from Directus
 */
export async function getMovies(): Promise<Movie[]> {
  try {
    const movies = await directus.request(
      readItems("movies", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        sort: ["-date_created"],
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
      })
    );

    return movies as Movie[];
  } catch (_error) {
    return [];
  }
}

/**
 * Retrieve all published credits from Directus
 */
export async function getCredits(): Promise<Credit[]> {
  try {
    const credits = await directus.request(
      readItems("credits", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        sort: ["-date_created"],
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
      })
    );

    return credits as Credit[];
  } catch (_error) {
    return [];
  }
}

/**
 * Retrieve all published projects from Directus
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await directus.request(
      readItems("projects", {
        filter: {
          status: {
            _in: ["published", "archived", "work_in_progress"],
          },
        },
        sort: ["-year_completed", "-date_created"],
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
      })
    );

    return projects as Project[];
  } catch (_error) {
    return [];
  }
}

/**
 * Retrieve a single project by ID
 */
export async function getProjectById(id: number): Promise<Project | null> {
  try {
    const projects = await directus.request(
      readItems("projects", {
        filter: {
          status: {
            _in: ["published", "archived"],
          },
          id: {
            _eq: id,
          },
        },
        limit: 1,
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
      })
    );

    return projects.length > 0 ? (projects[0] as Project) : null;
  } catch (_error) {
    return null;
  }
}

/**
 * Retrieve content by tags
 */
export async function getContentByTags(
  tags: string[],
  contentType: "posts" | "videos" | "books" | "movies" | "projects"
): Promise<Post[] | Video[] | Book[] | Movie[] | Project[]> {
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
        sort: ["-date_created"],
      })
    );

    return content as Post[] | Video[] | Book[] | Movie[] | Project[];
  } catch (_error) {
    return [];
  }
}

/**
 * Search content across all types
 */
export async function searchContent(query: string): Promise<{
  posts: Post[];
  videos: Video[];
  books: Book[];
  movies: Movie[];
  credits: Credit[];
  projects: Project[];
}> {
  try {
    const [posts, videos, books, movies, credits, projects] = await Promise.all(
      [
        directus.request(
          readItems("posts", {
            filter: {
              status: { _eq: "published" },
              _or: [
                { title: { _icontains: query } },
                { description: { _icontains: query } },
                { content: { _icontains: query } },
              ],
            },
            sort: ["-date_created"],
          })
        ),
        directus.request(
          readItems("videos", {
            filter: {
              status: { _eq: "published" },
              _or: [
                { title: { _icontains: query } },
                { description: { _icontains: query } },
              ],
            },
            sort: ["-date_created"],
          })
        ),
        directus.request(
          readItems("books", {
            filter: {
              status: { _eq: "published" },
              _or: [
                { title: { _icontains: query } },
                { author: { _icontains: query } },
              ],
            },
            sort: ["-date_created"],
          })
        ),
        directus.request(
          readItems("movies", {
            filter: {
              status: { _eq: "published" },
              _or: [
                { title: { _icontains: query } },
                { setting: { _icontains: query } },
              ],
            },
            sort: ["-date_created"],
          })
        ),
        directus.request(
          readItems("credits", {
            filter: {
              status: { _eq: "published" },
              _or: [
                { title: { _icontains: query } },
                { description: { _icontains: query } },
              ],
            },
            sort: ["-date_created"],
          })
        ),
        directus.request(
          readItems("projects", {
            filter: {
              status: { _in: ["published", "archived", "work_in_progress"] },
              _or: [
                { name: { _icontains: query } },
                { description: { _icontains: query } },
              ],
            },
            sort: ["-date_created"],
          })
        ),
      ]
    );

    return {
      posts: posts as Post[],
      videos: videos as Video[],
      books: books as Book[],
      movies: movies as Movie[],
      credits: credits as Credit[],
      projects: projects as Project[],
    };
  } catch (_error) {
    return {
      posts: [],
      videos: [],
      books: [],
      movies: [],
      credits: [],
      projects: [],
    };
  }
}
