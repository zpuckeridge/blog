import { NextSeo } from "next-seo";
import TimeStatus from "../components/TimeStatus";

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
          <p className="mt-4">
            Hey there! {"I'm"} a 23 year old IT Administrator & Web Developer
            based out of Brisbane, Australia. Currently, {"I'm"} working for a
            VFX Studio called Rising Sun Pictures.
          </p>
          <div>
            <h5 className="text-2xl font-bold mt-4 mb-4">What do you do?</h5>
            <div>
              <p>
                Currently, {"I'm"} building tools to automate various processes
                at RSP as well as designing and deploying networking solutions.
              </p>
              <p className="mt-4">
                {" "}
                When {"I'm"} not at work, or working on a personal project,{" "}
                {"I'm"}
                hanging out with mates, riding motorcycles, playing video games,
                nerding out over audio and teaching myself animation.
              </p>
              <p className="mt-4 italic font-semibold">
                Epic and interesting stats to go here at some point!
              </p>
            </div>
            <h5 className="text-2xl font-bold mt-4 mb-4">Contact me</h5>
            <p className="italic font-semibold">
              Super cool form that triggers a Discord message to go here...
              soon!
            </p>
          </div>
        </div>
        <TimeStatus />
      </div>
    </>
  );
}
