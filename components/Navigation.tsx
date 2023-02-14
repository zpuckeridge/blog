import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FiArrowDown,
  FiCornerDownRight,
  FiInstagram,
  FiMenu,
} from "react-icons/fi";

export default function Navigation() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 border border-zinc-800/50 rounded-lg max-w-6xl backdrop-blur-xl backdrop-brightness-125">
          <div className="mx-auto px-4">
            <div className="flex justify-between">
              <div>
                <Link
                  href="/"
                  className="flex items-center py-3 text-white hover:text-[#888888]"
                  title="Home"
                >
                  <Image
                    alt="Zacchary Puckeridge"
                    height={40}
                    width={40}
                    src="/images/profile-pic.jpg"
                    className="rounded-full"
                  />
                  <span className="ml-2 text-lg font-bold transition-all duration-200">
                    Zacchary Puckeridge
                  </span>
                </Link>
              </div>
              <div className="flex space-x-7">
                <div className="hidden items-center space-x-6 lg:flex">
                  <Link href="/about" title="About">
                    <button className="inline-flex text-white font-medium transition-all duration-200 hover:text-[#888888]">
                      About
                    </button>
                  </Link>
                  <Link href="/blog" title="Food">
                    <button className="block text-white font-medium transition-all duration-200 hover:text-[#888888]">
                      Blog
                    </button>
                  </Link>
                  <Link href="/gallery" title="Products">
                    <button className="block text-white font-medium transition-all duration-200 hover:text-[#888888]">
                      Gallery
                    </button>
                  </Link>
                  <Link href="/projects" title="Portraits">
                    <button className="block text-white font-medium transition-all duration-200 hover:text-[#888888]">
                      Projects
                    </button>
                  </Link>
                  <Link href="/timeline" title="Events">
                    <button className="block text-white font-medium transition-all duration-200 hover:text-[#888888]">
                      Timeline
                    </button>
                  </Link>
                  <Link href="/uses" title="Events">
                    <button className="block text-white font-medium transition-all duration-200 hover:text-[#888888]">
                      Uses
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex items-center text-white transition-all duration-200 hover:text-[#888888] lg:hidden">
                <button
                  className="mobile-menu-button outline-none"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <FiMenu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          <div className={`mobile-menu ${showMenu ? "block" : "hidden"}`}>
            <ul
              className="top-100 absolute left-0 right-0 bg-[#1d1d1d] border border-zinc-800/50 rounded-b-lg max-w-6xl text-2xl shadow-xl"
              onClick={() => setShowMenu(false)}
            >
              <li className="relative">
                <Link
                  href="/about"
                  className="block px-2 py-4 text-center font-semibold text-white transition duration-200 hover:bg-white/10 hover:text-gray-300"
                  title="About"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block px-2 py-4 text-center font-semibold text-white transition duration-200 hover:bg-white/10 hover:text-gray-300"
                  title="Contact Us"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="block px-2 py-4 text-center font-semibold text-white transition duration-200 hover:bg-white/10 hover:text-gray-300"
                  title="Contact Us"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="block px-2 py-4 text-center font-semibold text-white transition duration-200 hover:bg-white/10 hover:text-gray-300"
                  title="Contact Us"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/timeline"
                  className="block px-2 py-4 text-center font-semibold text-white transition duration-200 hover:bg-white/10 hover:text-gray-300"
                  title="Contact Us"
                >
                  Timeline
                </Link>
              </li>
              <li>
                <Link
                  href="/uses"
                  className="block px-2 py-4 text-center font-semibold text-white transition duration-200 hover:bg-white/10 hover:text-gray-300"
                  title="Contact Us"
                >
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
