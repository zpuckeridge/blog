import Link from "next/link";
import supabase from "../../lib/supabase";

export async function getServerSideProps(context: any) {
  const { tag } = context.query;

  const { data, error } = await supabase
    .from("blog")
    .select("slug, tags, title")
    .eq("tags", tag.charAt(0).toUpperCase() + tag.slice(1));

  if (error) {
    throw new Error(error.message);
  }

  return {
    props: {
      data,
    },
  };
}

export default function Tag({ data }: { data: any }) {
  return (
    <div>
      <ul>
        {data.map((article: any) => (
          <li key={article.slug}>
            <Link href="/article/[slug]" as={`/article/${article.slug}`}>
              <button className="p-2 mb-2 my-auto w-full bg-white/5 border border-zinc-800/50 text-white rounded-lg flex hover:ring-2 ring-gray-300 transition-all">
                {article.title}
              </button>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/tags" className="text-blue-500 hover:text-blue-400">
        Back to tags
      </Link>
    </div>
  );
}
