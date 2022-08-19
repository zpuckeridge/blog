import { NextSeo } from "next-seo";
import Image from "next/future/image";
import TopTracks from "../components/TopTracks";

export default function About() {
  return (
    <>
      <NextSeo
        title="About | Zacchary Puckeridge"
        description="Learn more about Zacchary Puckeridge"
      />
      <div className="grid place-items-center">
        <div className="md:inline-flex lg:inline-flex max-w-8xl place-items-center mb-16">
          <div className="p-8 mt-20 w-128">
            <h5 className="text-4xl font-bold">🤔 About Zacchary Puckeridge</h5>
            <p className="text-lg mt-2">
              Hey there! {"I'm"} a 22 year old IT Administrator & Web Developer
              based out of Brisbane, Australia. Currently, {"I'm"} working for a
              VFX Studio called{" "}
              <a
                href="https://rsp.com.au"
                className="text-blue-400 hover:text-green-300"
              >
                Rising Sun Pictures
              </a>
              .
            </p>
            <div>
              <h5 className="text-2xl font-bold mt-5">
                What are you currently learning?
              </h5>
              <div>
                <p>
                  Currently, {"I'm"} building tools to automate various
                  processes at RSP as well as designing and deploying networking
                  solutions.
                </p>
                <br />
                <p>
                  When {"I'm"} not at work, or working on a personal project,{" "}
                  {"I'm"}
                  hanging out with mates, riding motorcycles, playing video
                  games, nerding out over audio and teaching myself animation.
                </p>
              </div>
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
