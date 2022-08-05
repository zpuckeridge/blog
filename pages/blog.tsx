import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import dateFormat, { masks } from "dateformat";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

export async function getStaticProps() {
  const files = fs.readdirSync("posts");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function Blog({ posts }: { posts: any }) {
  return (
    <>
      <NextSeo
        title="Blog | Zacchary Puckeridge"
        description="Read recent blog posts from Zacchary Puckeridge"
      />
      <div className="grid place-items-center">
        <div className="max-w-6xl mt-16 mb-16">
          <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 md:p-0">
            {posts
              .sort(
                (
                  a: { frontmatter: { date: string | number | Date } },
                  b: { frontmatter: { date: string | number | Date } }
                ) => {
                  return (
                    new Date(b.frontmatter.date).valueOf() -
                    new Date(a.frontmatter.date).valueOf()
                  );
                }
              )
              .map(
                (post: {
                  slug: Key | null | undefined;
                  frontmatter: {
                    title:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | ReactFragment
                      | null
                      | undefined;
                    socialImage: any;
                    date: string | number | Date | undefined;
                    description:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | ReactFragment
                      | ReactPortal
                      | null
                      | undefined;
                  };
                }) => {
                  return (
                    <div
                      key={post.slug}
                      className="lg:h-128 md:h-60 border-4 border-gray-300 dark:border-gray-800 m-2 rounded-xl shadow-lg flex flex-col overflow-hidden"
                    >
                      <Link href={`/post/${post.slug}`}>
                        <a>
                          <div className="relative flex justify-center w-full max-w-xl my-auto rounded-t-lg">
                            <div className="w-full h-full lg:h-48 bg-gray-200 dark:bg-gray-600" />
                            <Image
                              className="absolute top-0 left-0 w-full h-48 object-cover select-none"
                              draggable={false}
                              layout="fill"
                              loading="lazy"
                              quality="50"
                              src={`/${post.frontmatter.socialImage}`}
                            />
                          </div>
                          <h1 className="pt-5 pr-5 pl-5 pb-2 text-xl font-bold">
                            {post.frontmatter.title}
                          </h1>
                          <p className="pl-5">
                            <span>
                              {dateFormat(
                                post.frontmatter.date,
                                "dS mmmm yyyy"
                              )}
                            </span>
                          </p>
                          <p className="pt-2 pl-5 pr-5 pb-5">
                            {post.frontmatter.description}
                          </p>
                        </a>
                      </Link>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>
    </>
  );
}
