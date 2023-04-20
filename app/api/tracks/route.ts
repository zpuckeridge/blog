import { getAccessToken } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  const { access_token } = await getAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=12`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const data = await res.json();

  return NextResponse.json({ data });
}
