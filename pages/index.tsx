import Link from "next/link";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Home | Zacchary Puckeridge"
        description="Zacchary Puckeridge's Website"
      />
      <div className="grid h-screen place-items-center">
        <div className="p-4 justify-center ">
          <h5 className="p-4 lg:text-8xl md:text-6xl text-6xl font-black font-white:dark text-center">
            Hey 👋 {"I'm"}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Zacchary,
            </span>
            <div className="">a developer</div>
          </h5>
          <p className="font-semibold pt-7 text-lg text-black dark:text-gray-300 text-center">
            {"I'm"} a 22 year old IT Administrator & Web Developer working for{" "}
            <a
              href="https://rsp.com.au"
              className="transition ease-in text-blue-400 hover:text-green-400"
            >
              Rising Sun Pictures
            </a>
          </p>
          <div className="flex justify-center">
            <div className="flex gap-4 pt-4">
              <Link href="/blog">
                <button
                  type="button"
                  aria-label="Blog Page"
                  className="inline-flex place-content-center w-36 transition ease-in duration-200 focus:ring-blue-400 focus:outline-none focus:ring-4 py-2 px-4 border-2 border-gray-300 dark:border-gray-800 bg-gray-600 bg-opacity-20 hover:bg-opacity-30 hover:bg-black w-full text-center text-base font-semibold shadow-md rounded-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Blog
                </button>
              </Link>
              <Link href="/projects">
                <button
                  type="button"
                  aria-label="Projects Page"
                  className="inline-flex place-content-center w-36 transition ease-in duration-200 focus:ring-blue-400 focus:outline-none focus:ring-4 py-2 px-4 border-2 border-gray-300 dark:border-gray-800 bg-gray-600 bg-opacity-20 hover:bg-opacity-30 hover:bg-black w-full text-center text-base font-semibold shadow-md rounded-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  Projects
                </button>
              </Link>
              <Link href="/about">
                <button
                  type="button"
                  aria-label="About Page"
                  className="inline-flex place-content-center w-36 transition ease-in duration-200 focus:ring-blue-400 focus:outline-none focus:ring-4 py-2 px-4 border-2 border-gray-300 dark:border-gray-800 bg-gray-600 bg-opacity-20 hover:bg-opacity-30 hover:bg-black w-full text-center text-base font-semibold shadow-md rounded-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  About
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
