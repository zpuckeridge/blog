import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyLink from "@/components/copy-link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import VidstackPlayer from "@/components/vidstack-player";
import type { Video } from "@/interfaces/content-item";
import { getVideoBySlug } from "@/lib/directus-content";

export default async function Clip({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	// Get content from Directus
	const video = (await getVideoBySlug(slug)) as Video | null;

	if (!video) {
		return notFound();
	}

	return (
		<div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pt-4 pb-20">
			<div className="flex flex-col space-y-20 text-sm">
				<div className="space-y-4">
					<div>
						<h1 className="font-redaction text-white text-xl">{video.title}</h1>

						<div className="flex w-full justify-between gap-3 text-muted-foreground text-sm">
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
											className="transition-all duration-200 hover:text-blue-400 dark:hover:text-blue-600"
										>
											<DotsHorizontalIcon />
										</TooltipTrigger>
										<TooltipContent
											className="bg-muted/60 text-black text-xs backdrop-blur-sm dark:bg-neutral-900/60 dark:text-muted-foreground"
											side="bottom"
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

					<div className="aspect-video overflow-hidden rounded-lg">
						<VidstackPlayer
							src={`https://stream.mux.com/${video.playback_id}.m3u8`}
							title={video.title}
						/>
					</div>
				</div>

				<Link
					className="group inline-flex w-fit text-muted-foreground text-xs underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
					href="/videos"
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
		title,
		description,
		openGraph: {
			type: "video.other",
			title,
			description,
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
			title,
			description,
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
