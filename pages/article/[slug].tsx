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
      <div className="mb-20 mt-20">
        <div className="text-center">
          <Link href={`/tags/${data.tags}`}>
            <p className="uppercase font-bold text-blue-500 hover:text-blue-400">
              {data.tags}
            </p>
          </Link>
          <h1 className="font-bold text-4xl text-white">{data.title}</h1>
          <Image
            alt={`${data.title}`}
            width={1000}
            height={1000}
            src={`/${data.socialImage}`}
            className={cn(
              "group-hover:opacity-75 duration-700 ease-in-out w-full h-full object-cover select-none rounded-xl shadow-xl mt-4",
              isLoading
                ? "grayscale blur-2xl scale-110"
                : "grayscale-0 blur-0 scale-100"
            )}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
        <div className="flex justify-between">
          <div className="mt-4 font-semibold text-white">
            {dateFormat(data.date, "dS mmmm yyyy")} ・ <CopyLink />
          </div>

          <div className="mt-4 mb-4 inline-flex text-white">
            <FiEye className="h-6 w-6" />
            <div className="ml-2 font-semibold">
              <PageViews slug={data.slug} />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <article className="prose max-w-xs text-white sm:max-w-2xl prose-invert prose-img:shadow-xl prose-img:rounded-xl">
            <MDXRemote {...content} />
          </article>
        </div>
      </div>
    </>
  );
}
