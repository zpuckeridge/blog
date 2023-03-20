import { getNowPlaying } from "../../lib/spotify";

export default async (_: any, res: any) => {
  const response = await getNowPlaying();
  const data = await response.json();

  return res.status(200).json(data);
};
