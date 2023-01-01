import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { useEffect, useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";

export default function Layout({ children }: { children: any }) {
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    const updateNavbar = () => {
      if (window.innerWidth < 768) {
        setNavbar(false);
      } else {
        setNavbar(true);
      }
    };
    updateNavbar();
    window.addEventListener("resize", updateNavbar);
    return () => window.removeEventListener("resize", updateNavbar);
  }, []);

  const toggleNavbar = () => setNavbar(!navbar);

  return (
    <>
      <div className="p-4 dark:bg-black flex flex-col min-h-screen justify-between">
        <div className="flex justify-center z-50">
          <div className="fixed max-w-3xl w-[93%] lg:w-full bg-white dark:bg-white/5 border border-zinc-800/50 rounded-lg backdrop-blur-xl backdrop-brightness-125 p-2">
            <nav className="flex justify-between my-auto">
              <div className="my-auto">
                <div className="md:hidden">
                  <button
                    className="p-2 rounded-lg bg-gray-200 dark:bg-[#1d1f22] flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
                    onClick={toggleNavbar}
                  >
                    {navbar ? (
                      <FiX className="w-6 h-6" />
                    ) : (
                      <FiMenu className="w-6 h-6" />
                    )}
                  </button>
                </div>
                <div className={`md:block ${navbar ? "block" : "hidden"}`}>
                  <ul className="w-full items-center justify-center space-y-4 md:flex md:space-y-0 font-semibold">
                    <li className="w-full">
                      <Link href="/">
                        <button
                          className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                          onClick={toggleNavbar}
                        >
                          Home
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link href="/about">
                        <button
                          className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                          onClick={toggleNavbar}
                        >
                          About
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog">
                        <button
                          className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                          onClick={toggleNavbar}
                        >
                          Blog
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link href="/gallery">
                        <button
                          className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                          onClick={toggleNavbar}
                        >
                          Gallery
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link href="/projects">
                        <button
                          className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                          onClick={toggleNavbar}
                        >
                          Projects
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link href="/timeline">
                        <button
                          className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                          onClick={toggleNavbar}
                        >
                          Timeline
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link href="/uses">
                        <button
                          className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                          onClick={toggleNavbar}
                        >
                          Uses
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <ThemeSwitch />
              </div>
            </nav>
          </div>
        </div>
        <main className="mx-auto max-w-2xl">{children}</main>
        <footer className="text-center">
          <div className="font-semibold text-md text-gray-600 dark:text-gray-400">
            Made with{" "}
            <a
              href="https://nextjs.org/"
              className="hover:text-gray-800 dark:hover:text-gray-200 transition-all"
            >
              Next.JS
            </a>
            ,{" "}
            <a
              href="https://reactjs.org/"
              className="hover:text-gray-800 dark:hover:text-gray-200 transition-all"
            >
              React
            </a>
            ,{" "}
            <a
              href="https://tailwindcss.com/"
              className="hover:text-gray-800 dark:hover:text-gray-200 transition-all"
            >
              Tailwind CSS
            </a>{" "}
            and <a href="https://github.com/zpuckeridge/blog">❤</a>
          </div>
        </footer>
      </div>
    </>
  );
}
