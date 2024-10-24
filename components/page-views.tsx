import { EyeOpenIcon } from "@radix-ui/react-icons";

export default async function PageViews({ url }: { url: string }) {
  const views = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/page-views?url=${url}`,
  ).then((res) => res.json());

  return (
    <div className="flex gap-2">
      <EyeOpenIcon className="w-4 h-4 my-auto" />

      <p className="text-muted-foreground text-xs my-auto">
        {views.views} {views.views === 1 ? "view" : "views"} in the last 30 days
      </p>
    </div>
  );
}
