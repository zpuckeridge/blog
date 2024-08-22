import CopyLink from "@/components/copy-link";
import Player from "@/components/player";
import { getAllVideos, getVideoBySlug } from "@/lib/get-videos";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Clip({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug) {
    return notFound();
  }

  const video = getVideoBySlug(slug);

  if (!video) {
    return notFound();
  }

  return (
    <div className="max-w-md mx-auto space-y-2 ">
      <Player src={video.videoUrl} />
      <div className="space-y-1">
        <div className="flex justify-between">
          <h1 className="font-semibold text-sm truncate">{video.title}</h1>
          <div className="inline-flex ">
            <CopyLink />
          </div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <div>
            {new Date(video.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
      <div>
        <Link
          href="/videos"
          className="text-xs text-muted-foreground hover:text-violet-400"
        >
          <ArrowLeftIcon className="inline-flex" /> /videos
        </Link>
      </div>
    </div>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const video = getVideoBySlug(params.slug);

  if (!video) {
    return notFound();
  }

  const title = `${video.title}`;
  const description = `${video.description}`;

  return {
    title: title,
    description: description,
    openGraph: {
      type: "video.other",
      siteName: `zacchary.me`,
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/video/${video.slug}`,
      countryName: "Australia",
      locale: "en_AU",
      videos: [
        {
          url: `https://stream.mux.com/${video.videoUrl}/high.mp4`,
          width: 1920,
          height: 1080,
          type: "video/mp4",
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const videos = getAllVideos();

  return videos.map((video) => ({
    slug: video.slug,
  }));
}
