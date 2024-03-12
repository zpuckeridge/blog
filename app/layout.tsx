import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Dot from "@/components/follow-pointer";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from "@/lib/umami";
import Script from "next/script";
import ScrollToTop from "@/components/scroll-to-top";

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
  manifest: "/manifest.json",
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
          "min-h-screen bg-background font-sans antialiased selection:bg-white selection:text-black",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <Dot />
          <Navigation />
          {children}
          <ScrollToTop />
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
      <Script src={UMAMI_SCRIPT_URL} data-website-id={UMAMI_WEBSITE_ID} />
    </html>
  );
}
