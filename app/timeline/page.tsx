import BlurFade from "@/components/magicui/blur-fade";
import PostRendering from "@/components/posts";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "Welcome to my personal corner of the internet. Here you'll find posts about my faith, technology I'm interested in, random notes, code snippets and other things happening in my life.",
};

export default function Posts() {
  const posts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .reduce((acc: Record<number, any[]>, post: any) => {
      const year = new Date(post.date).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    }, {});

  return (
    <div className="max-w-lg lg:mx-auto">
      <div className="text-sm leading-relaxed flex flex-col gap-20 pb-20">
        <BlurFade delay={0.1}>
          <p className="font-serif text-2xl italic ">Timeline</p>
        </BlurFade>
        <BlurFade delay={0.2}>
          <div className="space-y-2">
            <p>
              Welcome to my personal corner of the internet. Here you'll find
              posts about my faith, technology I'm interested in, random notes,
              code snippets and other things happening in my life.
            </p>

            <p className="text-xs text-muted-foreground">
              Posts from September 2019 to present.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.3}>
          <PostRendering postsByYear={posts} />
        </BlurFade>

        <Link
          href="/"
          className="text-xs text-muted-foreground hover:text-violet-400"
        >
          <ArrowLeftIcon className="inline-flex" /> /
        </Link>
      </div>
    </div>
  );
}
