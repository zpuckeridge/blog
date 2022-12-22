import { useState, useEffect } from "react";
import Link from "next/link";
import classnames from "classnames";
import { FiX, FiMenu } from "react-icons/fi";

export default function MainMenu() {
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
      <nav className="w-full">
        <div className="md:hidden">
          <button
            className="p-2 rounded-lg bg-gray-200 dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
            onClick={toggleNavbar}
          >
            {navbar ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div
          className={classnames("md:block", {
            block: navbar,
            hidden: !navbar,
          })}
        >
          <ul className="md:w-full md:flex md:flex-row font-semibold">
            <li className="w-full">
              <Link href="/">
                <button
                  className="w-full p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                  onClick={toggleNavbar}
                >
                  Home
                </button>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/about">
                <button
                  className="w-full p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                  onClick={toggleNavbar}
                >
                  About
                </button>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/blog">
                <button
                  className="w-full p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                  onClick={toggleNavbar}
                >
                  Blog
                </button>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/projects">
                <button
                  className="w-full p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                  onClick={toggleNavbar}
                >
                  Projects
                </button>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/timeline">
                <button
                  className="w-full p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                  onClick={toggleNavbar}
                >
                  Timeline
                </button>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/uses">
                <button
                  className="w-full p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-[#1d1f22] hover:ring-2 ring-gray-300 transition-all"
                  onClick={toggleNavbar}
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
