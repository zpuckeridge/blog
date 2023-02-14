import Navigation from "./Navigation";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <div className="p-8 bg-[#111111] flex flex-col min-h-screen justify-between">
        <nav className="sticky top-8 z-[99]">
          <Navigation />
        </nav>
        <main className="mx-auto max-w-2xl">{children}</main>
        <footer className="text-center">
          <div className="font-semibold text-md text-[#888888]">
            Made with{" "}
            <a
              href="https://nextjs.org/"
              className="hover:text-white transition-all"
            >
              Next.JS
            </a>
            ,{" "}
            <a
              href="https://reactjs.org/"
              className="hover:text-white transition-all"
            >
              React
            </a>
            ,{" "}
            <a
              href="https://tailwindcss.com/"
              className="hover:text-white transition-all"
            >
              Tailwind CSS
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/zpuckeridge/blog"
              className="hover:text-white transition-all"
            >
              ❤
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
