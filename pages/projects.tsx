import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import {
  FiClock,
  FiCornerDownRight,
  FiExternalLink,
  FiFlag,
  FiMinus,
  FiStar,
  FiUser,
} from "react-icons/fi";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Projects() {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <Head>
        <title>Projects | Zacchary Puckeridge</title>
        <meta
          name="description"
          content="Check out some of my more recent projects!"
        />
      </Head>
      <div className="mx-auto text-white max-w-4xl mt-20 mb-20">
        <div className="p-4 space-y-24">
          <div className="md:flex md:justify-between md:space-x-8 space-y-8 md:space-y-0">
            <div className="md:w-[50%] flex justify-center">
              <div className="transform duration-200 hover:scale-[1.05] transition-all">
                <Image
                  src="https://res.cloudinary.com/denivusi1/image/upload/v1679379117/blog/articles/simplyphotos.png"
                  width={500}
                  height={500}
                  alt="Simply Photos Website Preview"
                  className={cn(
                    "duration-700 ease-in-out rounded-lg shadow-2xl",
                    isLoading
                      ? "grayscale blur-2xl scale-110"
                      : "grayscale-0 blur-0 scale-100"
                  )}
                  onLoadingComplete={() => setLoading(false)}
                  priority={true}
                />
              </div>
            </div>
            <div className="md:w-[50%] space-y-2">
              <h1 className="font-bold text-3xl">
                Simply Photos{" "}
                <span className="inline-flex items-baseline text-[#888888] text-2xl font-normal">
                  <FiMinus className="my-auto mr-1" />
                  <span>Website for photography business</span>
                </span>
              </h1>
              <div className="rounded-full bg-green-300 w-24 py-1">
                <p className="text-center font-semibold text-sm text-green-800">
                  Freelance
                </p>
              </div>
              <div className="flex">
                <FiClock className="my-1 mr-2" />
                <p>
                  Jan {"'"}23 - Feb {"'"}23
                </p>
              </div>
              <div className="flex">
                <FiFlag className="my-1 mr-2" />
                <p>Web Developer</p>
              </div>
              <div>
                <p className="flex">
                  <span>
                    <FiCornerDownRight className="my-1 mr-2" />
                  </span>
                  This site focuses on promoting the skills and abilities of the
                  business. Muted colours draw attention to their work and do
                  not distract the user.
                </p>
              </div>
              <div>
                <p className="flex">
                  <span>
                    <FiCornerDownRight className="my-1 mr-2" />
                  </span>
                  This project leverages TailwindCSS for styling, Cloudinary for
                  image hosting, Next.JS and Vercel for hosting.
                </p>
              </div>
              <div className="flex">
                <FiUser className="my-1 mr-2" />
                <p>Solo Project</p>
              </div>
              <div>
                <a href="https://simplyphotos.info">
                  <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                    <p className="flex justify-center">
                      simplyphotos.info
                      <FiExternalLink className="my-auto ml-1" />
                    </p>
                  </button>
                </a>
                <p className="text-center text-xs">
                  💸 <span className="font-bold">Random Fact:</span> This was
                  the my highest paying job to date!
                </p>
              </div>
            </div>
          </div>

          <div className="md:flex md:justify-between md:space-x-8 space-y-8 md:space-y-0">
            <div className="md:w-[50%] flex justify-center">
              <div className="transform duration-200 hover:scale-[1.05] transition-all">
                <Image
                  src="https://res.cloudinary.com/denivusi1/image/upload/v1679379118/blog/articles/blog.png"
                  width={500}
                  height={500}
                  alt="Zacchary's Blog Website Preview"
                  className={cn(
                    "duration-700 ease-in-out rounded-lg shadow-2xl",
                    isLoading
                      ? "grayscale blur-2xl scale-110"
                      : "grayscale-0 blur-0 scale-100"
                  )}
                  onLoadingComplete={() => setLoading(false)}
                  priority={true}
                />
              </div>
            </div>
            <div className="md:w-[50%] space-y-2">
              <h1 className="font-bold text-3xl">
                Blog{" "}
                <span className="text-[#888888] text-2xl font-normal flex">
                  <FiMinus className="my-auto mr-1" /> My corner of the internet
                </span>
              </h1>
              <div className="rounded-full bg-purple-300 w-24 py-1">
                <p className="text-center font-semibold text-sm text-purple-800">
                  Personal
                </p>
              </div>
              <div className="flex">
                <FiClock className="my-1 mr-2" />
                <p>Jan {"'"}19 - Present</p>
              </div>
              <div className="flex">
                <FiFlag className="my-1 mr-2" />
                <p>Web Developer</p>
              </div>
              <div>
                <p className="flex">
                  <span>
                    <FiCornerDownRight className="my-1 mr-2" />
                  </span>
                  I{"'"}ve been writing articles since 2019 and have found it to
                  be incredibly useful for retaining information about a variety
                  of topics. Working on this project has helped me learn a lot
                  about Web Development.
                </p>
              </div>
              <div>
                <p className="flex">
                  <span>
                    <FiCornerDownRight className="my-1 mr-2" />
                  </span>
                  This project leverages TailwindCSS for styling, Cloudinary for
                  image hosting, Supabase for tracking view counts, Spotify API
                  for tracking what{"'"}s currently playing, Next.JS and Vercel
                  for hosting.
                </p>
              </div>
              <div className="flex">
                <FiUser className="my-1 mr-2" />
                <p>Solo Project</p>
              </div>
              <div>
                <a href="https://zacchary.me">
                  <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                    <p className="flex justify-center">
                      zacchary.me
                      <FiExternalLink className="my-auto ml-1" />
                    </p>
                  </button>
                </a>
                <p className="text-center text-xs">
                  👨‍💻 <span className="font-bold">Random Fact:</span> This
                  project is an amazing playground for experimentation!
                </p>
              </div>
            </div>
          </div>

          <div className="md:flex md:justify-between md:space-x-8 space-y-8 md:space-y-0">
            <div className="md:w-[50%] flex justify-center">
              <div className="transform duration-200 hover:scale-[1.05] transition-all">
                <Image
                  src="https://res.cloudinary.com/denivusi1/image/upload/v1679379121/blog/articles/livestream.png"
                  width={500}
                  height={500}
                  alt="Zacchary's Livestream Website Preview"
                  className={cn(
                    "duration-700 ease-in-out rounded-lg shadow-2xl",
                    isLoading
                      ? "grayscale blur-2xl scale-110"
                      : "grayscale-0 blur-0 scale-100"
                  )}
                  onLoadingComplete={() => setLoading(false)}
                  priority={true}
                />
              </div>
            </div>
            <div className="md:w-[50%] space-y-2">
              <h1 className="font-bold text-3xl">
                Livestream{" "}
                <span className="text-[#888888] text-2xl font-normal flex">
                  <FiMinus className="my-auto mr-1" /> Website for personal
                  livestreams and clips
                </span>
              </h1>
              <div className="rounded-full bg-purple-300 w-24 py-1">
                <p className="text-center font-semibold text-sm text-purple-800">
                  Personal
                </p>
              </div>
              <div className="flex">
                <FiClock className="my-1 mr-2" />
                <p>Mar {"'"}22 - Present</p>
              </div>
              <div className="flex">
                <FiFlag className="my-1 mr-2" />
                <p>Web Developer</p>
              </div>
              <div>
                <p className="flex">
                  <span>
                    <FiCornerDownRight className="my-1 mr-2" />
                  </span>
                  This project started out as a simple video sharing solution
                  that had working embeds primarily for Discord and Twitter. It
                  {"'"}s evolved a bit since then to become my own livestreaming
                  site.
                </p>
              </div>
              <div>
                <p className="flex">
                  <span>
                    <FiCornerDownRight className="my-1 mr-2" />
                  </span>
                  This project leverages TailwindCSS for styling, Cloudflare
                  Stream and Mux for video hosting, Supabase for tracking view
                  counts, comments and like counts, Next.JS and Vercel for
                  hosting.
                </p>
              </div>
              <div className="flex">
                <FiUser className="my-1 mr-2" />
                <p>Solo Project</p>
              </div>
              <div>
                <a href="https://sdelta.xyz">
                  <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                    <p className="flex justify-center">
                      sdelta.xyz
                      <FiExternalLink className="my-auto ml-1" />
                    </p>
                  </button>
                </a>
                <p className="text-center text-xs">
                  🚩 <span className="font-bold">Random Fact:</span> This
                  project was the first time I leveraged an API!
                </p>
              </div>
            </div>
          </div>

          <div className="md:flex md:justify-between md:space-x-8 space-y-8 md:space-y-0">
            <div className="md:w-[50%] flex justify-center">
              <div className="transform duration-200 hover:scale-[1.05] transition-all">
                <Image
                  src="https://res.cloudinary.com/denivusi1/image/upload/v1679379118/blog/articles/savvyelectrical.png"
                  width={500}
                  height={500}
                  alt="Savvy Electrical Website Preview"
                  className={cn(
                    "duration-700 ease-in-out rounded-lg shadow-2xl",
                    isLoading
                      ? "grayscale blur-2xl scale-110"
                      : "grayscale-0 blur-0 scale-100"
                  )}
                  onLoadingComplete={() => setLoading(false)}
                />
              </div>
            </div>
            <div className="md:w-[50%] space-y-2">
              <h1 className="font-bold text-3xl">
                Savvy Electrical and Data{" "}
                <span className="text-[#888888] text-2xl font-normal flex">
                  <FiMinus className="my-auto mr-1" /> Website for local
                  electrician business
                </span>
              </h1>
              <div className="rounded-full bg-green-300 w-24 py-1">
                <p className="text-center font-semibold text-sm text-green-800">
                  Freelance
                </p>
              </div>
              <div className="flex">
                <FiClock className="my-1 mr-2" />
                <p>
                  Jun {"'"}21 - Jul {"'"}21
                </p>
              </div>
              <div className="flex">
                <FiFlag className="my-1 mr-2" />
                <p>Web Developer</p>
              </div>
              <div>
                <p className="flex">
                  <span>
                    <FiCornerDownRight className="my-1 mr-2" />
                  </span>
                  This site was provides basic online presence for the company
                  allowing them some additional exposure.
                </p>
              </div>
              <div>
                <p className="flex">
                  <span>
                    <FiCornerDownRight className="my-1 mr-2" />
                  </span>
                  This project leverages custom TailwindCSS for styling, Next.JS
                  Static Exports and GitHub Pages for hosting.
                </p>
              </div>
              <div className="flex">
                <FiUser className="my-1 mr-2" />
                <p>Solo Project</p>
              </div>
              <div>
                <a href="https://savvyelectricalanddata.com.au">
                  <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                    <p className="flex justify-center">
                      savvyelectricalanddata.com.au
                      <FiExternalLink className="my-auto ml-1" />
                    </p>
                  </button>
                </a>
                <p className="text-center text-xs">
                  💰 <span className="font-bold">Random Fact:</span> This was my
                  first paid project!
                </p>
              </div>
            </div>
          </div>

          <div className="md:flex md:justify-between md:space-x-8 space-y-8 md:space-y-0">
            <div className="md:w-[50%] flex justify-center">
              <div className="transform duration-200 hover:scale-[1.05] transition-all">
                <Image
                  src="https://res.cloudinary.com/denivusi1/image/upload/v1679379120/blog/articles/mindenbaptist.png"
                  width={500}
                  height={500}
                  alt="Miden Baptist Website Preview"
                  className={cn(
                    "duration-700 ease-in-out rounded-lg shadow-2xl",
                    isLoading
                      ? "grayscale blur-2xl scale-110"
                      : "grayscale-0 blur-0 scale-100"
                  )}
                  onLoadingComplete={() => setLoading(false)}
                />
              </div>
            </div>
            <div className="md:w-[50%] space-y-2">
              <h1 className="font-bold text-3xl">
                Minden Baptist Church{" "}
                <span className="text-[#888888] text-2xl font-normal flex">
                  <FiMinus className="my-auto mr-1" /> Website for local church
                </span>
              </h1>
              <div className="rounded-full bg-green-300 w-24 py-1">
                <p className="text-center font-semibold text-sm text-green-800">
                  Freelance
                </p>
              </div>
              <div className="flex">
                <FiClock className="my-1 mr-2" />
                <p>
                  May {"'"}21 - May {"'"}21
                </p>
              </div>
              <div className="flex">
                <FiFlag className="my-1 mr-2" />
                <p>Web Developer</p>
              </div>
              <div>
                <p className="flex">
                  <span>
                    <FiCornerDownRight className="my-1 mr-2" />
                  </span>
                  This website would go onto replace the existing site that was
                  very out of date at the time.
                </p>
              </div>
              <div>
                <p className="flex">
                  <span>
                    <FiCornerDownRight className="my-1 mr-2" />
                  </span>
                  This project leverages custom CSS templates for styling,
                  Gatsby and GitHub Pages for hosting.
                </p>
              </div>
              <div className="flex">
                <FiUser className="my-1 mr-2" />
                <p>Solo Project</p>
              </div>
              <div>
                <a href="https://mindenbaptist.org">
                  <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                    <p className="flex justify-center">
                      mindenbaptist.org
                      <FiExternalLink className="my-auto ml-1" />
                    </p>
                  </button>
                </a>
                <p className="text-center text-xs">
                  🥇 <span className="font-bold">Random Fact:</span> This was
                  the first project I worked on!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
