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
    <>
      <main className="max-w-4xl mx-auto my-10 px-4">
        <Gallery images={data.resources} />
      </main>
    </>
  );
}
