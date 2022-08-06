import MainMenu from "./MainMenu";
import ThemeSwitch from "./ThemeSwitch";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <div className="flex flex-col justify-center px-8">
        <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8  text-gray-900 dark:text-gray-100">
          <MainMenu />
          <ThemeSwitch />
        </nav>
        <main className="flex flex-col justify-center px-8">{children}</main>
        <footer className="p-2 text-center -mt-10">
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
            and <a href="https://github.com/zpuckeridge/blog">💖</a>
          </div>
        </footer>
      </div>
    </>
  );
}
