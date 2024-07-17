import { getAccessToken } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    const res = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Unauthorized access. Please check your access token.");
      } else {
        throw new Error("Error fetching top artists. Status:" + res.status);
      }
    }

    const data = await res.json();

    return NextResponse.json({ data: data });
  } catch (error) {
    console.error("Error fetching top tracks data:", error);
    throw error;
  }
}
