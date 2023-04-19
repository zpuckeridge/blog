import Image from "next/image";
import Link from "next/link";
import type { PostOrPage } from "@tryghost/content-api";
import { format } from "date-fns";

function Card({ item }: { item: PostOrPage }) {
  return (
    <div className="pt-5 pl-5 pr-5 my-3 mx-auto rounded-lg bg-white dark:bg-[#1a1a1a] shadow-xl dark:shadow-none">
      {item.featured !== null && item.feature_image !== undefined ? (
        <Link href={`/article/${item.slug}`}>
          <div className="">
            <Image
              className="rounded-lg object-cover aspect-video"
              width={1000}
              height={324}
              src={
                item.feature_image ??
                "https://images.unsplash.com/photo-1559311648-d46f5d8593d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
              }
              alt={(item.feature_image_alt || item.title) ?? "Placeholder"}
            />
          </div>
        </Link>
      ) : (
        " "
      )}

      <div className="mb-4">
        <Link href={`/article/${item.slug}`}>
          <h5 className="mt-4 font-bold text-lg">{item.title}</h5>
        </Link>
        <p className="my-2">{item.excerpt}</p>
        {item.published_at !== null && item.published_at !== undefined ? (
          <p className="text-[#888888]">
            {format(new Date(item.published_at), "MMMM dd, yyyy")}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Card;
