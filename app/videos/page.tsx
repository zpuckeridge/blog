import Videos from "@/components/videos";
import { getAllVideos } from "@/lib/get-videos";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos",
  description: "A collection of videos I've created.",
};

export default async function Clips() {
  const videos = getAllVideos();

  return (
    <>
      <div className="max-w-md mx-auto pb-20">
        <Videos videos={videos} itemsPerPage={6} />
      </div>
    </>
  );
}
