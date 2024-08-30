import Lanyard from "@/components/lanyard";
import Navigation from "@/components/navigation/navigation";
import NowPlaying from "@/components/now-playing";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from "@/lib/umami";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import {
  Work_Sans as FontSans,
  Nanum_Myeongjo as FontSerif,
} from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
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
          `min-h-screen bg-black font-sans subpixel-antialiased selection:bg-violet-950/50 selection:text-violet-400`,
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <div className="pointer-events-none fixed inset-x-0 bottom-10 lg:bottom-0 h-20  bg-gradient-to-t from-black dark:from-black z-10" />

          <div className="flex lg:flex-row flex-col gap-8 lg:gap-0 md:justify-between p-8 ">
            <div className="flex flex-col lg:w-1/3 max-w-sm lg:sticky top-0">
              <div className="lg:sticky top-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex gap-2 justify-between text-sm whitespace-nowrap">
                    <Link href="/" className="hover:text-violet-400">
                      Zacchary Puckeridge
                    </Link>
                    <p className="text-muted-foreground">Web Developer</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">{children}</div>

            <Navigation />

            {/* <div className="fixed bottom-8 right-8 hidden lg:block z-20 max-w-md">
              <Image
                src="/media/haddon.avif"
                width={250}
                height={250}
                alt="Haddon Institute"
                className="w-full h-full rounded-2xl"
              />
            </div> */}

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
      <Script src={UMAMI_SCRIPT_URL} data-website-id={UMAMI_WEBSITE_ID} />
    </html>
  );
}
