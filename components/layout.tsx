import Link from "next/link";

import Settings from "../components/settings";
import WebMenu from "../components/menu";

export default function Layout({ children }) {
  return (
    <>
      <header className="p-2">
        <div className="mx-auto flex justify-between">
          <div>
            <WebMenu />
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
