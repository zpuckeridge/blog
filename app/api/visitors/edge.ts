import { v4 as uuidv4 } from "uuid";

// Get the Durable Object namespace from the environment
declare const ACTIVE_VIEWERS: DurableObjectNamespace;

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const viewerId = searchParams.get("viewerId");

  // Get the Durable Object ID for the active viewers
  const id = ACTIVE_VIEWERS.idFromName("active-viewers");
  const obj = ACTIVE_VIEWERS.get(id);

  // Forward the request to the Durable Object
  const response = await obj.fetch(request);
  const data = await response.json();

  if (action === "connect" && !viewerId) {
    // Generate a new viewer ID if one wasn't provided
    const newViewerId = uuidv4();
    return new Response(JSON.stringify({ ...data, viewerId: newViewerId }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
