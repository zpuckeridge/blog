import BlurFade from "@/components/magicui/blur-fade";
import PostRendering from "@/components/posts";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { allLinks, allNotes, allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "Welcome to my personal corner of the internet. Here you'll find posts about my faith, technology I'm interested in, random notes, code snippets and other things happening in my life.",
};

export default function Posts() {
  const allContent = [...allPosts, ...allNotes, ...allLinks];

  const content = allContent
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .reduce((acc: Record<number, any[]>, item: any) => {
      const year = new Date(item.date).getFullYear();
      const itemWithId = {
        ...item,
        id: item._id || item.slug || `${item.date}-${item.title}`,
      };
      if (!acc[year]) acc[year] = [];
      acc[year].push(itemWithId);
      return acc;
    }, {});

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-sm leading-relaxed flex flex-col gap-20 pb-20">
        <BlurFade delay={0.1}>
          <p className="font-serif text-2xl italic ">Timeline</p>
        </BlurFade>
        <BlurFade delay={0.2}>
          <div className="space-y-2">
            <p>
              Welcome to my personal corner of the internet. Here you&apos;ll
              find posts about my faith, technology I&apos;m interested in,
              random notes, code snippets and other things happening in my life.
            </p>

            <p className="text-xs text-muted-foreground">
              Posts from September 2019 to present.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.3}>
          <PostRendering postsByYear={content} />
        </BlurFade>

        <Link
          href="/"
          className="text-xs text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
        >
          <ArrowLeftIcon className="inline-flex" /> /
        </Link>
      </div>
    </div>
  );
}
