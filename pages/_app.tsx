import Layout from "../components/Layout";
import TransitionEffect from "../components/TransitionEffect";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}>
      <main className={inter.className}>
        <Layout>
          <TransitionEffect>
            <Component {...pageProps} />
            <Analytics />
          </TransitionEffect>
        </Layout>
      </main>
    </SessionContextProvider>
  );
}

export default MyApp;
