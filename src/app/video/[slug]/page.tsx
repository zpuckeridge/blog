import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CopyLink from "@/components/copy-link";
import Player from "@/components/player";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Video } from "@/interfaces/content-item";
import { getVideoBySlug } from "@/lib/directus-content";
import { getSiteUrl } from "@/lib/site-url";
import { resolveVideoMedia } from "@/lib/video-source";

const Clip = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;

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
            <h1 className="font-redaction text-black dark:text-white text-xl">
              {video.title}
            </h1>

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
                      {new Date(video.date_created).toLocaleDateString(
                        "en-US",
                        {
                          day: "2-digit",
                          month: "long",
                          weekday: "long",
                          year: "numeric",
                        }
                      )}{" "}
                      · {video.tags.join(", ")}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <CopyLink />
              </div>
            </div>
          </div>

          <Player src={video.playback_id} />
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
};

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await props.params;

  // Get content from Directus
  const video = (await getVideoBySlug(slug)) as Video | null;

  if (!video) {
    return notFound();
  }

  const title = `${video.title}`;
  const description = `${video.description || ""}`;
  const { thumbnailUrl, videoUrl } = resolveVideoMedia(video.playback_id);

  const pageUrl = `${getSiteUrl()}/video/${slug}`;

  return {
    description,
    openGraph: {
      description,
      images: [
        {
          alt: title,
          height: 1080,
          url: thumbnailUrl,
          width: 1920,
        },
      ],
      siteName: "zacchary.me",
      title,
      type: "video.other",
      url: pageUrl,
      videos: [
        {
          height: 1080,
          type: "video/mp4",
          url: videoUrl,
          width: 1920,
        },
      ],
    },
    title,
    twitter: {
      card: "player",
      description,
      images: [
        {
          alt: title,
          height: 1080,
          url: thumbnailUrl,
          width: 1920,
        },
      ],
      players: [
        {
          height: 1080,
          playerUrl: videoUrl,
          streamUrl: videoUrl,
          width: 1920,
        },
      ],
      title,
    },
  };
};

export default Clip;
