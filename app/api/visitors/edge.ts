import { v4 as uuidv4 } from "uuid";

interface ViewerData {
  viewers: number;
}

interface Env {
  ACTIVE_VIEWERS?: DurableObjectNamespace;
}

export const runtime = "edge";

export async function GET(request: Request, { env }: { env: Env }) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const viewerId = searchParams.get("viewerId");

  // Check if we're in development environment
  if (!env.ACTIVE_VIEWERS) {
    // Return mock data for development
    const mockData: ViewerData = { viewers: 1 };

    if (action === "connect" && !viewerId) {
      const newViewerId = uuidv4();
      return new Response(
        JSON.stringify({ ...mockData, viewerId: newViewerId }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify(mockData), {
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Production environment - use Durable Objects
    const id = env.ACTIVE_VIEWERS.idFromName("active-viewers");
    const obj = env.ACTIVE_VIEWERS.get(id);

    // Forward the request to the Durable Object
    const response = await obj.fetch(request);
    const data = (await response.json()) as ViewerData;

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
  } catch (error) {
    console.error("Error handling request:", error);
    return new Response(
      JSON.stringify({ viewers: 0, error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
