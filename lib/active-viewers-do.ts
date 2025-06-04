export class ActiveViewersDO {
  private state: DurableObjectState;
  private viewers: Set<string>;

  constructor(state: DurableObjectState) {
    this.state = state;
    this.viewers = new Set();
  }

  async fetch(request: Request) {
    const url = new URL(request.url);
    const action = url.searchParams.get("action");
    const viewerId = url.searchParams.get("viewerId");

    switch (action) {
      case "connect": {
        if (!viewerId) {
          return new Response("Viewer ID required", { status: 400 });
        }
        this.viewers.add(viewerId);
        return new Response(JSON.stringify({ viewers: this.viewers.size }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      case "disconnect": {
        if (!viewerId) {
          return new Response("Viewer ID required", { status: 400 });
        }
        this.viewers.delete(viewerId);
        return new Response(JSON.stringify({ viewers: this.viewers.size }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      case "count": {
        return new Response(JSON.stringify({ viewers: this.viewers.size }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      default:
        return new Response("Invalid action", { status: 400 });
    }
  }
}
