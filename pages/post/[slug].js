import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import Link from "next/link";
import dateFormat, { masks } from "dateformat";
import { NextSeo } from "next-seo";
import { Comments } from "../../components/Comments";
import { useEffect } from "react";
import PageViews from "../../components/PageViews";

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
  useEffect(() => {
    fetch(`/api/views/${frontmatter.slug}`, {
      method: "POST",
    });
  }, [frontmatter.slug]);

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
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
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
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
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
      <div className="-mt-5 p-8 prose mx-auto prose-h3:font-bold prose-h2:font-bold dark:prose-h2:text-white dark:prose-h4:text-white dark:prose-h5:text-white prose-a:text-blue-400 dark:prose-h3:text-white dark:prose-blockquote:text-white prose-img:rounded-2xl prose-img:mx-auto prose-img:shadow-xl dark:prose-code:text-white">
        <div className="text-center">
          <p className="uppercase font-bold text-blue-600">
            {frontmatter.tags}
          </p>
          <h1 className="dark:text-white -mt-5">{frontmatter.title}</h1>
          <div className="grid place-items-center -mt-5 text-center">
            <div className="inline-flex place-content-center dark:text-white font-bold py-2 px-2 border-2 border-gray-300 dark:border-gray-800 bg-gray-600 bg-opacity-20 text-center text-base font-semibold shadow-lg rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {dateFormat(frontmatter.date, "dS mmmm yyyy")}
            </div>
          </div>
          <div className="grid place-items-center">
            <div className="mt-2 flex items-center text-gray-800 dark:text-gray-200 capsize">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <div className="ml-2">
                <PageViews slug={frontmatter.slug} />
              </div>
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
