import Link from "next/link";
import Image from "next/image";
import { NextSeo } from "next-seo";
import BlogPostCard from "../components/BlogPostCard";
import NowPlaying from "../components/NowPlaying";
import { FiArrowRight } from "react-icons/fi";
import { useState } from "react";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <NextSeo
        title="Home | Zacchary Puckeridge"
        description="Zacchary Puckeridge's Website"
      />
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
                "group-hover:opacity-75 rounded-full duration-700 ease-in-out hidden w-36 lg:flex select-none",
                isLoading
                  ? "grayscale blur-2xl scale-110"
                  : "grayscale-0 blur-0 scale-100"
              )}
              onLoadingComplete={() => setLoading(false)}
            />
          </div>
        </div>

        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-white">
          Featured Posts
        </h3>
        <div className="flex gap-6 flex-col md:flex-row">
          <BlogPostCard
            title="💔 Is God's love reckless?"
            slug="is-gods-love-reckless"
            gradient="from-[#D8B4FE] to-[#818CF8]"
            glow="before:absolute before:w-full before:h-full before:-z-10 before:bg-gradient-to-r before:from-[#D8B4FE] before:to-[#818CF8] before:left-0 before:top-0 before:blur-[10px] hover:before:blur-[40px] transition-all duration-200"
          />
          <BlogPostCard
            title="🤖 Create your own Discord Bot with Discord.js"
            slug="create-your-own-discord-bot"
            gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
            glow="before:absolute before:w-full before:h-full before:-z-10 before:bg-gradient-to-r before:from-[#6EE7B7] before:via-[#3B82F6] before:to-[#9333EA] before:left-0 before:top-0 before:blur-[10px] hover:before:blur-[40px] transition-all duration-200"
          />
          <BlogPostCard
            title="👨‍💻 Setup a Remote Development Server"
            slug="setup-remote-development-server"
            gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
            glow="before:absolute before:w-full before:h-full before:-z-10 before:bg-gradient-to-r before:from-[#FDE68A] before:via-[#FCA5A5] before:to-[#FECACA] before:left-0 before:top-0 before:blur-[10px] hover:before:blur-[40px] transition-all duration-200"
          />
        </div>
        <div className="mt-6 flex gap-6 flex-col md:flex-row">
          <BlogPostCard
            title="🐴 Thoughts on Bojack Horseman"
            slug="bojack-horseman"
            gradient="from-[#86FF9A] to-[#D6FF5B]"
            glow="before:absolute before:w-full before:h-full before:-z-10 before:bg-gradient-to-r before:from-[#86FF9A] before:to-[#D6FF5B] before:left-0 before:top-0 before:blur-[10px] hover:before:blur-[40px] transition-all duration-200"
          />
          <BlogPostCard
            title="🖌️ I've been inspired by 'A Goofy Movie'"
            slug="inspired-by-goofy-movie"
            gradient="from-[#FF9772] via-[#3B82F6] to-[#5BECFF]"
            glow="before:absolute before:w-full before:h-full before:-z-10 before:bg-gradient-to-r before:from-[#FF9772] before:via-[#3B82F6] before:to-[#5BECFF] before:left-0 before:top-0 before:blur-[10px] hover:before:blur-[40px] transition-all duration-200"
          />
          <BlogPostCard
            title="💭 An excerpt on Old Testament Law"
            slug="old-testament-law"
            gradient="from-[#C672FF] via-[#FF72DC] to-[#FECACA]"
            glow="before:absolute before:w-full before:h-full before:-z-10 before:bg-gradient-to-r before:from-[#C672FF] before:via-[#FF72DC] before:to-[#FECACA] before:left-0 before:top-0 before:blur-[10px] hover:before:blur-[40px] transition-all duration-200"
          />
        </div>
        <div className="flex justify-between">
          <div>
            <Link
              href="/blog"
              title="Read all posts"
              className="flex mt-8 text-[#888888] leading-7 rounded-lg hover:text-white transition-all">
              Read all posts
              <div className="h-6 w-6 ml-1 mt-1.5">
                <FiArrowRight />
              </div>
            </Link>
          </div>
          <div>
            <h4 className="flex mt-8 text-[#888888] leading-7 rounded-lg hover:text-white transition-all">
              <NowPlaying />
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
