import Image from "next/image";

// Fetch data with a full URL
const fetchTopTracks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/spotify/top-tracks`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch top tracks");
  }
  return response.json();
};

const fetchTopArtists = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/spotify/top-artists`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch top artists");
  }
  return response.json();
};

export default async function MusicTracking() {
  let tracksResponseData, artistsResponseData;
  try {
    tracksResponseData = await fetchTopTracks();
    artistsResponseData = await fetchTopArtists();
  } catch (error) {
    console.error(error);
    return <p>Failed to load top tracks and artists</p>;
  }

  const getTopTracks = tracksResponseData?.data;
  const getTopArtists = artistsResponseData?.data;

  if (!getTopTracks || !getTopTracks.items) {
    return <p>No top tracks available</p>;
  }

  if (!getTopArtists || !getTopArtists.items) {
    return <p>No top artists available</p>;
  }

  const Track = ({ track, index }: { track: any; index: number }) => (
    <div key={index} className="py-1 px-2 text-sm">
      <div className="flex gap-2">
        <Image
          src={track.album.images[0].url}
          alt={track.name}
          width={300}
          height={300}
          className="w-10 h-10 rounded"
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
          </div>
        </div>
      </div>
    </div>
  );

  const capitalizeWords = (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const Artist = ({ artist, index }: { artist: any; index: number }) => (
    <div key={index} className="py-1 px-2 text-sm">
      <div className="flex gap-2">
        <Image
          src={artist.images[0]?.url || "/default_image_path.png"} // Fallback in case of missing image
          alt={artist.name}
          width={300}
          height={300}
          className="w-10 h-10 rounded"
        />
        <div className="my-auto">
          <a
            href={artist.external_urls.spotify}
            className="hover:underline line-clamp-1"
            aria-label={artist.name}
          >
            {artist.name}
          </a>
          <div className="flex gap-1 text-xs text-muted-foreground">
            {artist.genres && artist.genres.length > 0 ? (
              <span>{capitalizeWords(artist.genres[0])}</span>
            ) : (
              <span>Unknown</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full gap-20 text-sm">
      <div className="space-y-4">
        <div className="bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6">
          <div className="flex flex-col w-full gap-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
              {getTopTracks.items.map((track: any, index: number) => (
                <Track key={index} track={track} index={index} />
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-muted-foreground text-xs ">
          Most listened to tracks
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6">
          <div className="flex flex-col w-full gap-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
              {getTopArtists.items.map((artist: any, index: number) => (
                <Artist key={index} artist={artist} index={index} />
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-muted-foreground text-xs ">
          Most listened to artists
        </p>
      </div>
    </div>
  );
}
