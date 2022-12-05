import { Fragment } from "react";
import Link from "next/link";

export default function MainMenu() {
  return (
    <>
      <nav className="inline-flex gap-3 my-auto">
        <div>
          <Link href="/">
            <button className="pl-2 pr-2 pt-1 pb-1 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
              Home
            </button>
          </Link>
        </div>
        <div>
          <Link href="/about">
            <button className="pl-2 pr-2 pt-1 pb-1 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
              About
            </button>
          </Link>
        </div>
        <div>
          <Link href="/blog">
            <button className="pl-2 pr-2 pt-1 pb-1 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
              Blog
            </button>
          </Link>
        </div>
        <div>
          <Link href="/projects">
            <button className="pl-2 pr-2 pt-1 pb-1 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
              Projects
            </button>
          </Link>
        </div>
        <div>
          <Link href="/timeline">
            <button className="pl-2 pr-2 pt-1 pb-1 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
              Timeline
            </button>
          </Link>
        </div>
        <div>
          <Link href="/uses">
            <button className="pl-2 pr-2 pt-1 pb-1 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
              Uses
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}
