import MainMenu from "./MainMenu";
import ThemeSwitch from "./ThemeSwitch";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <div className="p-4 dark:bg-black flex flex-col min-h-screen justify-between">
        <nav className="mx-auto flex justify-between w-full max-w-2xl border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
          <MainMenu />
          <ThemeSwitch />
        </nav>
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
