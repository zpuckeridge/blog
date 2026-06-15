export const env = {
  GITHUB_TOKEN: import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN,
  VIDEO_PASSWORD: import.meta.env.VIDEO_PASSWORD ?? process.env.VIDEO_PASSWORD,
};
