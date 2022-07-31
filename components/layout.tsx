import Settings from "../components/settings";
import WebMenu from "../components/menu";

export default function Layout({ children }) {
  return (
    <>
      <header className="p-2 absolute">
        <div>
          <div className="fixed top-2 left-2">
            <WebMenu />
          </div>
          <div className="fixed top-2 right-2">
            <Settings />
          </div>
        </div>
      </header>
      <main className="container mx-auto flex-1">{children}</main>
      <footer className="p-2 text-center -mt-10">
        <div className="font-semibold text-md text-gray-400">
          Made with{" "}
          <a href="https://nextjs.org/" className="hover:text-green-300">
            Next.JS
          </a>
          ,{" "}
          <a href="https://reactjs.org/" className="hover:text-green-300">
            React
          </a>
          ,{" "}
          <a href="https://tailwindcss.com/" className="hover:text-green-300">
            Tailwind CSS
          </a>{" "}
          and <a href="https://github.com/zpuckeridge/blog">💖</a>
        </div>
      </footer>
    </>
  );
}
