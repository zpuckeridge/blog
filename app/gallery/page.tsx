import Gallery from "@/components/gallery";

import cloudinary from "@/lib/cloudinary";

export default async function GalleryPage() {
  const data = await cloudinary.v2.search
    .expression(`folder:blog/*`)
    .sort_by("public_id", "desc")
    .max_results(100)
    .execute();

  return (
    <>
      <main>
        <Gallery images={data.resources} />
      </main>
    </>
  );
}
