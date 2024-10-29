import BlurFade from "@/components/magicui/blur-fade";
import Videos from "@/components/videos";
import { allVideos } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos",
  description: "A collection of videos I've created.",
};

export default async function Clips() {
  const videos = allVideos.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <>
      <div className="max-w-lg mx-auto flex flex-col gap-20 pb-20">
        <BlurFade delay={0.1}>
          <p className="font-serif text-2xl italic ">Videos</p>
        </BlurFade>
        <div className="text-sm leading-relaxed flex flex-col gap-2">
          <BlurFade delay={0.2}>
            <p>
              A compilation of humorous, thrilling, and memorable moments from
              my life and some of the video games I regularly play.
            </p>
          </BlurFade>
        </div>

        <Videos videos={videos} itemsPerPage={4} />
      </div>
    </>
  );
}
