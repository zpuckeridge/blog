import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import LoginButton from "./LoginButton";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [isLoading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 rounded-lg max-w-6xl backdrop-blur-xl backdrop-brightness-125 shadow-2xl">
          <div className="mx-auto px-4">
            <div className="flex justify-between">
              <div>
                <Link
                  href="/"
                  className="flex items-center py-2 text-white hover:text-[#888888]"
                  title="Home">
                  <Image
                    alt="Zacchary Puckeridge"
                    height={40}
                    width={40}
                    src="/images/profile-pic.jpg"
                    className={cn(
                      "rounded-full duration-700 ease-in-out select-none",
                      isLoading
                        ? "grayscale blur-2xl scale-110"
                        : "grayscale-0 blur-0 scale-100"
                    )}
                    onLoadingComplete={() => setLoading(false)}
                    priority={true}
                  />
                  <span className="ml-2 text-lg font-bold transition-all duration-200 shadow-2xl">
                    Zacchary Puckeridge
                  </span>
                </Link>
              </div>
              <div className="flex space-x-7">
                <div className="hidden items-center space-x-4 lg:flex">
                  <Link href="/about" title="About">
                    <button className="inline-flex text-white font-semibold transition-all duration-200 hover:text-[#888888]">
                      About
                    </button>
                  </Link>
                  <Link href="/blog" title="Blog">
                    <button className="block text-white font-semibold transition-all duration-200 hover:text-[#888888]">
                      Blog
                    </button>
                  </Link>
                  <Link href="/gallery" title="Gallery">
                    <button className="block text-white font-semibold transition-all duration-200 hover:text-[#888888]">
                      Gallery
                    </button>
                  </Link>
                  <Link href="/projects" title="Projects">
                    <button className="block text-white font-semibold transition-all duration-200 hover:text-[#888888]">
                      Projects
                    </button>
                  </Link>
                  <Link href="/timeline" title="Timeline">
                    <button className="block text-white font-semibold transition-all duration-200 hover:text-[#888888]">
                      Timeline
                    </button>
                  </Link>
                  <Link href="/uses" title="Uses">
                    <button className="block text-white font-semibold transition-all duration-200 hover:text-[#888888]">
                      Uses
                    </button>
                  </Link>
                  <LoginButton />
                </div>
              </div>

              <div className="flex items-center text-white transition-all duration-200 hover:text-[#888888] lg:hidden">
                <button
                  className="mobile-menu-button outline-none"
                  title="Mobile Menu"
                  onClick={() => setShowMenu(!showMenu)}>
                  <FiMenu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          <div className={`mobile-menu ${showMenu ? "block" : "hidden"}`}>
            <ul
              className="top-100 absolute left-0 right-0 bg-[#1d1d1d] border border-zinc-800/50 rounded-b-lg max-w-6xl text-2xl shadow-xl"
              onClick={() => setShowMenu(false)}>
              <li className="relative">
                <Link
                  href="/about"
                  className="block px-2 py-4 text-center font-semibold text-white transition duration-200 hover:bg-white/10 hover:text-gray-300"
                  title="About">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block px-2 py-4 text-center font-semibold text-white transition duration-200 hover:bg-white/10 hover:text-gray-300"
                  title="Blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="block px-2 py-4 text-center font-semibold text-white transition duration-200 hover:bg-white/10 hover:text-gray-300"
                  title="Gallery">
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="block px-2 py-4 text-center font-semibold text-white transition duration-200 hover:bg-white/10 hover:text-gray-300"
                  title="Projects">
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/timeline"
                  className="block px-2 py-4 text-center font-semibold text-white transition duration-200 hover:bg-white/10 hover:text-gray-300"
                  title="Timeline">
                  Timeline
                </Link>
              </li>
              <li>
                <Link
                  href="/uses"
                  className="block px-2 py-4 text-center font-semibold text-white transition duration-200 hover:bg-white/10 hover:text-gray-300"
                  title="Uses">
                  Uses
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
