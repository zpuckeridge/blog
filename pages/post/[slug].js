import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import Link from "next/link";
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
      <div className="mt-20 grid place-items-center text-ellipsis overflow-hidden pl-8 pr-8">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="flex items-center space-x-2 font-bold text-gray-400"
          >
            <li>
              <Link href="/">
                <a className="transition ease-in hover:text-green-400">Home</a>
              </Link>
            </li>

            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </li>

            <li>
              <Link href="/blog">
                <a className="transition ease-in hover:text-green-400">Blog</a>
              </Link>
            </li>

            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </li>

            <li>
              <Link href="#">
                <a className="transition ease-in hover:text-green-400">
                  {frontmatter.title}
                </a>
              </Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className="-mt-5 p-8 prose mx-auto prose-a:text-blue-400 dark:prose-h3:text-white dark:prose-blockquote:text-white prose-img:rounded-2xl prose-img:mx-auto prose-img:shadow-xl dark:prose-code:text-white">
        <div className="text-center">
          <p className="uppercase font-bold text-blue-600">
            {frontmatter.tags}
          </p>
          <h1 className="dark:text-white -mt-5">{frontmatter.title}</h1>
          <div className="grid place-items-center -mt-5 mb-10 text-center">
            <div className="inline-flex place-content-center dark:text-white font-bold py-2 px-2 border-2 border-gray-300 dark:border-gray-800 bg-gray-600 bg-opacity-20 text-center text-base font-semibold shadow-lg rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {dateFormat(frontmatter.date, "dS mmmm yyyy")}
            </div>
          </div>
        </div>
        <p
          className="dark:text-white"
          dangerouslySetInnerHTML={{ __html: md().render(content) }}
        />
        <div className="mb-10">
          <Comments />
        </div>
      </div>
    </>
  );
}
