import Card from "@/components/ui/Card";
import { getPostsNew, getPostsOld } from "@/app/ghost-client";
import { PostOrPage } from "@tryghost/content-api";
import Sort from "@/components/Sort";

export default async function Home() {
  const getPostNew = await getPostsNew();
  const getPostOld = await getPostsOld();

  return (
    <main className="flex flex-col max-w-2xl mx-auto">
      <Sort />

      {getPostNew?.map((item: PostOrPage) => {
        return <Card key={item.uuid} item={item} />;
      })}
    </main>
  );
}
