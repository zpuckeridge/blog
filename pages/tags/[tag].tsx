import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";

export default function Tag({ articles, tag }: { articles: any; tag: string }) {
  return (
    <div>
      <h1 className="mt-20 mb-4 max-w-2xl mx-auto font-bold text-3xl md:text-5xl tracking-tight text-black dark:text-white">
        {tag}
      </h1>
      <ul>
        {articles.map((article: any) => (
          <li key={article.slug}>
            <Link href="/article/[slug]" as={`/article/${article.slug}`}>
              <button className="p-2 mb-2 w-full bg-white dark:bg-white/5 border border-zinc-800/50 rounded-lg flex hover:ring-2 ring-gray-300 transition-all">
                {article.title}
              </button>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/tags" className="text-blue-500 hover:text-blue-400">
        Back to tags
      </Link>
    </div>
  );
}

export async function getStaticProps({ params }: any) {
  // list all articles that have the current selected tag
  const files = fs.readdirSync(path.join("articles"));
  const articles = files.map((fileName) => {
    const fileContents = fs.readFileSync(
      path.join(`articles/${fileName}`),
      "utf8"
    );
    const { data } = matter(fileContents);
    return {
      ...data,
      slug: fileName.replace(".md", ""),
    };
  });
  const filteredArticles = articles.filter((article: any) =>
    article.tags.includes(params.tag)
  );
  return {
    props: {
      articles: filteredArticles,
      tag: params.tag,
    },
  };
}

export async function getStaticPaths() {
  // list all tags that are relevant to the current selected tag
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
  // create an array of objects with the params for each tag
  const paths = uniqueTags.map((tag) => ({
    params: {
      tag,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
