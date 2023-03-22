import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import dateFormat from "dateformat";
import supabase from "../lib/supabase";
import { FiSearch } from "react-icons/fi";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("blog")
    .select(
      "slug, views, published_at, title, description, tags, image, published"
    )
    .eq("published", true)
    .order("published_at", { ascending: false });

  data?.forEach((data: any) => {
    data.published_at = dateFormat(data.published_at, "mmmm dS, yyyy");
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    props: {
      data,
    },
  };
}

export default function Blog({ data }: { data: any }) {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  const filteredArticles = data.filter((article: any) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    return matchesSearch;
  });

  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  function handlePageClick(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      <Head>
        <title>Blog | Zacchary Puckeridge</title>
        <meta
          name="description"
          content="Check out some of my recent articles!"
        />
      </Head>
      <div className="my-20">
        <div className="max-w-4xl flex justify-between mx-auto">
          <div className="sm:w-2/3 w-full">
            <h1 className="font-bold text-5xl tracking-tight text-white">
              Blog
            </h1>
            <p className="text-white my-4">
              {"I've"} been writing articles since 2019 and have found it to be
              incredibly useful for retaining information about a variety of
              topics. I think the most interesting thing to do is to go back
              through my older posts to observe how I used to write and how my
              opinions and beliefs have changed as {"I've"} matured.
              <br />
              <br />
              Dear reader should you be looking to open a dialogue about my
              positions on the topics outlined in my articles, please do so!{" "}
              {"I'm"} always happy to chat, and can be reached via my email:{" "}
              <a href="mailto:hi@zacchary.me" title="Contact email">
                <span className="hover:text-[#dacf00] text-[#fff200] font-semibold transition-all duration-200">
                  hi@zacchary.me
                </span>
              </a>
            </p>
          </div>
          <div className="text-[10rem] my-auto hidden sm:flex">🤔</div>
        </div>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles"
            className="block w-full px-3 py-2 text-white bg-white/5 border border-zinc-800/50 rounded-lg hover:ring-2 ring-gray-300 transition-all placeholder:text-[#888888]"
          />
          <div className="absolute right-3 top-3 inline-flex space-x-2">
            <Link href="/tags">
              <p className="-my-0.5 text-blue-500 hover:text-blue-400">
                Explore tags
              </p>
            </Link>
            <FiSearch className="w-5 h-5 text-[#888888]" />
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto">
          {currentArticles.map((article: any) => (
            <div key={article.slug}>
              <Link
                href={`/article/${article.slug}`}
                className="mb-4 transform hover:scale-[1.05] h-full transition-all text-white bg-white/5 border border-zinc-800/50 rounded-lg flex flex-col overflow-hidden hover:ring-2 ring-gray-300">
                <div>
                  <div className="relative flex justify-center my-auto rounded-t-lg">
                    <div className="w-full h-full lg:h-48" />
                    <Image
                      alt={`${article.title}`}
                      width={400}
                      height={400}
                      src={`${article.image}`}
                      className={cn(
                        "duration-700 ease-in-out hidden lg:flex absolute top-0 left-0 w-full h-48 object-cover select-none",
                        isLoading
                          ? "grayscale blur-2xl scale-110"
                          : "grayscale-0 blur-0 scale-100"
                      )}
                      onLoadingComplete={() => setLoading(false)}
                      priority={true}
                    />
                  </div>
                  <div className="px-4">
                    <h1
                      className="mt-4 text-xl font-bold line-clamp-title"
                      title={article.title}>
                      {article.title}
                    </h1>
                    <div className="mt-2 flex justify-between">
                      <div>{article.published_at}</div>
                      <div>{article.views} views</div>
                    </div>
                    <p className="mt-2 line-clamp" title={article.description}>
                      {article.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 text-white">
          {Array.from(
            { length: Math.ceil(filteredArticles.length / articlesPerPage) },
            (_, i) => (
              <button
                key={i}
                className={`py-1 px-3 rounded-lg m-1 ${
                  currentPage === i + 1
                    ? "bg-white/50 border-zinc-800 ring-2 ring-gray-300"
                    : "bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300"
                } transition-all`}
                onClick={() => handlePageClick(i + 1)}>
                {i + 1}
              </button>
            )
          )}
        </div>
        <p className="text-white text-xl text-center my-20">
          <span className="italic">
            {'"'}If you hate the truth than telling the truth is going to sound
            like hate.{'"'}
          </span>{" "}
          -{" "}
          <a
            href="https://dougwils.com/"
            className="hover:text-[#dacf00] text-[#fff200]">
            Doug Wilson
          </a>
        </p>
      </div>
    </>
  );
}
