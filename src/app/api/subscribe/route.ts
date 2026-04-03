import { LoopsClient } from "loops";

export const POST = async (req: Request) => {
  const loopsApiKey = process.env.LOOPS_API_KEY;
  if (!loopsApiKey) {
    return Response.json(
      { error: "Subscribe is not configured" },
      { status: 503 }
    );
  }

  const loops = new LoopsClient(loopsApiKey);

  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    await loops.createContact(email);

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to subscribe" }, { status: 500 });
  }
};
