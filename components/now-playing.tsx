import { getAccessToken } from "@/lib/spotify";
import { PauseCircle, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const runtime = "edge";

export const revalidate = 10;

export async function getNowPlaying() {
  const { access_token } = await getAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/me/player/currently-playing`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  const data = await res.json();

  if (!data) {
    return {
      is_playing: false,
    };
  }

  if (data.currently_playing_type === "episode") {
    return {
      is_playing: false,
    };
  }

  return data;
}

export async function getLastPlayed() {
  const { access_token } = await getAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played?before=${Date.now()}&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  const data = await res.json();

  return data;
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
            className="hover:underline truncate"
          >
            {lastPlayed.items[0].track.name}
          </Link>
          <div className="flex gap-1 text-xs text-muted-foreground">
            <Link
              href={lastPlayed.items[0].track.album.external_urls.spotify}
              className="hover:underline truncate"
            >
              {lastPlayed.items[0].track.album.name}
            </Link>
            /
            <Link
              href={lastPlayed.items[0].track.artists[0].external_urls.spotify}
              className="hover:underline truncate"
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
          className="hover:underline truncate"
        >
          {playing.item.name}
        </Link>
        <div className="flex gap-1 text-xs text-muted-foreground">
          <Link
            href={playing.item.album.external_urls.spotify}
            className="hover:underline truncate"
          >
            {playing.item.album.name}
          </Link>
          /
          <Link
            href={playing.item.album.artists[0].external_urls.spotify}
            className="hover:underline truncate"
          >
            {playing.item.album.artists[0].name}
          </Link>
        </div>
      </div>
    </main>
  );
}
