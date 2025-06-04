import { BlurFade } from "@/components/magicui/blur-fade";
import Videos from "@/components/videos";
import { compareDesc } from "date-fns";
import fs from "fs";
import matter from "gray-matter";
import { Metadata } from "next";
import path from "path";

export const metadata: Metadata = {
  title: "Videos",
  description: "A collection of videos I've created.",
};

interface Video {
  title: string;
  url: string;
  tag: string;
  videoUrl: string;
  duration: number;
  date: string;
}

async function getAllVideos(): Promise<Video[]> {
  const contentDir = path.join(process.cwd(), "_content");
  const videosDir = path.join(contentDir, "videos");

  const getAllFiles = (dir: string): Video[] => {
    const files = fs.readdirSync(dir);
    return files.map((file) => {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      const slug = file.replace(".mdx", "");
      return {
        ...data,
        url: `/${slug}`,
      } as Video;
    });
  };

  return getAllFiles(videosDir);
}

export default async function Clips() {
  const videos = (await getAllVideos()).sort((a, b) =>
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
