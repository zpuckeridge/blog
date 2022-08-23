import { NextSeo } from "next-seo";
import Image from "next/image";
import TopTracks from "../components/TopTracks";

export default function About() {
  return (
    <>
      <NextSeo
        title="About | Zacchary Puckeridge"
        description="Learn more about Zacchary Puckeridge"
      />
      <div className="grid place-items-center">
        <div className="mt-20 flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight text-black dark:text-white">
            🤔 About me
          </h1>
          <h2 className="text-gray-700 dark:text-gray-200 mt-2">
            Hey there! I'm a 22 year old IT Administrator & Web Developer based
            out of Brisbane, Australia. Currently, I'm working for a VFX Studio
            called Rising Sun Pictures.
          </h2>
          <div>
            <h5 className="text-2xl font-bold mt-4">
              What are you currently learning?
            </h5>
            <div>
              <h2 className="text-gray-700 dark:text-gray-200 mt-2">
                Currently, {"I'm"} building tools to automate various processes
                at RSP as well as designing and deploying networking solutions.
                <br />
                When {"I'm"} not at work, or working on a personal project,{" "}
                {"I'm"}
                hanging out with mates, riding motorcycles, playing video games,
                nerding out over audio and teaching myself animation.
              </h2>
            </div>
          </div>
          <div className="grid place-items-center h-64 w-64">
            <Image
              alt="Zacchary Puckeridge"
              width={100}
              height={100}
              priority
              src="/images/profile-pic.jpg"
              className="w-full shadow-xl rounded-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}
