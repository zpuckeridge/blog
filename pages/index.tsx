import Link from "next/link";
import Image from "next/image";
import { NextSeo } from "next-seo";
import BlogPostCard from "../components/BlogPostCard";
import Notice from "../components/Notice";
import NowPlaying from "../components/NowPlaying";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Home | Zacchary Puckeridge"
        description="Zacchary Puckeridge's Website"
      />
      <div className="mt-20 mb-10 max-w-2xl border-gray-200 dark:border-gray-700">
        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col pr-12">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
              Zacchary Puckeridge
            </h1>
            <h2 className="mt-2 text-gray-700 dark:text-gray-200 mb-4">
              IT Administrator and Web Developer at{" "}
              <span className="font-semibold">Rising Sun Pictures</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-16">
              Helping build better artist experiences. Learning Web Development
              for future growth.
            </p>
          </div>
          <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
            <Image
              alt="Zacchary Puckeridge"
              height={176}
              width={176}
              src="/images/profile-pic.jpg"
              draggable={false}
              loading="lazy"
              quality="50"
              className="rounded-full"
            />
          </div>
        </div>

        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
          Featured Posts
        </h3>
        <div className="flex gap-6 flex-col md:flex-row">
          <BlogPostCard
            title="💔 Is God's love reckless?"
            slug="is-gods-love-reckless"
            gradient="from-[#D8B4FE] to-[#818CF8]"
          />
          <BlogPostCard
            title="🤖 Create your own Discord Bot with Discord.js"
            slug="create-your-own-discord-bot"
            gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
          />
          <BlogPostCard
            title="👨‍💻 Setup your own Remote Development Server"
            slug="setup-remote-development-server"
            gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
          />
        </div>
        <div className="mt-6 flex gap-6 flex-col md:flex-row">
          <BlogPostCard
            title="🐴 Thoughts on Bojack Horseman"
            slug="bojack-horseman"
            gradient="from-[#86FF9A] to-[#D6FF5B]"
          />
          <BlogPostCard
            title="🖌️ I've been inspired by 'A Goofy Movie'"
            slug="inspired-by-goofy-movie"
            gradient="from-[#FF9772] via-[#3B82F6] to-[#5BECFF]"
          />
          <BlogPostCard
            title="💭 An excerpt on Old Testament Law"
            slug="old-testament-law"
            gradient="from-[#C672FF] via-[#FF72DC] to-[#FECACA]"
          />
        </div>
        <Link href="/blog">
          <a className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6">
            Read all posts
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 ml-1"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
              />
            </svg>
          </a>
        </Link>
        <div className="flex justify-center">
          <div className="mt-8 transform hover:scale-[1.05] transition-all rounded-xl bg-[#1DB954] p-1">
            <div className="bg-white dark:bg-[#121212] flex flex-col justify-between h-full rounded-lg p-4">
              <h4 className="text-lg md:text-lg font-medium w-full text-gray-900 dark:text-gray-100 tracking-tight">
                <NowPlaying />
              </h4>
            </div>
          </div>
        </div>
      </div>
      <Notice />
    </>
  );
}
