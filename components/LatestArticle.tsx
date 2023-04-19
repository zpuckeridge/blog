import { getLatestPost } from "@/app/ghost-client";
import { PostOrPage } from "@tryghost/content-api";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default async function LatestArticle() {
  const data = await getLatestPost();

  return (
    <>
      <p className="text-center pb-2 border-b-[1px] border-dotted">
        Latest Article
      </p>
      <div className="pt-2 flex flex-col items-center justify-center ">
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
    </>
  );
}
