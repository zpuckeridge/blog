import Lanyard from "@/components/lanyard";
import Navigation from "@/components/navigation/navigation";
import NowPlaying from "@/components/now-playing";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from "@/lib/umami";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Work_Sans as FontSans } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
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
    icon: "/avatar.jpg",
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
    template: "%s | Zacchary Puckeridge",
  },
  description:
    "Christian IT Administrator working for Rising Sun Pictures. Building better artist experiences by day, Web Developer by night.",
  openGraph: {
    url: "https://zacchary.me",
    title: "Zacchary Puckeridge",
    description:
      "Christian IT Administrator working for Rising Sun Pictures. Building better artist experiences by day, Web Developer by night.",
    images: "/avatar.jpg",
    siteName: "zpuckeridge",
  },
  twitter: {
    creator: "@zpuckeridge",
    card: "summary_large_image",
    images: "/avatar.jpg",
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
          `min-h-screen bg-gradient-to-br from-[#111111] to-black  font-sans antialiased selection:bg-cyan-950 selection:text-cyan-400`,
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <div className="pointer-events-none fixed inset-x-0 bottom-10 lg:bottom-0 h-20  bg-gradient-to-t from-black dark:from-background z-10" />

          <div className="flex lg:flex-row flex-col gap-8 lg:gap-0 md:justify-between p-8 ">
            <div className="flex flex-col lg:w-1/3 max-w-md lg:max-w-none lg:sticky top-0">
              <div className="lg:sticky top-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm whitespace-nowrap">
                    <Link href="/" className="hover:text-muted-foreground">
                      Zacchary Puckeridge
                    </Link>
                    <p className="text-muted-foreground">Web Developer</p>
                  </div>

                  <Link
                    href="/hire-me"
                    className="rounded-full bg-green-500/10 border text-xs text-white font-semibold px-2 my-auto py-0.5 border-green-500 flex justify-center gap-2"
                  >
                    <div className="h-3 w-3 rounded-full animate-pulse bg-green-500/50 relative my-auto flex justify-center items-center">
                      <div className="h-1.5 w-1.5 rounded-full animate-pulse bg-green-500" />
                    </div>

                    <div className="my-auto">I&apos;m available for work</div>
                  </Link>
                </div>
              </div>
            </div>

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
      <Script src={UMAMI_SCRIPT_URL} data-website-id={UMAMI_WEBSITE_ID} />
    </html>
  );
}
