import Head from "next/head";
import Link from "next/link";
import supabase from "../lib/supabase";

export async function getServerSideProps() {
  const { data, error } = await supabase.from("blog").select("tags");

  if (error) {
    throw new Error(error.message);
  }

  // Extract all values of the tags column
  const tags = Array.from(new Set(data.map((item: any) => item.tags)));

  return {
    props: {
      tags,
    },
  };
}

export default function Tags({ tags }: { tags: string[] }) {
  return (
    <>
      <Head>
        <title>Tags | Zacchary Puckeridge</title>
        <meta name="description" content="List articles via their tags" />
      </Head>
      <div>
        <h1 className="mt-20 mb-4 max-w-2xl mx-auto font-bold text-3xl md:text-5xl tracking-tight text-white">
          Tags
        </h1>
        <div className="grid gap-2 grid-cols-2 max-w-4xl mx-auto">
          {tags.map((tag) => (
            <div key={tag}>
              <Link href="/tags/[tag]" as={`/tags/${tag.toLowerCase()}`}>
                <button className="p-2 w-full bg-white/5 border text-white border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                  {tag}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
