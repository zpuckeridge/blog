import { compareDesc } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import PostRendering from "@/src/components/posts";
import type { TimelineItem } from "@/src/interfaces/content-item";
import { getNotes, getPosts } from "@/src/lib/directus-content";

export const metadata: Metadata = {
	title: "Timeline",
	description:
		"Welcome to my personal corner of the internet. Here you'll find posts about my faith, technology I'm interested in, random notes, code snippets and other things happening in my life.",
};

export default async function Posts() {
	const [allPosts, allNotes] = await Promise.all([getPosts(), getNotes()]);

	// Combine posts and notes into a single content array
	const allContent: TimelineItem[] = [
		...allPosts.map((post) => ({
			...post,
			id: post.slug || `${post.date_created}-${post.title}`,
			type: "Post" as const,
		})),
		...allNotes.map((note) => ({
			...note,
			id: `note-${note.id}`,
			title: note.content.substring(0, 100) + (note.content.length > 100 ? "..." : ""),
			slug: `note-${note.id}`,
			image: "",
			image_alt: "",
			description: note.content.substring(0, 200) + (note.content.length > 200 ? "..." : ""),
			tags: note.tags || [],
			content: note.content,
			signature: false,
			type: "Note" as const,
		})),
	];

	const content = allContent
		.sort((a, b) => compareDesc(new Date(a.date_created), new Date(b.date_created)))
		.reduce((acc: Record<number, TimelineItem[]>, item) => {
			const year = new Date(item.date_created).getFullYear();
			if (!acc[year]) {
				acc[year] = [];
			}
			acc[year].push(item);
			return acc;
		}, {});

	return (
		<div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pt-4 pb-20">
			<div className="flex flex-col space-y-20 text-sm">
				<div className="space-y-2">
					<p className="font-redaction text-white text-xl">Timeline</p>

					<p>
						Welcome to my personal corner of the internet. Here you&apos;ll find posts about my
						faith, technology I&apos;m interested in, random notes, code snippets and other things
						happening in my life. Working on turning this into a feed for everything I do.
					</p>

					<p className="text-muted-foreground text-xs">
						Posts and notes from September 2019 to present.
					</p>
				</div>

				<PostRendering postsByYear={content} />

				<Link
					className="group inline-flex w-fit text-muted-foreground text-xs underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
					href="/"
				>
					../
				</Link>
			</div>
		</div>
	);
}
