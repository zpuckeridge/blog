import { compareDesc } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import PostRendering from "@/src/components/posts";
import type { ContentItem } from "@/src/interfaces/content-item";
import { getAllContent } from "@/src/lib/getAllContent";

export const metadata: Metadata = {
	title: "Timeline",
	description:
		"Welcome to my personal corner of the internet. Here you'll find posts about my faith, technology I'm interested in, random notes, code snippets and other things happening in my life.",
};

export default async function Posts() {
	const allContent = await getAllContent();

	const content = allContent
		.filter((item) => item.type === "Note" || item.type === "Post")
		.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
		.reduce((acc: Record<number, ContentItem[]>, item: ContentItem) => {
			const year = new Date(item.date).getFullYear();
			const itemWithId = {
				...item,
				id: item.slug || `${item.date}-${item.title}`,
				type: item.type.charAt(0).toUpperCase() + item.type.slice(1),
			};
			if (!acc[year]) {
				acc[year] = [];
			}
			acc[year].push(itemWithId as ContentItem);
			return acc;
		}, {});

	return (
		<div className="max-w-lg mx-auto flex flex-col gap-4 pt-4 pb-20 px-6">
			<div className="text-sm flex flex-col space-y-20">
				<div className="space-y-2">
					<p className="text-2xl font-semibold font-serif">Timeline</p>

					<p>
						Welcome to my personal corner of the internet. Here you&apos;ll find posts about my
						faith, technology I&apos;m interested in, random notes, code snippets and other things
						happening in my life. Working on turning this into a feed for everything I do.
					</p>

					<p className="text-xs text-muted-foreground">Posts from September 2019 to present.</p>
				</div>

				<PostRendering postsByYear={content} />

				<Link
					href="/"
					className="underline underline-offset-2 decoration-dotted hover:decoration-solid hover:underline-offset-4 transition inline-flex group ease-in-out text-xs text-muted-foreground"
				>
					../
				</Link>
			</div>
		</div>
	);
}
