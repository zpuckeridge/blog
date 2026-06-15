import path from "node:path";

import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { defineConfig, sessionDrivers } from "astro/config";

const __dirname = import.meta.dirname;
const reactNodeEnv = process.argv.includes("build")
  ? "production"
  : "development";
const isDevCommand = process.argv.includes("dev");

// https://astro.build/config
export default defineConfig({
  // Adapter omitted during `astro dev` for fast startup (Cloudflare Vite plugin hangs under Bun).
  // Production builds still use @astrojs/cloudflare — the "no adapter" warning in dev is expected.
  adapter: isDevCommand
    ? undefined
    : cloudflare({
        /** Build-time sharp optimization; avoids runtime sharp on Workers (adapter suppresses the sharp warning). */
        imageService: "compile",
      }),
  integrations: [react()],
  output: "server",
  session: {
    driver: sessionDrivers.lruCache(),
  },
  site: "https://zacchary.me",
  vite: {
    define: {
      /** Keep React's jsx-dev-runtime in development mode during `astro dev`. */
      "process.env.NODE_ENV": JSON.stringify(reactNodeEnv),
    },
    optimizeDeps: {
      include: [
        "@base-ui/react/switch",
        "@base-ui/react/tooltip",
        "clsx",
        "date-fns",
        "posthog-js",
        "react-icons/lu",
        "react-icons/rx",
        "sonner",
        "tailwind-merge",
        "swr",
      ],
    },
    /** Let Vite handle react-tweet’s CSS modules during SSR (fixes Unknown file extension ".css"). */
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        ...(isDevCommand
          ? {
              "cloudflare:workers": path.resolve(
                __dirname,
                "./src/lib/cloudflare-workers-dev.ts"
              ),
            }
          : {}),
      },
    },
    ssr: {
      noExternal: ["react-tweet"],
    },
  },
});
