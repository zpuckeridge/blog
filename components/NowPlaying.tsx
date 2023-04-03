import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { FaSpotify } from "react-icons/fa";

export default function NowPlaying() {
  const [data, setData] = useState<any | null>(null);

  const fetchData = useCallback(async () => {
    const response = await fetch("/api/playing");
    const data = await response.json();

    setData(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!data) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex">
        <div className="mt-2">
          {data.is_playing ? (
            <Image
              className="rounded-full"
              src={data.item.album.images[0].url}
              width={25}
              height={25}
              alt={data.album}
            />
          ) : (
            <FaSpotify className="h-5 w-5" />
          )}
        </div>

        <div className="transition-all">
          <p className="ml-2">
            {data.is_playing ? data.item.name : "Not Playing"}
          </p>
          <p className="-mt-1 ml-2 text-xs">
            {data.is_playing
              ? data.item.artists.map((_artist: any) => _artist.name).join(", ")
              : "Spotify"}
          </p>
        </div>
      </div>
    </>
  );
}
