import { getAccessToken } from "@/lib/spotify";
import Image from "next/image";

export const runtime = "edge";

async function getTopTracks(time_range: string) {
  try {
    const { access_token } = await getAccessToken();

    const res = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=5`,
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
        throw new Error(
          "Error fetching last played data. Status:" + res.status,
        );
      }
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching top tracks data:", error);
    throw error;
  }
}

const Track = ({ track, index }: { track: any; index: number }) => (
  <div
    key={index}
    className="hover:bg-muted py-1 px-2 transition-all duration-200"
  >
    <div className="flex gap-4">
      <div className="text-muted-foreground my-auto whitespace-nowrap w-2">
        {index + 1}
      </div>
      <Image
        src={track.album.images[0].url}
        alt={track.name}
        width={300}
        height={300}
        className=" w-10 h-10"
      />
      <div className="my-auto">
        <a
          href={track.external_urls.spotify}
          className="hover:underline line-clamp-1"
          aria-label={track.name}
        >
          {track.name}
        </a>{" "}
        <div className="flex gap-1 text-xs text-muted-foreground">
          <a
            href={track.album.external_urls.spotify}
            className="hover:underline line-clamp-1"
            aria-label={track.album.name}
          >
            {track.album.name}
          </a>
          /
          <a
            href={track.artists[0].external_urls.spotify}
            className="hover:underline line-clamp-1"
            aria-label={track.artists[0].name}
          >
            {track.artists[0].name}
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default async function MusicTracking() {
  let currentTopTracks, recentTopTracks, allTimeTopTracks;

  try {
    currentTopTracks = await getTopTracks("short_term");
    recentTopTracks = await getTopTracks("medium_term");
    allTimeTopTracks = await getTopTracks("long_term");
  } catch (error) {
    console.error("Error fetching top tracks data:", error);
    return (
      <div>Oops! Something went wrong while fetching top tracks data.</div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="flex flex-col">
        {currentTopTracks?.items?.map((track: any, index: number) => (
          <Track key={index} track={track} index={index} />
        ))}
        <p className="text-muted-foreground text-sm text-center py-2 font-mono">
          Top tracks from this week
        </p>
      </div>

      <div className="flex flex-col">
        {recentTopTracks?.items?.map((track: any, index: number) => (
          <Track key={index} track={track} index={index} />
        ))}
        <p className="text-muted-foreground text-sm text-center py-2 font-mono">
          Top tracks from last month
        </p>
      </div>

      <div className="flex flex-col">
        {allTimeTopTracks?.items?.map((track: any, index: number) => (
          <Track key={index} track={track} index={index} />
        ))}
        <p className="text-muted-foreground text-sm text-center py-2 font-mono">
          Top tracks of all time
        </p>
      </div>
    </div>
  );
}
