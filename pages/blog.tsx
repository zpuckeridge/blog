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
                    <div key={post.slug}>
                      <Link href={`/post/${post.slug}`}>
                        <a className="transition ease-in duration-200 lg:h-128 md:h-60 border-2 border-gray-300 dark:border-gray-800 m-2 rounded-xl shadow-lg flex flex-col bg-gray-900 focus:ring-blue-400 focus:outline-none focus:ring-4 bg-opacity-20 hover:bg-opacity-30 hover:bg-black">
                          <div>
                            <div className="relative flex justify-center w-full max-w-xl my-auto rounded-t-lg">
                              <div className="w-full h-full lg:h-48 bg-gray-200 dark:bg-gray-600" />
                              <Image
                                className="absolute top-0 left-0 w-full h-48 object-cover select-none"
                                draggable={false}
                                layout="fill"
                                loading="lazy"
                                quality="50"
                                alt={`${post.frontmatter.title}`}
                                src={`/${post.frontmatter.socialImage}`}
                              />
                            </div>
                            <h1 className="pt-5 pr-5 pl-5 pb-2 text-xl font-bold">
                              {post.frontmatter.title}
                            </h1>
                            <p className="pt-2 pl-5 pr-5 pb-5 h-14 text-ellipsis overflow-hidden ...">
                              {post.frontmatter.description}
                            </p>
                            <div className="pl-5 mt-2 mb-2">
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
                                {dateFormat(
                                  post.frontmatter.date,
                                  "dS mmmm yyyy"
                                )}
                              </div>
                            </div>
                          </div>
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
