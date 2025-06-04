let activeViewers = 0;

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (request.headers.get("upgrade") !== "websocket") {
    return new Response("Expected WebSocket", { status: 400 });
  }

  const { 0: client, 1: server } = new WebSocketPair();
  server.accept();
  activeViewers++;

  server.send(JSON.stringify({ type: "viewerCount", count: activeViewers }));

  server.addEventListener("close", () => {
    activeViewers = Math.max(0, activeViewers - 1);
  });

  return new Response(null, { status: 101, webSocket: client });
}
