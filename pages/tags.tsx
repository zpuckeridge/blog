import fs from "fs";
import matter from "gray-matter";
import { NextSeo } from "next-seo";
import Link from "next/link";
import path from "path";

export default function Tags({ tags }: { tags: string[] }) {
  return (
    <>
      <NextSeo title="Tags | Zacchary Puckeridge" description="Article tags" />
      <div>
        <h1 className="mt-20 mb-4 max-w-2xl mx-auto font-bold text-3xl md:text-5xl tracking-tight text-black dark:text-white">
          Tags
        </h1>
        <ul>
          {tags.map((tag) => (
            <li key={tag}>
              <Link href="/tags/[tag]" as={`/tags/${tag}`}>
                <button className="p-2 mb-2 w-full bg-white dark:bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                  {tag}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // list all tags from the files in the articles directory
  const files = fs.readdirSync(path.join("articles"));
  const allTags = files.map((fileName) => {
    const fileContents = fs.readFileSync(
      path.join(`articles/${fileName}`),
      "utf8"
    );
    const { data } = matter(fileContents);
    return data.tags;
  });
  // flatten the array of arrays into a single array
  const tags = allTags.flat();
  // remove duplicates
  const uniqueTags = tags.filter((tag, index) => tags.indexOf(tag) === index);
  return {
    props: {
      tags: uniqueTags,
    },
  };
}
