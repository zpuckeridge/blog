import { getLatestPost } from "@/app/ghost-client";
import { PostOrPage } from "@tryghost/content-api";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { Bookmark, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default async function LatestArticle() {
  const data = await getLatestPost();

  return (
    <>
      <div className="bg-white shadow-lg dark:shadow-none dark:bg-[#1f1f1f] w-full p-4 rounded-lg">
        <p className="flex justify-center">
          Latest Article <Edit3 size={18} className="my-auto ml-1" />
        </p>
        <div className="flex flex-col items-center justify-center ">
          {data?.map((item: PostOrPage) => {
            return <Card key={item.uuid} item={item} />;
          })}
        </div>
        <Link href="/blog">
          <Button className="w-full">
            <Bookmark size={18} className="my-auto mr-1" />
            Read all articles
          </Button>
        </Link>
      </div>
    </>
  );
}
