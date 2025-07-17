import type { MDXModule } from "@/_content";
import * as mdxIndex from "@/_content";
import type { Book, ContentItem, Movie, Note, Post, Video } from "@/src/interfaces/content-item";

// Helper function to create base content item
function createBaseContentItem(module: MDXModule): Omit<ContentItem, "type"> {
	return {
		...module.frontmatter,
		content: module.content,
		slug: module.frontmatter.slug,
		url: `/${module.frontmatter.slug}`,
		body: {
			raw: module.content,
		},
		description: module.frontmatter.description || "",
	} as Omit<ContentItem, "type">;
}

// Get all posts
export async function getAllPosts(): Promise<Post[]> {
	const mdxModules = Object.entries(mdxIndex)
		.filter(([key]) => key.startsWith("_mdx_"))
		.map(([_, module]) => module as MDXModule)
		.filter((module) => {
			const type = module.frontmatter.type || "Post";
			return type === "Post";
		});

	return mdxModules.map((module) => ({
		...createBaseContentItem(module),
		type: "Post" as const,
	})) as Post[];
}

// Get all notes
export async function getAllNotes(): Promise<Note[]> {
	const mdxModules = Object.entries(mdxIndex)
		.filter(([key]) => key.startsWith("_mdx_"))
		.map(([_, module]) => module as MDXModule)
		.filter((module) => {
			const type = module.frontmatter.type || "Post";
			return type === "Note";
		});

	return mdxModules.map((module) => ({
		...createBaseContentItem(module),
		type: "Note" as const,
	})) as Note[];
}

// Get all videos
export async function getAllVideos(): Promise<Video[]> {
	const mdxModules = Object.entries(mdxIndex)
		.filter(([key]) => key.startsWith("_mdx_"))
		.map(([_, module]) => module as MDXModule)
		.filter((module) => {
			const type = module.frontmatter.type || "Post";
			return type === "Video";
		});

	return mdxModules.map((module) => ({
		...createBaseContentItem(module),
		type: "Video" as const,
	})) as Video[];
}

// Get all books
export async function getAllBooks(): Promise<Book[]> {
	const mdxModules = Object.entries(mdxIndex)
		.filter(([key]) => key.startsWith("_mdx_"))
		.map(([_, module]) => module as MDXModule)
		.filter((module) => {
			const type = module.frontmatter.type || "Post";
			return type === "Book";
		});

	return mdxModules.map((module) => ({
		...createBaseContentItem(module),
		type: "Book" as const,
	})) as Book[];
}

// Get all movies
export async function getAllMovies(): Promise<Movie[]> {
	const mdxModules = Object.entries(mdxIndex)
		.filter(([key]) => key.startsWith("_mdx_"))
		.map(([_, module]) => module as MDXModule)
		.filter((module) => {
			const type = module.frontmatter.type || "Post";
			return type === "Movie";
		});

	return mdxModules.map((module) => ({
		...createBaseContentItem(module),
		type: "Movie" as const,
	})) as Movie[];
}

// Get all content (posts, notes, videos, books, and movies)
export async function getAllContent(): Promise<ContentItem[]> {
	const [posts, notes, videos, books, movies] = await Promise.all([
		getAllPosts(),
		getAllNotes(),
		getAllVideos(),
		getAllBooks(),
		getAllMovies(),
	]);

	return [...posts, ...notes, ...videos, ...books, ...movies];
}
