import Layout from "../components/Layout";
import TransitionEffect from "../components/TransitionEffect";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <TransitionEffect>
          <Component {...pageProps} />
        </TransitionEffect>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
