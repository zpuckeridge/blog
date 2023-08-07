import { getAccessToken } from "@/lib/spotify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

async function getCurrentTopTracks() {
  try {
    const { access_token } = await getAccessToken();

    const res = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10`,
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
      `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10`,
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
      `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10`,
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

export default async function Statistics() {
  const currentTopTracks = await getCurrentTopTracks();
  const recentTopTracks = await getRecentTopTracks();
  const allTimeTopTracks = await getAllTimeTopTracks();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Top Tracks</h2>
      <Tabs defaultValue="current" className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="all-time">All-Time</TabsTrigger>
        </TabsList>
        <TabsContent value="current">
          <div className="grid grid-cols-1 gap-4 bg-muted p-4 rounded-md">
            {currentTopTracks.items.map((track: any, index: number) => (
              <div key={index}>
                <div className="flex gap-4">
                  <div className="text-muted-foreground my-auto">
                    {index + 1}
                  </div>
                  <Image
                    src={track.album.images[0].url}
                    alt={track.name}
                    width={300}
                    height={300}
                    className="rounded-md w-14 h-14"
                  />
                  <div>
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
          </div>
        </TabsContent>
        <TabsContent value="recent">
          <div className="grid grid-cols-1 gap-4 bg-muted p-4 rounded-md">
            {recentTopTracks.items.map((track: any, index: number) => (
              <div key={index}>
                <div className="flex gap-4">
                  <div className="text-muted-foreground my-auto">
                    {index + 1}
                  </div>
                  <Image
                    src={track.album.images[0].url}
                    alt={track.name}
                    width={300}
                    height={300}
                    className="rounded-md w-14 h-14"
                  />
                  <div>
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
          </div>
        </TabsContent>
        <TabsContent value="all-time">
          <div className="grid grid-cols-1 gap-4 bg-muted p-4 rounded-md">
            {allTimeTopTracks.items.map((track: any, index: number) => (
              <div key={index}>
                <div className="flex gap-4">
                  <div className="text-muted-foreground my-auto">
                    {index + 1}
                  </div>
                  <Image
                    src={track.album.images[0].url}
                    alt={track.name}
                    width={300}
                    height={300}
                    className="rounded-md w-14 h-14"
                  />
                  <div>
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
