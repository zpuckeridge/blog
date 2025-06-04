import CopyLink from "@/components/copy-link";
import { BlurFade } from "@/components/magicui/blur-fade";
import Player from "@/components/player";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import fs from "fs";
import matter from "gray-matter";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";

interface Video {
  title: string;
  url: string;
  tag: string;
  videoUrl: string;
  duration: number;
  date: string;
  description?: string;
}

async function getAllVideos(): Promise<Video[]> {
  const contentDir = path.join(process.cwd(), "_content");
  const videosDir = path.join(contentDir, "videos");

  const getAllFiles = (dir: string): Video[] => {
    const files = fs.readdirSync(dir);
    return files.map((file) => {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      const slug = file.replace(".mdx", "");
      return {
        ...data,
        url: `/${slug}`,
      } as Video;
    });
  };

  return getAllFiles(videosDir);
}

export async function generateStaticParams() {
  const videos = await getAllVideos();
  return videos.map((video) => ({
    slug: video.url.replace("/", ""),
  }));
}

export default async function Clip(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  if (!slug) {
    return notFound();
  }

  const videos = await getAllVideos();
  const video = videos.find((video) => video.url.replace("/", "") === slug);

  if (!video) {
    return notFound();
  }

  return (
    <div className="max-w-lg mx-auto space-y-2 ">
      <BlurFade delay={0.1}>
        <Player src={video.videoUrl} />
      </BlurFade>

      <BlurFade delay={0.2}>
        <div className="space-y-1">
          <div className="flex justify-between">
            <h1 className="font-semibold text-sm truncate">{video.title}</h1>
            <div className="inline-flex ">
              <CopyLink />
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <p>
              {new Date(video.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.3}>
        <div>
          <Link
            href="/videos"
            className="text-xs text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
          >
            <ArrowLeftIcon className="inline-flex" /> /videos
          </Link>
        </div>
      </BlurFade>
    </div>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const videos = await getAllVideos();
  const video = videos.find(
    (video) => video.url.replace("/", "") === params.slug,
  );

  if (!video) {
    return notFound();
  }

  const title = `${video.title}`;
  const description = `${video.description || ""}`;
  const videoUrl = `https://stream.mux.com/${video.videoUrl}/capped-1080p.mp4`;
  const thumbnailUrl = `https://image.mux.com/${video.videoUrl}/thumbnail.jpg`;

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
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}${video.url}`,
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
