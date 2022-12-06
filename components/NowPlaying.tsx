import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { FaSpotify } from "react-icons/fa";

export default function NowPlaying() {
  const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());
  const { data } = useSWR("/api/spotify", fetcher);
  return (
    <>
      <div>
        <Link
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
              <FaSpotify size={28} />
            )}
          </div>

          <div className="transition-all ">
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
}
