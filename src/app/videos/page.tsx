import { compareDesc } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import PasswordProtection from "@/src/components/password-protection";
import Videos from "@/src/components/videos";
import { getVideos } from "@/src/lib/directus-content";

export const metadata: Metadata = {
	title: "Videos",
	description: "A collection of videos I've created.",
};

export default async function Clips() {
	const videos = await getVideos();

	const sortedVideos = videos.sort((a, b) =>
		compareDesc(new Date(a.date_created), new Date(b.date_created))
	);

	return (
		<PasswordProtection
			description="A compilation of humorous, thrilling, and memorable moments from my life and some of the video games I regularly play."
			password="videos2024"
			title="Videos"
		>
			<div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pt-4 pb-20">
				<div className="flex flex-col space-y-20 text-sm">
					<div className="flex flex-col gap-2 text-sm">
						<p className="font-redaction text-white text-xl">Videos</p>

						<p>
							A compilation of humorous, thrilling, and memorable moments from my life and some of
							the video games I regularly play.
						</p>
					</div>

					<Videos itemsPerPage={6} videos={sortedVideos} />

					<Link
						className="group inline-flex w-fit text-muted-foreground text-xs underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
						href="/"
					>
						../
					</Link>
				</div>
			</div>
		</PasswordProtection>
	);
}
