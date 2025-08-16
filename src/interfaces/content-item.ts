export interface Post {
	id: number;
	status: string;
	date_created: Date;
	date_updated: Date;
	title: string;
	slug: string;
	image: string;
	image_alt: string;
	description: string;
	tags: string[];
	content: string;
	signature: boolean;
}

export interface Note {
	id: number;
	status: string;
	date_created: Date;
	date_updated: Date;
	content: string;
	tags: string[];
}

export interface TimelineItem extends Omit<Post, "id"> {
	id: string;
	type: "Post" | "Note";
}

export interface Video {
	id: number;
	status: string;
	date_created: Date;
	date_updated: Date;
	title: string;
	slug: string;
	description: string;
	tags: string[];
	duration: number;
	playback_id: string;
}

export interface Book {
	id: number;
	status: string;
	date_created: Date;
	date_updated: Date;
	title: string;
	isbn: number;
	rating: number;
	image: string;
	published: Date;
	author: string;
}

export interface Movie {
	id: number;
	status: string;
	date_created: Date;
	date_updated: Date;
	title: string;
	rating: number;
	setting: string;
	image: string;
	with: string[];
}
