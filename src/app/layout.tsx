import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/src/components/theme-provider";
import { Toaster } from "@/src/components/ui/sonner";
import { cn } from "@/src/lib/utils";
import "@/src/app/globals.css";
import Script from "next/script";
import Navigation from "@/src/components/navigation";

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
	metadataBase: new URL("https://zacchary.me"),
	alternates: {
		types: {
			"application/rss+xml": "https://zacchary.me/rss.xml",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
				<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange enableSystem>
					<div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 h-20 bg-linear-to-t from-white dark:from-background" />

					<Navigation />

					{children}

					<Toaster position="top-center" richColors />
				</ThemeProvider>
			</body>

			<Script
				async
				data-session-replay="true"
				data-site-id="1"
				data-track-errors="true"
				data-web-vitals="true"
				src="https://rybbit-backend.obambulo.studio/api/script.js"
			/>
		</html>
	);
}
