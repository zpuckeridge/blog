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

export default async function MusicTracking() {
  let responseData;
  try {
    responseData = await fetchTopTracks();
  } catch (error) {
    console.error(error);
    return <p>Failed to load top tracks</p>;
  }

  const getTopTracks = responseData?.data;

  if (!getTopTracks || !getTopTracks.items) {
    return <p>No top tracks available</p>;
  }

  const Track = ({ track, index }: { track: any; index: number }) => (
    <div key={index} className="py-1 px-2">
      <div className="flex gap-4">
        <div className="text-muted-foreground my-auto whitespace-nowrap w-2">
          {index + 1}
        </div>
        <Image
          src={track.album.images[0].url}
          alt={track.name}
          width={300}
          height={300}
          className="w-10 h-10"
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

  return (
    <div className="flex flex-col w-full gap-2">
      <p className="text-muted-foreground text-sm pt-4">
        Most listened to tracks
      </p>
      <div>
      {getTopTracks.items.map((track: any, index: number) => (
        <Track key={index} track={track} index={index} />
      ))}
      </div>
    </div>
  );
}
