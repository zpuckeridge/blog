import { readItems } from "@directus/sdk";
import type { Book, Movie, Note, Post, Video } from "@/src/interfaces/content-item";
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
	} catch (error) {
		console.error("Error fetching posts:", error);
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
	} catch (error) {
		console.error(`Error fetching post with slug ${slug}:`, error);
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
				fields: ["id", "status", "date_created", "date_updated", "content", "tags"],
			})
		);

		return notes as Note[];
	} catch (error) {
		console.error("Error fetching notes:", error);
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
	} catch (error) {
		console.error("Error fetching videos:", error);
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
	} catch (error) {
		console.error(`Error fetching video with slug ${slug}:`, error);
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
	} catch (error) {
		console.error("Error fetching books:", error);
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
	} catch (error) {
		console.error("Error fetching movies:", error);
		return [];
	}
}

/**
 * Retrieve content by tags
 */
export async function getContentByTags(
	tags: string[],
	contentType: "posts" | "videos" | "books" | "movies"
): Promise<Post[] | Video[] | Book[] | Movie[]> {
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
				},
				sort: ["-date_created"],
			})
		);

		return content as Post[] | Video[] | Book[] | Movie[];
	} catch (error) {
		console.error(`Error fetching ${contentType} by tags:`, error);
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
}> {
	try {
		const [posts, videos, books, movies] = await Promise.all([
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
						_or: [{ title: { _icontains: query } }, { description: { _icontains: query } }],
					},
					sort: ["-date_created"],
				})
			),
			directus.request(
				readItems("books", {
					filter: {
						status: { _eq: "published" },
						_or: [{ title: { _icontains: query } }, { author: { _icontains: query } }],
					},
					sort: ["-date_created"],
				})
			),
			directus.request(
				readItems("movies", {
					filter: {
						status: { _eq: "published" },
						_or: [{ title: { _icontains: query } }, { setting: { _icontains: query } }],
					},
					sort: ["-date_created"],
				})
			),
		]);

		return {
			posts: posts as Post[],
			videos: videos as Video[],
			books: books as Book[],
			movies: movies as Movie[],
		};
	} catch (error) {
		console.error("Error searching content:", error);
		return {
			posts: [],
			videos: [],
			books: [],
			movies: [],
		};
	}
}
