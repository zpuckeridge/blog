import { Button } from "@/components/ui/Button";
import {
  Clock,
  CornerDownRight,
  ExternalLink,
  Flag,
  Minus,
  User,
} from "lucide-react";
import Image from "next/image";

export default function Projects() {
  return (
    <div className="mx-auto max-w-4xl mt-20 mb-20">
      <div className="p-4 space-y-24">
        <div className="md:flex md:justify-between md:space-x-8 space-y-8 md:space-y-0">
          <div className="md:w-[50%] flex justify-center">
            <div className="transform duration-200 hover:scale-[1.05] transition-all">
              <Image
                src="https://res.cloudinary.com/denivusi1/image/upload/v1679379117/articles/simplyphotos.png"
                width={500}
                height={500}
                alt="Simply Photos Website Preview"
                className="rounded-lg shadow-xl dark:shadow-none"
                priority={true}
              />
            </div>
          </div>
          <div className="md:w-[50%] space-y-2">
            <h1 className="font-bold text-3xl">
              Simply Photos{" "}
              <span className="inline-flex items-baseline text-[#888888] text-2xl font-normal">
                <Minus className="my-auto mr-1" />
                <span>Website for photography business</span>
              </span>
            </h1>
            <div className="rounded-full bg-green-300 w-24 py-1">
              <p className="text-center font-semibold text-sm text-green-800">
                Freelance
              </p>
            </div>
            <div className="flex">
              <Clock className="my-auto mr-2 " />
              <p>
                Jan {"'"}23 - Feb {"'"}23
              </p>
            </div>
            <div className="flex">
              <Flag className="my-auto mr-2" />
              <p>Web Developer</p>
            </div>
            <div>
              <p className="flex">
                <span>
                  <CornerDownRight className="my-auto mr-2" />
                </span>
                This site focuses on promoting the skills and abilities of the
                business. Muted colours draw attention to their work and do not
                distract the user.
              </p>
            </div>
            <div>
              <p className="flex">
                <span>
                  <CornerDownRight className="my-auto mr-2" />
                </span>
                This project leverages TailwindCSS for styling, Cloudinary for
                image hosting, Next.JS and Vercel for hosting.
              </p>
            </div>
            <div className="flex">
              <User className="my-auto mr-2" />
              <p>Solo Project</p>
            </div>
            <div>
              <a href="https://simplyphotos.info">
                <Button className="w-full mb-1">
                  <p className="flex justify-center">
                    simplyphotos.info
                    <ExternalLink className="my-auto ml-1" />
                  </p>
                </Button>
              </a>
              <p className="text-center text-xs">
                💸 <span className="font-bold">Random Fact:</span> This was the
                my highest paying job to date!
              </p>
            </div>
          </div>
        </div>

        <div className="md:flex md:justify-between md:space-x-8 space-y-8 md:space-y-0">
          <div className="md:w-[50%] flex justify-center">
            <div className="transform duration-200 hover:scale-[1.05] transition-all">
              <Image
                src="https://res.cloudinary.com/denivusi1/image/upload/v1679379118/articles/blog.png"
                width={500}
                height={500}
                alt="Zacchary's Blog Website Preview"
                className="rounded-lg shadow-xl dark:shadow-none"
                priority={true}
              />
            </div>
          </div>
          <div className="md:w-[50%] space-y-2">
            <h1 className="font-bold text-3xl">
              Blog{" "}
              <span className="text-[#888888] text-2xl font-normal flex">
                <Minus className="my-auto mr-1" /> My corner of the internet
              </span>
            </h1>
            <div className="rounded-full bg-purple-300 w-24 py-1">
              <p className="text-center font-semibold text-sm text-purple-800">
                Personal
              </p>
            </div>
            <div className="flex">
              <Clock className="my-auto mr-2" />
              <p>Jan {"'"}19 - Present</p>
            </div>
            <div className="flex">
              <Flag className="my-auto mr-2" />
              <p>Web Developer</p>
            </div>
            <div>
              <p className="flex">
                <span>
                  <CornerDownRight className="my-auto mr-2" />
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
                  <CornerDownRight className="my-auto mr-2" />
                </span>
                This project leverages TailwindCSS for styling, Cloudinary for
                image hosting, Supabase for tracking view counts, Spotify API
                for tracking what{"'"}s currently playing, Next.JS and Vercel
                for hosting.
              </p>
            </div>
            <div className="flex">
              <User className="my-auto mr-2" />
              <p>Solo Project</p>
            </div>
            <div>
              <a href="https://zacchary.me">
                <Button className="w-full mb-1">
                  <p className="flex justify-center">
                    zacchary.me
                    <ExternalLink className="my-auto ml-1" />
                  </p>
                </Button>
              </a>
              <p className="text-center text-xs">
                👨‍💻 <span className="font-bold">Random Fact:</span> This project
                is an amazing playground for experimentation!
              </p>
            </div>
          </div>
        </div>

        <div className="md:flex md:justify-between md:space-x-8 space-y-8 md:space-y-0">
          <div className="md:w-[50%] flex justify-center">
            <div className="transform duration-200 hover:scale-[1.05] transition-all">
              <Image
                src="https://res.cloudinary.com/denivusi1/image/upload/v1679379121/articles/livestream.png"
                width={500}
                height={500}
                alt="Zacchary's Livestream Website Preview"
                className="rounded-lg shadow-xl dark:shadow-none"
                priority={true}
              />
            </div>
          </div>
          <div className="md:w-[50%] space-y-2">
            <h1 className="font-bold text-3xl">
              Livestream{" "}
              <span className="text-[#888888] text-2xl font-normal flex">
                <Minus className="my-auto mr-1" /> Website for personal
                livestreams and clips
              </span>
            </h1>
            <div className="rounded-full bg-purple-300 w-24 py-1">
              <p className="text-center font-semibold text-sm text-purple-800">
                Personal
              </p>
            </div>
            <div className="flex">
              <Clock className="my-auto mr-2" />
              <p>Mar {"'"}22 - Present</p>
            </div>
            <div className="flex">
              <Flag className="my-auto mr-2" />
              <p>Web Developer</p>
            </div>
            <div>
              <p className="flex">
                <span>
                  <CornerDownRight className="my-auto mr-2" />
                </span>
                This project started out as a simple video sharing solution that
                had working embeds primarily for Discord and Twitter. It
                {"'"}s evolved a bit since then to become my own livestreaming
                site.
              </p>
            </div>
            <div>
              <p className="flex">
                <span>
                  <CornerDownRight className="my-auto mr-2" />
                </span>
                This project leverages TailwindCSS for styling, Cloudflare
                Stream and Mux for video hosting, Supabase for tracking view
                counts, comments and like counts, Next.JS and Vercel for
                hosting.
              </p>
            </div>
            <div className="flex">
              <User className="my-auto mr-2" />
              <p>Solo Project</p>
            </div>
            <div>
              <a href="https://sdelta.xyz">
                <Button className="w-full mb-1">
                  <p className="flex justify-center">
                    sdelta.xyz
                    <ExternalLink className="my-auto ml-1" />
                  </p>
                </Button>
              </a>
              <p className="text-center text-xs">
                🚩 <span className="font-bold">Random Fact:</span> This project
                was the first time I leveraged an API!
              </p>
            </div>
          </div>
        </div>

        <div className="md:flex md:justify-between md:space-x-8 space-y-8 md:space-y-0">
          <div className="md:w-[50%] flex justify-center">
            <div className="transform duration-200 hover:scale-[1.05] transition-all">
              <Image
                src="https://res.cloudinary.com/denivusi1/image/upload/v1679379118/articles/savvyelectrical.png"
                width={500}
                height={500}
                alt="Savvy Electrical Website Preview"
                className="rounded-lg shadow-xl dark:shadow-none"
              />
            </div>
          </div>
          <div className="md:w-[50%] space-y-2">
            <h1 className="font-bold text-3xl">
              Savvy Electrical and Data{" "}
              <span className="text-[#888888] text-2xl font-normal flex">
                <Minus className="my-auto mr-1" /> Website for local electrician
                business
              </span>
            </h1>
            <div className="rounded-full bg-green-300 w-24 py-1">
              <p className="text-center font-semibold text-sm text-green-800">
                Freelance
              </p>
            </div>
            <div className="flex">
              <Clock className="my-auto mr-2" />
              <p>
                Jun {"'"}21 - Jul {"'"}21
              </p>
            </div>
            <div className="flex">
              <Flag className="my-auto mr-2" />
              <p>Web Developer</p>
            </div>
            <div>
              <p className="flex">
                <span>
                  <CornerDownRight className="my-auto mr-2" />
                </span>
                This site was provides basic online presence for the company
                allowing them some additional exposure.
              </p>
            </div>
            <div>
              <p className="flex">
                <span>
                  <CornerDownRight className="my-auto mr-2" />
                </span>
                This project leverages custom TailwindCSS for styling, Next.JS
                Static Exports and GitHub Pages for hosting.
              </p>
            </div>
            <div className="flex">
              <User className="my-auto mr-2" />
              <p>Solo Project</p>
            </div>
            <div>
              <a href="https://savvyelectricalanddata.com.au">
                <Button className="w-full mb-1">
                  <p className="flex justify-center">
                    savvyelectricalanddata.com.au
                    <ExternalLink className="my-auto ml-1" />
                  </p>
                </Button>
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
                src="https://res.cloudinary.com/denivusi1/image/upload/v1679379120/articles/mindenbaptist.png"
                width={500}
                height={500}
                alt="Miden Baptist Website Preview"
                className="rounded-lg shadow-xl dark:shadow-none"
              />
            </div>
          </div>
          <div className="md:w-[50%] space-y-2">
            <h1 className="font-bold text-3xl">
              Minden Baptist Church{" "}
              <span className="text-[#888888] text-2xl font-normal flex">
                <Minus className="my-auto mr-1" /> Website for local church
              </span>
            </h1>
            <div className="rounded-full bg-green-300 w-24 py-1">
              <p className="text-center font-semibold text-sm text-green-800">
                Freelance
              </p>
            </div>
            <div className="flex">
              <Clock className="my-auto mr-2" />
              <p>
                May {"'"}21 - May {"'"}21
              </p>
            </div>
            <div className="flex">
              <Flag className="my-auto mr-2" />
              <p>Web Developer</p>
            </div>
            <div>
              <p className="flex">
                <span>
                  <CornerDownRight className="my-auto mr-2" />
                </span>
                This website would go onto replace the existing site that was
                very out of date at the time.
              </p>
            </div>
            <div>
              <p className="flex">
                <span>
                  <CornerDownRight className="my-auto mr-2" />
                </span>
                This project leverages custom CSS templates for styling, Gatsby
                and GitHub Pages for hosting.
              </p>
            </div>
            <div className="flex">
              <User className="my-auto mr-2" />
              <p>Solo Project</p>
            </div>
            <div>
              <a href="https://mindenbaptist.org">
                <Button className="w-full mb-1">
                  <p className="flex justify-center">
                    mindenbaptist.org
                    <ExternalLink className="my-auto ml-1" />
                  </p>
                </Button>
              </a>
              <p className="text-center text-xs">
                🥇 <span className="font-bold">Random Fact:</span> This was the
                first project I worked on!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
