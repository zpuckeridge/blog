import { useState } from "react";
import Link from "next/link";

export default function MainMenu() {
  const [navbar, setNavbar] = useState(false);
  return (
    <>
      <nav className="w-full justify-between inline flex">
        <div className="md:hidden">
          <button
            className="p-2 rounded-lg bg-gray-200 dark:bg-[#1d1f22] flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
            onClick={() => setNavbar(!navbar)}
          >
            {navbar ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`flex-1 justify-self-center mt-14 -ml-8 md:ml-0 md:block md:pb-0 md:mt-0 ${
            navbar ? "block" : "hidden"
          }`}
        >
          <ul className="items-center justify-center space-y-4 md:flex md:space-y-0 font-semibold">
            <li>
              <Link href="/">
                <button
                  className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                  onClick={() => setNavbar(!navbar)}
                >
                  Home
                </button>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <button
                  className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                  onClick={() => setNavbar(!navbar)}
                >
                  About
                </button>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <button
                  className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                  onClick={() => setNavbar(!navbar)}
                >
                  Blog
                </button>
              </Link>
            </li>
            <li>
              <Link href="/projects">
                <button
                  className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                  onClick={() => setNavbar(!navbar)}
                >
                  Projects
                </button>
              </Link>
            </li>
            <li>
              <Link href="/timeline">
                <button
                  className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                  onClick={() => setNavbar(!navbar)}
                >
                  Timeline
                </button>
              </Link>
            </li>
            <li>
              <Link href="/uses">
                <button
                  className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                  onClick={() => setNavbar(!navbar)}
                >
                  Uses
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
