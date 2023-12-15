import { getAccessToken } from "@/lib/spotify";
import Image from "next/image";

async function getCurrentTopTracks() {
  const { access_token } = await getAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Error fetching current top tracks");
  }

  const data = await res.json();

  return data;
}

async function getRecentTopTracks() {
  const { access_token } = await getAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Error fetching recent top tracks");
  }

  const data = await res.json();

  return data;
}

async function getAllTimeTopTracks() {
  const { access_token } = await getAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Error fetching all time top tracks");
  }

  const data = await res.json();

  return data;
}

export default async function MusicTracking() {
  let currentTopTracks, recentTopTracks, allTimeTopTracks;

  try {
    currentTopTracks = await getCurrentTopTracks();
  } catch (error) {
    console.error(error);
  }

  try {
    recentTopTracks = await getRecentTopTracks();
  } catch (error) {
    console.error(error);
  }

  try {
    allTimeTopTracks = await getAllTimeTopTracks();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="flex flex-col">
        {currentTopTracks &&
          currentTopTracks.items &&
          currentTopTracks.items.map((track: any, index: number) => (
            <div
              key={index}
              className="hover:bg-muted py-1 px-2 transition-all duration-200 "
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
          ))}
        <p className="text-muted-foreground text-sm text-center py-2 font-mono">
          Top tracks from this week
        </p>
      </div>

      <div className="flex flex-col">
        {recentTopTracks &&
          recentTopTracks.items &&
          recentTopTracks.items.map((track: any, index: number) => (
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
          ))}
        <p className="text-muted-foreground text-sm text-center py-2 font-mono">
          Top tracks from last month
        </p>
      </div>

      <div className="flex flex-col">
        {allTimeTopTracks &&
          allTimeTopTracks.items &&
          allTimeTopTracks.items.map((track: any, index: number) => (
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
          ))}
        <p className="text-muted-foreground text-sm text-center py-2 font-mono">
          Top tracks of all time
        </p>
      </div>
    </div>
  );
}
