import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import { AgentationToolbar } from "@/components/agentation-toolbar";
import Navigation from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "@/app/globals.css";
import { cn } from "@/lib/utils";

const fontSans = localFont({
  src: "../../public/fonts/archivo.woff2",
  variable: "--font-sans",
  weight: "500",
});

const fontRedactionItalic = localFont({
  src: "../../public/fonts/redaction-italic.woff2",
  variable: "--font-redaction-italic",
});

const fontRedaction = localFont({
  src: "../../public/fonts/redaction-regular.woff2",
  variable: "--font-redaction",
  weight: "100",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
});

export const metadata: Metadata = {
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  appleWebApp: {
    statusBarStyle: "default",
    title: "zacchary.me",
  },
  applicationName: "zacchary.me",
  authors: { name: "zpuckeridge" },
  creator: "zpuckeridge",
  description:
    "Christian IT Administrator working for Rising Sun Pictures. Building better artist experiences by day, Web Developer by night.",
  formatDetection: {
    telephone: false,
  },
  generator: "Next.js",
  icons: {
    icon: "/avatar-2026.avif",
  },
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
  metadataBase: new URL("https://zacchary.me"),
  openGraph: {
    description:
      "Christian IT Administrator working for Rising Sun Pictures. Building better artist experiences by day, Web Developer by night.",
    images: "/avatar-2026.avif",
    siteName: "zacchary.me",
    title: "Zacchary Puckeridge",
    url: "https://zacchary.me",
  },
  publisher: "zpuckeridge",
  referrer: "origin-when-cross-origin",
  title: {
    default: "Zacchary Puckeridge",
    template: "%s — Zacchary Puckeridge",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@zpuckeridge",
    creatorId: "zpuckeridge",
    description:
      "Christian IT Administrator working for Rising Sun Pictures. Building better artist experiences by day, Web Developer by night.",
    images: "/avatar-2026.avif",
    site: "@zpuckeridge",
    title: "Zacchary Puckeridge",
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
          "min-h-screen font-sans text-black antialiased selection:bg-blue-400/50 selection:text-blue-600 dark:text-neutral-300 dark:selection:bg-blue-950/50 dark:selection:text-blue-400",
          fontSans.variable,
          fontMono.variable,
          fontRedaction.variable,
          fontRedactionItalic.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem
        >
          <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 h-20 bg-linear-to-t from-white dark:from-background" />

          <Navigation />

          {children}

          <Toaster position="top-center" richColors />

          <AgentationToolbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
