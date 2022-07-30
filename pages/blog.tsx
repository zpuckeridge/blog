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

export default function Blog({ posts }) {
  return (
    <div className="mt-16 mb-16">
      <label className="relative block mb-2">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center">
          <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
        </span>
        <input
          className="focus:ring-indigo-500 focus:ring-offset-indigo-200 w-full transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-lg sm:text-sm"
          placeholder="Search posts"
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
    </div>
  );
}
