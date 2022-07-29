import Link from "next/link";

import Settings from "../components/settings";

export default function Layout({ children }) {
  return (
    <>
      <header className="mb-8 py-4">
        <div className="container mx-auto flex justify-between">
          <div>
            <Link href="/">
              <a>🏡</a>
            </Link>
          </div>
          <div>
            <Settings />
          </div>
        </div>
      </header>
      <main className="container mx-auto flex-1">{children}</main>
    </>
  );
}
