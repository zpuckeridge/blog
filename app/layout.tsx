import Navigation from "@/components/ui/Navigation";
import { ThemeProvider } from "@/app/theme-provider";

import "./globals.css";

export const metadata = {
  title: "Zacchary Puckeridge",
  description: "Zacchary's Website",
};

import { Inter } from "next/font/google";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-[#f7f7f7] dark:bg-[#0f0f0f]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <nav className="p-4 text-gray-400">
            <Navigation />
          </nav>
          <main className="p-4 my-10">{children}</main>
          <footer className="p-4 border-t-[1px] border-[#888888] dark:border-[#2e2e2e]">
            <Footer />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
