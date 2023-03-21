import Head from "next/head";
import Link from "next/link";
import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaSpotify,
  FaSteam,
} from "react-icons/fa";
import Age from "../components/Age";
import Contact from "../components/Contact";
import TimeStatus from "../components/TimeStatus";

export default function About() {
  return (
    <>
      <Head>
        <title>About | Zacchary Puckeridge</title>
        <meta name="description" content="Learn more about me!" />
      </Head>
      <div className="grid place-items-center text-white">
        <div className="mt-20 flex flex-col justify-center items-start max-w-2xl border-gray-700 mx-auto pb-16">
          <h1 className="font-bold text-5xl tracking-tight text-white">
            About Me
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
                  <a href="https://github.com/zpuckeridge">
                    <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                      <FaGithub className="w-6 h-6 mr-1" /> GitHub
                    </button>
                  </a>
                  <a href="https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03?si=f67b4f43e7fa4620">
                    <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                      <FaSpotify className="w-6 h-6 mr-1" /> Spotify
                    </button>
                  </a>
                  <a href="https://www.linkedin.com/in/zpuckeridge">
                    <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                      <FaLinkedin className="w-6 h-6 mr-1" /> LinkedIn
                    </button>
                  </a>
                  <a href="https://discordapp.com/users/181324210876973056">
                    <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                      <FaDiscord className="w-6 h-6 mr-1" /> sdelta
                    </button>
                  </a>
                  <a href="https://steamcommunity.com/id/sdelta_/">
                    <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                      <FaSteam className="w-6 h-6 mr-1" /> sdelta_
                    </button>
                  </a>
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
