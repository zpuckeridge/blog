import { NextSeo } from "next-seo";

export default function Gallery() {
  return (
    <>
      <NextSeo
        title="Gallery | Zacchary Puckeridge"
        description="View some of my favourite photos!"
      />
      <div className="grid place-items-center max-w-2xl mx-auto">
        <div className="p-4">
          <h5 className="text-6xl font-extrabold text-gray-900 dark:text-white text-center">
            Gallery WIP! 😱
          </h5>
        </div>
      </div>
    </>
  );
}
