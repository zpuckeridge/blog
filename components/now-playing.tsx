import { getAccessToken } from "@/lib/spotify";
import { PauseCircle, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const runtime = "edge";

export const revalidate = 10;

export async function getNowPlaying() {
  try {
    const { access_token } = await getAccessToken();

    const res = await fetch(
      `https://api.spotify.com/v1/me/player/currently-playing`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    if (!res.ok) {
      if (res.status === 401) {
        console.error("Unauthorized access. Please check your access token.");
      } else {
        console.error("Error fetching now playing data. Status:", res.status);
      }

      return {
        is_playing: false,
      };
    }

    const data = await res.text();
    if (!data) {
      return {
        is_playing: false,
      };
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {
        is_playing: false,
      };
    }
  } catch (error) {
    console.error("Error fetching now playing data:", error);
    return {
      is_playing: false,
    };
  }
}

export async function getLastPlayed() {
  try {
    const { access_token } = await getAccessToken();

    const res = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?before=${Date.now()}&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    if (!res.ok) {
      if (res.status === 401) {
        console.error("Unauthorized access. Please check your access token.");
      } else {
        console.error("Error fetching last played data. Status:", res.status);
      }

      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching last played data:", error);
    return null;
  }
}

export default async function NowPlaying() {
  const playing = await getNowPlaying();
  const lastPlayed = await getLastPlayed();

  if (!playing || playing.is_playing === false) {
    return (
      <main className="rounded-md bg-muted max-w-xs w-full flex gap-4 p-2 mx-auto">
        <Image
          src={lastPlayed.items[0].track.album.images[0].url}
          alt={lastPlayed.items[0].track.name}
          width={300}
          height={300}
          className="rounded-md w-14 h-14"
        />
        <div>
          <h1 className="text-xs text-muted-foreground flex gap-1">
            <PauseCircle className="w-4 h-4 my-auto" />
            Recently played
          </h1>
          <Link
            href={lastPlayed.items[0].track.external_urls.spotify}
            className="hover:underline line-clamp-1"
            aria-label={lastPlayed.items[0].track.name}
          >
            {lastPlayed.items[0].track.name}
          </Link>
          <div className="flex gap-1 text-xs text-muted-foreground">
            <Link
              href={lastPlayed.items[0].track.album.external_urls.spotify}
              className="hover:underline line-clamp-1"
              aria-label={lastPlayed.items[0].track.album.name}
            >
              {lastPlayed.items[0].track.album.name}
            </Link>
            /
            <Link
              href={lastPlayed.items[0].track.artists[0].external_urls.spotify}
              className="hover:underline line-clamp-1"
              aria-label={lastPlayed.items[0].track.artists[0].name}
            >
              {lastPlayed.items[0].track.artists[0].name}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="rounded-md bg-muted max-w-xs w-full flex gap-4 p-2 mx-auto">
      <Image
        src={playing.item.album.images[0].url}
        alt={playing.item.name}
        width={300}
        height={300}
        className="rounded-md w-14 h-14"
      />
      <div>
        <h1 className="text-xs text-muted-foreground flex gap-1">
          <PlayCircle className="w-4 h-4 my-auto" /> Currently playing
        </h1>
        <Link
          href={playing.item.external_urls.spotify}
          className="hover:underline line-clamp-1"
          aria-label={playing.item.name}
        >
          {playing.item.name}
        </Link>
        <div className="flex gap-1 text-xs text-muted-foreground">
          <Link
            href={playing.item.album.external_urls.spotify}
            className="hover:underline line-clamp-1"
            aria-label={playing.item.album.name}
          >
            {playing.item.album.name}
          </Link>
          /
          <Link
            href={playing.item.album.artists[0].external_urls.spotify}
            className="hover:underline line-clamp-1"
            aria-label={playing.item.album.artists[0].name}
          >
            {playing.item.album.artists[0].name}
          </Link>
        </div>
      </div>
    </main>
  );
}
