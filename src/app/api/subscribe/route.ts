import { LoopsClient } from "loops";

const loopsApiKey = process.env.LOOPS_API_KEY;

if (!loopsApiKey) {
  throw new Error("LOOPS_API_KEY environment variable is required");
}

const loops = new LoopsClient(loopsApiKey);

export const POST = async (req: Request) => {
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
