export interface BaseContentItem {
	title: string;
	date: string;
	description: string;
	tag: string;
	slug: string;
	type: string;
	url: string;
	content: string;
	body: {
		raw: string;
	};
}

export interface Post extends BaseContentItem {
	type: "Post";
	image?: string;
	imageAlt?: string;
	signature?: boolean;
	lastModified?: string;
}

export interface Note extends BaseContentItem {
	type: "Note";
	image?: string;
	imageAlt?: string;
	signature?: boolean;
	lastModified?: string;
}

export interface Video extends BaseContentItem {
	type: "Video";
	videoUrl: string;
	duration: number;
}

export interface Book extends BaseContentItem {
	type: "Book";
	ISBN: number;
	review: number;
	image?: string;
	published?: string;
	author?: string;
}

export interface Movie extends BaseContentItem {
	type: "Movie";
	review: number;
	setting: string;
	image?: string;
	with: {
		name: string;
	}[];
}

// Union type for all content types
export type ContentItem = Post | Note | Video | Book | Movie;
