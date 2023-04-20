import { getAccessToken } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  const { access_token } = await getAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/me/player/currently-playing`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (res.status === 204) {
    return NextResponse.json({ data: { is_playing: false } });
  }

  const data = await res.json();

  return NextResponse.json({ data });
}
