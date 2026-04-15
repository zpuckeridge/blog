import path from "node:path";
import { fileURLToPath } from "node:url";

import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const reactNodeEnv = process.argv.includes("build")
  ? "production"
  : "development";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    /** Build-time sharp optimization; avoids runtime sharp on Workers (adapter suppresses the sharp warning). */
    imageService: "compile",
  }),
  integrations: [react()],
  output: "server",
  session: {
    driver: "memory",
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
        "next-themes",
        "posthog-js",
        "react-icons/lu",
        "react-icons/rx",
        "sonner",
        "tailwind-merge",
        "swr",
        "use-lanyard",
      ],
    },
    /** Let Vite handle react-tweet’s CSS modules during SSR (fixes Unknown file extension ".css"). */
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    ssr: {
      noExternal: ["react-tweet"],
    },
  },
});
