import Gallery from "@/components/gallery";
import cloudinary from "@/lib/cloudinary";
import { Metadata } from "next";

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
    <div className="max-w-md lg:mx-auto flex flex-col gap-20 pb-20">
      <div className="flex flex-col gap-12">
        <div className="space-y-4">
          <p className="text-sm">
            Welcome to my personal photo gallery. Here you&apos;ll find photos
            from my life and travels.
          </p>
        </div>

        <Gallery images={data.resources} />
      </div>
    </div>
  );
}
