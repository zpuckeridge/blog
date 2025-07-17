import { compareDesc } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import Videos from "@/src/components/videos";
import { getAllContent } from "@/src/lib/getAllContent";

export const metadata: Metadata = {
	title: "Videos",
	description: "A collection of videos I've created.",
};

export default async function Clips() {
	const allContent = await getAllContent();

	const videos = allContent
		.filter((a) => a.type === "Video")
		.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

	return (
		<div className="max-w-lg mx-auto flex flex-col gap-4 pt-4 pb-20 px-6">
			<div className="text-sm flex flex-col space-y-20">
				<div className="text-sm  flex flex-col gap-2">
					<p className="text-2xl font-semibold font-serif">Videos</p>

					<p>
						A compilation of humorous, thrilling, and memorable moments from my life and some of the
						video games I regularly play.
					</p>
				</div>

				<Videos videos={videos} itemsPerPage={6} />

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
