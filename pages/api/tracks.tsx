import { getTopTracks } from "../../lib/spotify";

const getTopTracksHandler = async (_: any, res: any) => {
  const response = await getTopTracks();
  const { items } = await response.json();

  const tracks = items.slice(0, 10).map((track: any) => ({
    title: track.name,
    image: track.album.images[0].url,
    artist: track.artists.map((_artist: any) => _artist.name).join(", "),
    url: track.external_urls.spotify,
  }));

  return res.status(200).json({ tracks });
};

export default getTopTracksHandler;
