import { ActiveViewersDO } from "./lib/active-viewers-do";

export { ActiveViewersDO };

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext) {
    // This is the main worker entrypoint
    // It will be automatically used by OpenNext
    return new Response("Not found", { status: 404 });
  },
};
