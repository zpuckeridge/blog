import Link from "next/link";

export default function Breadcrumb() {
  return (
    <div className="mt-5">
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          className="flex justify-center items-center space-x-2 font-bold text-gray-400"
        >
          <li>
            <Link href="/">
              <a className="transition ease-in hover:text-green-400">Home</a>
            </Link>
          </li>

          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>

          <li>
            <Link href="/blog">
              <a className="transition ease-in hover:text-green-400">Blog</a>
            </Link>
          </li>

          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>

          <li>
            <Link href="#">
              <a className="transition ease-in hover:text-green-400">
                {frontmatter.title}
              </a>
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
}
