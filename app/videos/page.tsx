import Videos from "@/components/videos";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos",
  description: "A collection of videos I've created.",
};

export default async function Clips() {
  const videos = await prisma.video.findMany({
    orderBy: { date: "desc" },
  });

  const tags = await prisma.video.findMany({
    select: { tag: true },
  });

  return (
    <>
      <div className="max-w-md mx-auto pb-20">
        <Videos videos={videos} tags={tags} itemsPerPage={6} />
      </div>
    </>
  );
}
