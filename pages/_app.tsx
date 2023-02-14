import Layout from "../components/Layout";
import TransitionEffect from "../components/TransitionEffect";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Inter } from "@next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <ThemeProvider attribute="class">
        <Layout>
          <TransitionEffect>
            <Component {...pageProps} />
            <Analytics />
          </TransitionEffect>
        </Layout>
      </ThemeProvider>
    </main>
  );
}

export default MyApp;
