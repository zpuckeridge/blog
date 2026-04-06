import type { APIRoute } from "astro";
import { LoopsClient } from "loops";

export const POST: APIRoute = async ({ request }) => {
  const loopsApiKey =
    import.meta.env.LOOPS_API_KEY ?? process.env.LOOPS_API_KEY;
  if (!loopsApiKey) {
    return Response.json(
      { error: "Subscribe is not configured" },
      { status: 503 }
    );
  }

  const loops = new LoopsClient(loopsApiKey);

  try {
    const { email } = await request.json();

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    await loops.createContact(email);

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to subscribe" }, { status: 500 });
  }
};
