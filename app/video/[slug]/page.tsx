import CopyLink from "@/components/copy-link";
import { BlurFade } from "@/components/magicui/blur-fade";
import Player from "@/components/player";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Clip({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let MDXContent, frontmatter, content;

  try {
    // Dynamically import the MDX file for the slug
    const video = await import(`@/_content/videos/${slug}.mdx`);
    MDXContent = video.default;
    frontmatter = video.frontmatter;
    content = video.default?.compiledSource || ""; // fallback if needed
  } catch {
    return notFound();
  }

  return (
    <div className="max-w-lg mx-auto space-y-2 ">
      <BlurFade delay={0.1}>
        <Player src={frontmatter.videoUrl} />
      </BlurFade>

      <BlurFade delay={0.2}>
        <div className="space-y-1">
          <div className="flex justify-between">
            <h1 className="font-semibold text-sm truncate">
              {frontmatter.title}
            </h1>
            <div className="inline-flex ">
              <CopyLink />
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <p>
              {new Date(frontmatter.date).toLocaleDateString("en-US", {
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let frontmatter;

  try {
    const video = await import(`@/_content/videos/${slug}.mdx`);
    frontmatter = video.frontmatter;
  } catch {
    return notFound();
  }

  const title = `${frontmatter.title}`;
  const description = `${frontmatter.description || ""}`;
  const videoUrl = `https://stream.mux.com/${frontmatter.videoUrl}/capped-1080p.mp4`;
  const thumbnailUrl = `https://image.mux.com/${frontmatter.videoUrl}/thumbnail.jpg`;

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
