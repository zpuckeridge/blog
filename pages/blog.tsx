import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";

export async function getStaticProps() {
  const files = fs.readdirSync("posts");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <>
      <label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
        </span>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Search for anything..."
          type="text"
          name="search"
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
        {posts.map(({ slug, frontmatter }) => (
          <div
            key={slug}
            className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <Link href={`/post/${slug}`}>
              <a>
                <Image
                  width={650}
                  height={340}
                  alt={frontmatter.title}
                  src={`/${frontmatter.socialImage}`}
                />
                <h1 className="p-4">{frontmatter.title}</h1>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
