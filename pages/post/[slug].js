import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";

import dateFormat, { masks } from "dateformat";
import { NextSeo } from "next-seo";

import { Comments } from "../../components/comments";

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`posts/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

export default function ArticlePage({ frontmatter, content }) {
  return (
    <>
      <NextSeo
        title={frontmatter.title}
        description={frontmatter.description}
      />
      <div className="mt-20 prose mx-auto prose-a:text-blue-400 dark:prose-h3:text-white dark:prose-blockquote:text-white prose-img:rounded-2xl prose-img:mx-auto prose-img:shadow-xl dark:prose-code:text-white">
        <h1 className="dark:text-white">{frontmatter.title}</h1>
        <span className="dark:text-white">
          {dateFormat(frontmatter.date, "dS mmmm yyyy")}
        </span>
        <p
          className="dark:text-white "
          dangerouslySetInnerHTML={{ __html: md().render(content) }}
        />
        <div className="mb-10">
          <Comments />
        </div>
      </div>
    </>
  );
}
