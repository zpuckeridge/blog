import Link from "next/link";

export default function Notice() {
  return (
    <>
      <aside className="fixed z-50 flex items-center justify-center px-5 py-3 text-white bg-black rounded-lg bottom-4 right-4">
        <Link href="https://production.blog-9ef.pages.dev/">
          <a className="text-sm font-medium hover:opacity-75">
            👋 Looking for my old site?
          </a>
        </Link>
        <button
          className="p-1 ml-3 rounded bg-white/20 hover:bg-white/10"
          aria-label="Dismiss Popup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </aside>
    </>
  );
}