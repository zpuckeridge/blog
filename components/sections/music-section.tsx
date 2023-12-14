import { getAccessToken } from "@/lib/spotify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";

async function getCurrentTopTracks() {
  try {
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
    console.error("Error fetching top tracks data:", error);
    return null;
  }
}

async function getRecentTopTracks() {
  try {
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
    console.error("Error fetching top tracks data:", error);
    return null;
  }
}

async function getAllTimeTopTracks() {
  try {
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
    console.error("Error fetching top tracks data:", error);
    return null;
  }
}

export default async function MusicTracking() {
  let currentTopTracks, recentTopTracks, allTimeTopTracks;

  try {
    currentTopTracks = await getCurrentTopTracks();
    recentTopTracks = await getRecentTopTracks();
    allTimeTopTracks = await getAllTimeTopTracks();
  } catch (error) {
    console.error("Error fetching top tracks data:", error);
    return (
      <div>Oops! Something went wrong while fetching top tracks data.</div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="flex flex-col">
        {currentTopTracks.items.map((track: any, index: number) => (
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
        {recentTopTracks.items.map((track: any, index: number) => (
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
        {allTimeTopTracks.items.map((track: any, index: number) => (
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
