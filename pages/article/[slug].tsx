import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import dateFormat, { masks } from "dateformat";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useEffect, useState } from "react";
import PageViews from "../../components/PageViews";
import CopyLink from "../../components/CopyLink";
import { FiEye } from "react-icons/fi";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

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

  const [isLoading, setLoading] = useState(true);

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
            <Link href={`/tags/${data.tags}`}>
              <p className="uppercase font-bold text-blue-500 hover:text-blue-400">
                {data.tags}
              </p>
            </Link>
            <h1 className="font-bold text-4xl">{data.title}</h1>
            <Image
              alt={`${data.title}`}
              width={400}
              height={400}
              src={`/${data.socialImage}`}
              className={cn(
                "group-hover:opacity-75 duration-700 ease-in-out flex top-0 left-0 w-full h-full object-cover select-none rounded-xl mt-4",
                isLoading
                  ? "grayscale blur-2xl scale-110"
                  : "grayscale-0 blur-0 scale-100"
              )}
              onLoadingComplete={() => setLoading(false)}
            />
          </div>
          <div className="flex justify-between my-auto">
            <div className="mt-4 font-bold">
              {dateFormat(data.date, "dS mmmm yyyy")} ・ <CopyLink />
            </div>

            <div className="mt-4 inline-flex text-gray-800 dark:text-gray-200">
              <FiEye className="h-6 w-6" />
              <div className="ml-2 font-bold">
                <PageViews slug={data.slug} />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 prose dark:prose-invert max-w-2xl prose-img:shadow-xl prose-img:rounded-xl">
          <MDXRemote {...content} />
        </div>
      </div>
    </>
  );
}
