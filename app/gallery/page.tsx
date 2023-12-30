import Gallery from "@/components/gallery";

import cloudinary from "@/lib/cloudinary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "View Zacchary's photo gallery.",
};

export default async function GalleryPage() {
  const data = await cloudinary.v2.search
    .expression(`folder:blog/*`)
    .sort_by("created_at", "desc")
    .max_results(400)
    .execute();

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <Gallery images={data.resources} />
    </div>
  );
}
