import { compareDesc } from "date-fns";
import Link from "next/link";

import PostRendering from "@/components/posts";
import type { TimelineItem } from "@/interfaces/content-item";
import { getNotes, getPosts } from "@/lib/directus-content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  description:
    "Welcome to my personal corner of the internet. Here you'll find posts about my faith, technology I'm interested in, random notes, code snippets and other things happening in my life.",
  path: "/timeline",
  title: "Timeline",
});

const Posts = async () => {
  const [allPosts, allNotes] = await Promise.all([getPosts(), getNotes()]);

  // Combine posts and notes into a single content array
  const allContent: TimelineItem[] = [
    ...allPosts.map((post) => ({
      ...post,
      id: post.slug || `${post.date_created}-${post.title}`,
      type: "Post" as const,
    })),
    ...allNotes.map((note) => ({
      ...note,
      content: note.content,
      description:
        note.content.slice(0, 200) + (note.content.length > 200 ? "..." : ""),
      id: `note-${note.id}`,
      image: "",
      image_alt: "",
      signature: false,
      slug: `note-${note.id}`,
      tags: note.tags || [],
      title:
        note.content.slice(0, 100) + (note.content.length > 100 ? "..." : ""),
      type: "Note" as const,
    })),
  ];

  const sortedContent = allContent.toSorted((a, b) =>
    compareDesc(new Date(a.date_created), new Date(b.date_created))
  );
  const content: Record<number, TimelineItem[]> = {};
  for (const item of sortedContent) {
    const year = new Date(item.date_created).getFullYear();
    if (!content[year]) {
      content[year] = [];
    }
    content[year].push(item);
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pt-4 pb-20">
      <div className="flex flex-col space-y-20 text-sm">
        <div className="space-y-2">
          <p className="font-redaction text-white text-xl">Timeline</p>

          <p>
            Welcome to my personal corner of the internet. Here you&apos;ll find
            posts about my faith, technology I&apos;m interested in, random
            notes, code snippets and other things happening in my life. Working
            on turning this into a feed for everything I do.
          </p>

          <p className="text-muted-foreground text-xs">
            Posts and notes from September 2019 to present.
          </p>
        </div>

        <PostRendering postsByYear={content} />

        <Link
          className="group inline-flex w-fit text-muted-foreground text-xs underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
          href="/"
        >
          ../
        </Link>
      </div>
    </div>
  );
};

export default Posts;
