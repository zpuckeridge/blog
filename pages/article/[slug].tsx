import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import dateFormat, { masks } from "dateformat";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useEffect } from "react";
import PageViews from "../../components/PageViews";
import CopyLink from "../../components/CopyLink";

const getArticle = (slug: any) => {
  const fileContents = fs.readFileSync(
    path.join(`articles/${slug}.md`),
    "utf8"
  );
  const { data, content } = matter(fileContents);
  return {
    data,
    content,
  };
};

const getArticles = () => {
  const files = fs.readdirSync(path.join("articles"));
  const allArticlesData = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const fileContents = fs.readFileSync(
      path.join(`articles/${slug}.md`),
      "utf8"
    );
    const { data } = matter(fileContents);
    return {
      slug,
      data,
    };
  });

  return allArticlesData;
};

export const getStaticPaths = async () => {
  const articles = await getArticles();
  const paths = articles.map((article) => ({ params: { slug: article.slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const article = await getArticle(params.slug);
  const mdxSource = await serialize(article.content);
  return {
    props: {
      data: article.data,
      content: mdxSource,
    },
  };
};

export default function ArticlePage({
  data,
  content,
}: {
  data: any;
  content: any;
}) {
  useEffect(() => {
    fetch(`/api/views/${data.slug}`, {
      method: "POST",
    });
  }, [data.slug]);

  return (
    <>
      <NextSeo title={data.title} description={data.description} />
      <div className="mt-20 mb-20">
        <div className="grid place-items-center">
          <div className="mt-5 mx-auto">
            <nav aria-label="Breadcrumb">
              <div
                role="list"
                className="flex items-center space-x-2 font-semibold"
              >
                <div>
                  <Link
                    href="/"
                    className="transition ease-in hover:text-green-400"
                  >
                    Home
                  </Link>
                </div>

                <div>
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
                </div>

                <div>
                  <Link
                    href="/blog"
                    className="transition ease-in hover:text-green-400"
                  >
                    Blog
                  </Link>
                </div>

                <div>
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
                </div>

                <div>
                  <Link
                    href="#"
                    className="transition ease-in hover:text-green-400"
                  >
                    {data.title}
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="mb-4 mt-4">
          <div className="text-center">
            <p className="uppercase font-bold text-blue-600">{data.tags}</p>
            <h1 className="font-bold text-4xl">{data.title}</h1>
            <Image
              className="flex top-0 left-0 w-full h-full object-cover select-none rounded-xl mt-4"
              alt={`${data.title}`}
              width={400}
              height={400}
              src={`/${data.socialImage}`}
            />
          </div>
          <div className="flex justify-between my-auto">
            <div className="my-auto mt-4 font-bold">
              {dateFormat(data.date, "dS mmmm yyyy")}
            </div>

            <div className="my-auto mt-4 inline-flex text-gray-800 dark:text-gray-200">
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
              <div className="ml-2 font-bold">
                <PageViews slug={data.slug} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="dark:text-white prose prose-h3:font-bold prose-h2:font-bold dark:prose-h2:text-white dark:prose-h4:text-white dark:prose-h5:text-white prose-a:text-blue-400 dark:prose-h3:text-white dark:prose-blockquote:text-white prose-img:rounded-xl prose-img:shadow-xl dark:prose-code:text-white prose-code:max-w-2xl"> */}
        <div className="mb-4 prose dark:prose-invert max-w-sm lg:max-w-2xl prose-img:shadow-xl prose-img:rounded-xl">
          <MDXRemote {...content} />
        </div>
        <CopyLink />
        {/* </div> */}
      </div>
    </>
  );
}
