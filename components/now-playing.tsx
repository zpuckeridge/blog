"use client";

import { useState, useEffect } from "react";
import { Loader2, PauseCircle, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "./ui/progress";

interface SongData {
  progress: number;
  duration: number;
  title: string;
  album_art: string;
  url: string;
  album: string;
  album_url: string;
  album_artists: string;
}

interface NowPlayingData {
  is_playing: boolean;
  song: SongData;
}

const getNowPlaying = async (): Promise<NowPlayingData | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/now-playing`,
    );
    return res.json();
  } catch (error) {
    console.error("Error fetching now playing data:", error);
    return null;
  }
};

export default function NowPlaying() {
  const [nowPlayingData, setNowPlayingData] = useState<NowPlayingData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      getNowPlaying()
        .then((data) => {
          setNowPlayingData(data);
          setIsLoading(false); // Data is available, no longer loading
        })
        .catch(() => {
          setIsLoading(false); // Failed to fetch data, no longer loading
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-md bg-muted max-w-xs w-full flex justify-center items-center p-2 mx-auto h-16">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  if (!nowPlayingData || !nowPlayingData.song) {
    return (
      <div className="rounded-md bg-muted max-w-xs w-full flex justify-center items-center p-2 mx-auto h-16">
        <p className="text-xs text-muted-foreground">
          Music is not currently playing.
        </p>
      </div>
    );
  }

  const { is_playing, song } = nowPlayingData;
  const {
    progress,
    duration,
    title,
    album_art,
    url,
    album,
    album_url,
    album_artists,
  } = song;

  const minutesProgress = Math.floor(progress / 1000 / 60);
  const secondsProgress = Math.floor((progress / 1000) % 60);
  const minutesDuration = Math.floor(duration / 1000 / 60);
  const secondsDuration = Math.floor((duration / 1000) % 60);

  return (
    <div className="rounded-md bg-muted max-w-xs w-full flex gap-2 p-2 mx-auto">
      <Image
        src={album_art}
        alt={title}
        width={300}
        height={300}
        className="rounded-md w-16 aspect-square"
      />
      <div className="leading-tight my-auto">
        {is_playing ? (
          <h1 className="text-xs text-muted-foreground flex gap-1">
            <PlayCircle className="w-4 h-4 my-auto" /> Currently Playing
          </h1>
        ) : (
          <h1 className="text-xs text-muted-foreground flex gap-1">
            <PauseCircle className="w-4 h-4 my-auto" /> Last Played
          </h1>
        )}

        <Link href={url} className="hover:underline line-clamp-1" title={title}>
          {title}
        </Link>
        <div className="flex gap-1 text-xs text-muted-foreground">
          <Link
            href={album_url}
            className="hover:underline line-clamp-1"
            title={album}
          >
            {album}
          </Link>
          /
          <p
            className="line-clamp-1 hover:underline cursor-default"
            aria-label={album_artists}
            title={album_artists}
          >
            {album_artists}
          </p>
        </div>
        {is_playing && (
          <div className="text-xs text-muted-foreground flex gap-1">
            <p className="flex gap-2 w-full">
              {minutesProgress}:
              {secondsProgress < 10 ? `0${secondsProgress}` : secondsProgress}{" "}
              <Progress
                value={(progress / duration) * 100}
                className="my-auto"
              />
              {minutesDuration}:
              {secondsDuration < 10 ? `0${secondsDuration}` : secondsDuration}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
