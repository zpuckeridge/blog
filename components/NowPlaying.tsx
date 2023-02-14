import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa";

interface Data {
  isPlaying: boolean;
  songUrl: string;
  albumImageUrl: string;
  album: string;
  title: string;
  artist: string;
}

const NowPlaying: NextPage = () => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/spotify");
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Link
          title="Spotify"
          href={
            data?.isPlaying
              ? data.songUrl
              : "https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03"
          }
          className="relative flex items-center"
        >
          <div>
            {data?.isPlaying ? (
              <Image
                className="w-10 rounded-full"
                src={data?.albumImageUrl}
                width={100}
                height={100}
                alt={data?.album}
              />
            ) : (
              <FaSpotify className="h-5 w-5 -mt-3.5" />
            )}
          </div>

          <div className="transition-all">
            <p className="pl-2 component">
              {data?.isPlaying ? data.title : "Not Playing"}
            </p>
            <p className="pl-2 text-xs">
              {data?.isPlaying ? data.artist : "Spotify"}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NowPlaying;
