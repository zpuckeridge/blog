import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NextSeo } from "next-seo";
import dateFormat, { masks } from "dateformat";

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

// const [state, setState] = useState({
//   filteredPosts: [],
//   query: "",
// });

// const handleInputChange = (event) => {
//   const query = event.target.value;
//   const filteredPosts = posts.filter((post) => {
//     const title = post.frontmatter.title;
//     const tags = post.frontmatter.tags;
//     const description = post.frontmatter.description;
//     return (
//       description.toLowerCase().includes(query.toLowerCase()) ||
//       title.toLowerCase().includes(query.toLowerCase()) ||
//       tags.toLowerCase().includes(query.toLowerCase())
//     );
//   });
//   setState({
//     query,
//     filteredPosts,
//   });
// };

// const postsFiltered = state.query ? state.filteredPosts : posts;

export default function Blog({ posts }) {
  return (
    <>
      <NextSeo
        title="Blog | Zacchary Puckeridge"
        description="Read recent blog posts from Zacchary Puckeridge"
      />
      <div className="grid place-items-center">
        <div className="max-w-6xl mt-16 mb-16">
          <div className="p-6">
            <label className="relative block mb-2">
              <input
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search for anything..."
                type="text"
                name="search"
              />
            </label>
          </div>

          <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 md:p-0">
            {posts
              .sort((a, b) => {
                return (
                  new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
                );
              })
              .map((post) => {
                return (
                  <div
                    key={post.slug}
                    className="lg:h-128 md:h-60 border-4 border-gray-300 dark:border-gray-800 m-2 rounded-xl shadow-lg flex flex-col overflow-hidden"
                  >
                    <Link href={`/post/${post.slug}`}>
                      <a>
                        <div className="relative flex justify-center w-full max-w-xl my-auto rounded-t-lg">
                          <div className="w-full h-full lg:h-48 bg-gray-200 dark:bg-gray-600 motion-safe:animate-pulse" />
                          <Image
                            alt={post.frontmatter.title}
                            className="absolute top-0 left-0 w-full h-48 object-cover select-none"
                            draggable={false}
                            layout="fill"
                            loading="lazy"
                            src={`/${post.frontmatter.socialImage}`}
                          />
                        </div>
                        <h1 className="pt-5 pr-5 pl-5 pb-2 text-xl font-bold">
                          {post.frontmatter.title}
                        </h1>
                        <p className="pl-5">
                          <span>
                            {dateFormat(post.frontmatter.date, "dS mmmm yyyy")}
                          </span>
                        </p>
                        <p className="pt-2 pl-5 pr-5 pb-5">
                          {post.frontmatter.description}
                        </p>
                      </a>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
