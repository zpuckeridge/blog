import { defineConfig } from "oxlint";
import astro from "ultracite/oxlint/astro";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";

export default defineConfig({
  extends: [core, react, astro],
  overrides: [
    {
      files: ["**/*.astro"],
      rules: {
        // Astro frontmatter allows `return Astro.redirect(...)` outside a function body.
        "unicorn/prefer-module": "off",
      },
    },
  ],
});
