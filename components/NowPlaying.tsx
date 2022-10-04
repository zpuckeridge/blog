import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

export default function NowPlaying() {
  const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());
  const { data } = useSWR("/api/spotify", fetcher);
  return (
    <>
      <div className="flex justify-center w-full">
        <a
          href={
            data?.isPlaying
              ? data.songUrl
              : "https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03"
          }
          className="relative flex items-center"
        >
          <div>
            {data?.isPlaying ? (
              <img
                className="w-20 pr-4"
                src={data?.albumImageUrl}
                alt={data?.album}
              />
            ) : (
              <div className="hidden">Nothing Playing</div>
            )}
          </div>

          <div>
            <p className="component">
              {data?.isPlaying ? data.title : "Not Listening"}
            </p>
            <p className="text-xs font-dark">
              {data?.isPlaying ? data.artist : "Spotify"}
            </p>
          </div>
        </a>
      </div>
    </>
  );
}
