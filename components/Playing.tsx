import Image from "next/image";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { MusicIcon } from "lucide-react";

async function retrieveTracks() {
  const response = await fetch(`${process.env.PAGE_URL}/api/tracks`);
  const tracks = await response.json();

  return tracks.data;
}

async function retrievePlaying() {
  const response = await fetch(`${process.env.PAGE_URL}/api/playing`);
  const playing = await response.json();

  return playing.data;
}

export default async function Playing() {
  const track = await retrieveTracks();
  const playing = await retrievePlaying();

  return (
    <>
      <div className="bg-black shadow-lg dark:shadow-none dark:bg-white w-full p-4 rounded-lg text-white dark:text-black">
        <p className="text-center">These days I{"'"}m listening to 🎧</p>
        <div className="mt-4 grid grid-cols-4 gap-1">
          {track.items.map((song: any) => (
            <div key={song}>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="hover:text-[#888888] flex">
                      <Link href={song.external_urls.spotify}>
                        <Image
                          src={song.album.images[0].url}
                          alt={song.name}
                          width={200}
                          height={200}
                          className="rounded-xl shadow-2xl"
                          priority={true}
                        />
                      </Link>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">{song.name}</p>
                    <p className="text-[#888888]">{song.artists[0].name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          <div className="mt-2">
            {playing.is_playing ? (
              <Image
                className="rounded-full"
                src={playing.item.album.images[0].url}
                width={25}
                height={25}
                alt={playing.album}
              />
            ) : (
              <MusicIcon className="h-5 w-5" />
            )}
          </div>

          <div className="transition-all">
            <p className="ml-2">
              {playing.is_playing ? playing.item.name : "Not Playing"}
            </p>
            <p className="-mt-1 ml-2 text-xs">
              {playing.is_playing
                ? playing.item.artists
                    .map((_artist: any) => _artist.name)
                    .join(", ")
                : "Spotify"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
