import { getNowPlaying } from "../../lib/spotify";

const getNowPlayingHandler = async (_: any, res: any) => {
  const response = await getNowPlaying();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.text();

  return res.status(200).json(data ? JSON.parse(data) : {});
};

export default getNowPlayingHandler;
