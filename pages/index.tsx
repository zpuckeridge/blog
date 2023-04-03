import Link from "next/link";
import Image from "next/image";
import NowPlaying from "../components/NowPlaying";
import { FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import supabase from "../lib/supabase";
import dateFormat from "dateformat";
import Head from "next/head";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("blog")
    .select("slug, views, published_at, title, description, tags, image")
    .order("published_at", { ascending: false })
    .eq("published", true)
    .range(0, 5);

  data?.forEach((data: any) => {
    data.published_at = dateFormat(data.published_at, "mmmm dS");
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

export default function Home({ data }: { data: any }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <Head>
        <title>Home | Zacchary Puckeridge</title>
        <meta
          name="description"
          content="Woah! You made it to my personal website, welcome."
        />
      </Head>
      <div className="max-w-2xl border-gray-200 dark:border-gray-700 mt-20 mb-20">
        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col pr-12">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-white">
              Zacchary Puckeridge
            </h1>
            <h2 className="mt-2 text-white mb-4">
              IT Administrator and Web Developer at{" "}
              <span className="font-semibold">
                <a
                  href="https://rsp.com.au/"
                  title="Rising Sun Pictures"
                  className="hover:text-[#dacf00] text-[#fff200] transition-all duration-200">
                  Rising Sun Pictures
                </a>
              </span>
            </h2>
            <p className="text-[#888888] mb-16">
              Building better artist experiences by day. Web Developer by night.
            </p>
          </div>
          <div className="mb-8 sm:mb-0 mr-auto">
            <Image
              alt="Zacchary Puckeridge"
              height={140}
              width={140}
              src="/images/profile-pic.jpg"
              className={cn(
                "rounded-full duration-700 ease-in-out hidden w-36 md:flex select-none",
                isLoading
                  ? "grayscale blur-2xl scale-110"
                  : "grayscale-0 blur-0 scale-100"
              )}
              onLoadingComplete={() => setLoading(false)}
              priority={true}
            />
          </div>
        </div>

        <h3 className="font-bold text-3xl tracking-tight mb-4 text-white">
          Recent Articles
        </h3>
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto">
          {data.map((article: any) => (
            <div key={article.slug}>
              <Link
                href={`/article/${article.slug}`}
                className="mb-4 transform hover:scale-[1.05] h-full transition-all text-white bg-white/5 border border-zinc-800/50 rounded-lg flex flex-col overflow-hidden hover:ring-2 ring-gray-300">
                <div>
                  <div className="px-4">
                    <h1
                      className="mt-4 text-lg font-semibold line-clamp-title"
                      title={article.title}>
                      {article.title}
                    </h1>
                    <div className="mt-2 flex justify-between text-sm">
                      <div>{article.published_at}</div>
                      <div>{article.views} views</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div>
            <Link
              href="/blog"
              title="Read all posts"
              className="flex mt-4 text-[#888888] rounded-lg hover:text-white transition-all">
              Read all articles
              <FiArrowRight className="ml-1 h-4 w-4 my-auto" />
            </Link>
          </div>
          <div>
            <h4 className="flex mt-4 text-[#888888] rounded-lg hover:text-white transition-all">
              <Link href="/tracks">
                <NowPlaying />
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
