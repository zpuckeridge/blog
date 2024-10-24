import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${process.env.PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({ email }),
      },
    );

    if (response.ok) {
      return NextResponse.json(
        { message: "Successfully subscribed!" },
        { status: 200 },
      );
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: "Failed to subscribe", error: errorData },
        { status: response.status },
      );
    }
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
