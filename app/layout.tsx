import Lanyard from "@/components/lanyard";
import Navigation from "@/components/navigation/navigation";
import NowPlaying from "@/components/now-playing";
import ReturnToIndex from "@/components/return-to-index";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Nanum_Myeongjo as FontSerif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const fontSans = localFont({
  src: "../fonts/satoshi-variable.woff2",
  variable: "--font-sans",
  weight: "500",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zacchary.me"),
  alternates: {
    types: {
      "application/rss+xml": `https://zacchary.me/rss.xml`,
    },
  },
  applicationName: "zacchary.me",
  authors: { name: "zpuckeridge" },
  creator: "zpuckeridge",
  publisher: "zpuckeridge",
  generator: "Next.js",
  keywords: [
    "zpuckeridge",
    "zaccharypuckeridge",
    "zaccpuckeridge",
    "zacpuckeridge",
    "Zacchary Puckeridge",
    "Zacc Puckeridge",
    "Zac Puckeridge",
    "zacc",
    "zac",
    "zacchary.me",
  ],
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/avatar.avif",
  },
  appleWebApp: {
    title: "zacchary.me",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  title: {
    default: "Zacchary Puckeridge",
    template: "%s — Zacchary Puckeridge",
  },
  description:
    "Christian IT Administrator working for Rising Sun Pictures. Building better artist experiences by day, Web Developer by night.",
  openGraph: {
    url: "https://zacchary.me",
    title: "Zacchary Puckeridge",
    description:
      "Christian IT Administrator working for Rising Sun Pictures. Building better artist experiences by day, Web Developer by night.",
    images: "/avatar.avif",
    siteName: "zpuckeridge",
  },
  twitter: {
    creator: "@zpuckeridge",
    card: "summary_large_image",
    images: "/avatar.avif",
    description:
      "Christian IT Administrator working for Rising Sun Pictures. Building better artist experiences by day, Web Developer by night.",
    creatorId: "zpuckeridge",
    title: "Zacchary Puckeridge",
    site: "@zpuckeridge",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `min-h-screen font-sans text-black dark:text-neutral-300 selection:bg-blue-400/50 selection:text-blue-600 dark:selection:bg-blue-950/50 dark:selection:text-blue-400 subpixel-antialiased`,
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="pointer-events-none fixed inset-x-0 bottom-10 lg:bottom-0 h-20  bg-linear-to-t from-white dark:from-background  z-10" />

          <div className="flex lg:flex-row flex-col gap-8 lg:gap-0 md:justify-between p-8 ">
            <ReturnToIndex />

            <div className="w-full">{children}</div>

            <Navigation />

            <div className="fixed bottom-8 left-8 hidden lg:block z-20">
              <Lanyard />
            </div>

            <div className="fixed bottom-8 right-8 hidden lg:block z-20">
              <NowPlaying />
            </div>
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
