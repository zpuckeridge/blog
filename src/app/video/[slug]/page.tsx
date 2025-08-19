import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyLink from "@/src/components/copy-link";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/src/components/ui/tooltip";
import VidstackPlayer from "@/src/components/vidstack-player";
import type { Video } from "@/src/interfaces/content-item";
import { getVideoBySlug } from "@/src/lib/directus-content";

export default async function Clip({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	// Get content from Directus
	const video = (await getVideoBySlug(slug)) as Video | null;

	if (!video) {
		return notFound();
	}

	return (
		<div className="max-w-lg mx-auto flex flex-col gap-4 pt-4 pb-20 px-6">
			<div className="text-sm flex flex-col space-y-20">
				<div className="space-y-4">
					<div>
						<h1 className="font-serif text-2xl font-semibold italic">{video.title}</h1>

						<div className="flex gap-3 justify-between text-muted-foreground text-sm w-full">
							<div className="w-full text-muted-foreground text-xs">
								{new Date(video.date_created).toLocaleDateString("en-US", {
									month: "long",
									year: "numeric",
								})}
							</div>
							<div className="flex items-center gap-3">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger
											asChild
											className="hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-200"
										>
											<DotsHorizontalIcon />
										</TooltipTrigger>
										<TooltipContent
											side="bottom"
											className="text-xs bg-muted/60 dark:bg-neutral-900/60 backdrop-blur-sm text-black dark:text-muted-foreground"
										>
											{new Date(video.date_created).toLocaleDateString("en-US", {
												weekday: "long",
												day: "2-digit",
												month: "long",
												year: "numeric",
											})}{" "}
											· {video.tags.join(", ")}
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<CopyLink />
							</div>
						</div>
					</div>

					<div className="rounded-lg aspect-video overflow-hidden">
						<VidstackPlayer
							title={video.title}
							src={`https://stream.mux.com/${video.playback_id}.m3u8`}
						/>
					</div>
				</div>

				<Link
					href="/videos"
					className="underline underline-offset-2 decoration-dotted hover:decoration-solid hover:underline-offset-4 transition inline-flex group ease-in-out text-xs text-muted-foreground w-fit"
				>
					../videos
				</Link>
			</div>
		</div>
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	// Get content from Directus
	const video = (await getVideoBySlug(slug)) as Video | null;

	if (!video) {
		return notFound();
	}

	const title = `${video.title}`;
	const description = `${video.description || ""}`;
	const videoUrl = `https://stream.mux.com/${video.playback_id}/highest.mp4`;
	const thumbnailUrl = `https://image.mux.com/${video.playback_id}/thumbnail.jpg`;

	return {
		title: title,
		description: description,
		openGraph: {
			type: "video.other",
			title: title,
			description: description,
			siteName: "zacchary.me",
			images: [
				{
					url: thumbnailUrl,
					width: 1920,
					height: 1080,
					alt: title,
				},
			],
			videos: [
				{
					url: videoUrl,
					width: 1920,
					height: 1080,
					type: "video/mp4",
				},
			],
			url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/video/${slug}`,
		},
		twitter: {
			card: "player",
			title: title,
			description: description,
			players: [
				{
					playerUrl: videoUrl,
					streamUrl: videoUrl,
					width: 1920,
					height: 1080,
				},
			],
			images: [
				{
					url: thumbnailUrl,
					width: 1920,
					height: 1080,
					alt: title,
				},
			],
		},
	};
}
