import { getAccessToken } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { access_token } = await getAccessToken();
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized access. Please check your access token.");
      } else {
        console.error(
          "Error fetching now playing data. Status:",
          response.status,
        );
      }
      return NextResponse.json({ is_playing: false });
    }

    const data = await response.json();

    if (!data) {
      return NextResponse.json({ is_playing: false });
    }

    return NextResponse.json({
      is_playing: data.is_playing,
      song: {
        url: data.item.external_urls.spotify,
        title: data.item.name,
        artist: data.item.artists.map((artist: any) => artist.name).join(", "),
        album: data.item.album.name,
        album_art: data.item.album.images[0].url,
        album_artists: data.item.album.artists
          .map((artist: any) => artist.name)
          .join(", "),
        album_url: data.item.album.external_urls.spotify,
        progress: data.progress_ms,
        duration: data.item.duration_ms,
      },
    });
  } catch (error) {
    console.error("Error fetching now playing data:", error);
    return NextResponse.json({ is_playing: false });
  }
}
