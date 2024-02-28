import Gallery from "@/components/gallery";
import cloudinary from "@/lib/cloudinary";
import { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Zacchary's personal photo gallery. Here you'll find photos from his life and travels.",
};

export default async function GalleryPage() {
  const data = await cloudinary.v2.search
    .expression(`folder:blog/*`)
    .sort_by("created_at", "desc")
    .max_results(400)
    .execute();

  return (
    <div className="max-w-7xl mx-auto py-32 px-4">
      <div className="flex flex-col gap-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Welcome to my personal photo gallery. Here you&apos;ll find photos
            from my life and travels.
          </p>
        </div>

        <Gallery images={data.resources} />
      </div>
    </div>
  );
}
