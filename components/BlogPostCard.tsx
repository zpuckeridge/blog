import Link from "next/link";
import cn from "classnames";
import PageViews from "../components/PageViews";

export default function BlogPostCard({
  title,
  slug,
  gradient,
}: {
  title: string;
  slug: string;
  gradient: string;
}) {
  return (
    <>
      <Link
        href={`/post/${slug}`}
        className={cn(
          "transform hover:scale-[1.05] transition-all",
          "rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1",
          gradient
        )}
      >
        <div className="bg-white dark:bg-[#121212] flex flex-col justify-between h-full rounded-lg p-4">
          <div className="flex flex-col md:flex-row justify-between">
            <h4 className="text-lg md:text-lg font-medium mb-6 sm:mb-10 w-full text-gray-900 dark:text-gray-100 tracking-tight">
              {title}
            </h4>
          </div>
          <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <div className="ml-2">
              <PageViews slug={slug} />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
