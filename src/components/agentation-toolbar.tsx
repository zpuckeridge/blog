"use client";

import { Agentation } from "agentation";

/**
 * Visual annotation toolbar for local development ([agentation.com](https://agentation.com)).
 * Syncs with the MCP server when `bun run agentation-mcp` is running (default port 4747).
 */
export const AgentationToolbar = () => {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const endpoint =
    process.env.NEXT_PUBLIC_AGENTATION_ENDPOINT ?? "http://localhost:4747";

  return <Agentation className="z-[200]" endpoint={endpoint} />;
};
