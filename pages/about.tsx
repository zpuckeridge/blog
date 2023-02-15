import { NextSeo } from "next-seo";
import Link from "next/link";
import { FaDiscord, FaGithub, FaSpotify } from "react-icons/fa";
import Age from "../components/Age";
import Contact from "../components/Contact";
import TimeStatus from "../components/TimeStatus";

export default function About() {
  return (
    <>
      <NextSeo
        title="About | Zacchary Puckeridge"
        description="Learn more about Zacchary Puckeridge"
      />
      <div className="grid place-items-center text-white">
        <div className="mt-20 flex flex-col justify-center items-start max-w-2xl border-gray-700 mx-auto pb-16">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight text-white">
            🤔 About me
          </h1>
          <p className="mt-4">
            Hey there! {"I'm"} a <Age /> year old IT Administrator & Web
            Developer based out of Brisbane, Australia. Currently, {"I'm"}{" "}
            working for a VFX Studio called Rising Sun Pictures.
          </p>
          <div>
            <h2 className="text-2xl font-bold mt-4 mb-4">What do you do?</h2>
            <div>
              <p>
                Currently, {"I'm"} building tools to automate various processes
                at RSP as well as designing and deploying networking solutions.
              </p>
              <p className="mt-4">
                {" "}
                When {"I'm"} not at work, or working on a personal project,{" "}
                {"I'm"} hanging out with mates, riding motorcycles, playing
                video games, nerding out over audio and teaching myself
                animation.
              </p>
            </div>
            <h2 className="text-2xl font-bold mt-4 mb-4">
              Want to get in touch?
            </h2>
            <div>
              <div className="md:flex gap-4">
                <div className="w-full">
                  <Contact />
                </div>
                <div className="bg-white/5 md:w-1/3 md:mt-0 mt-4 w-full border border-zinc-800/50 rounded-lg p-4">
                  <Link href="https://github.com/zpuckeridge">
                    <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                      <FaGithub className="w-6 h-6 mr-1" /> GitHub
                    </button>
                  </Link>
                  <Link href="https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03?si=f67b4f43e7fa4620">
                    <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                      <FaSpotify className="w-6 h-6 mr-1" /> Spotify
                    </button>
                  </Link>
                  <div className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center">
                    <FaDiscord className="w-6 h-6 mr-1" /> sdelta#0001
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 justify-center flex">
              <TimeStatus />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
