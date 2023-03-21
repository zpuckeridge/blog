import Link from "next/link";
import { FiSettings } from "react-icons/fi";
import Navigation from "./Navigation";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <div className="p-4 bg-[#111111] flex flex-col min-h-screen justify-between">
        <nav className="sticky top-4 z-[99]">
          <Navigation />
        </nav>
        <main className="mx-auto">{children}</main>
        <footer className="text-center">
          <div className="font-semibold text-md text-[#888888]">
            Made with{" "}
            <a
              href="https://nextjs.org/"
              className="hover:text-white transition-all duration-200">
              Next.JS
            </a>
            ,{" "}
            <a
              href="https://reactjs.org/"
              className="hover:text-white transition-all duration-200">
              React
            </a>
            ,{" "}
            <a
              href="https://tailwindcss.com/"
              className="hover:text-white transition-all duration-200">
              Tailwind CSS
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/zpuckeridge/blog"
              className="hover:text-[#ff0000] transition-all duration-200">
              ❤
            </a>
          </div>
          <div className="fixed bottom-4 right-4 hover:text-white text-[#888888] transition-all duration-200">
            <Link href="/dashboard" title="Dashboard">
              <FiSettings className="h-5 w-5 " />
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
