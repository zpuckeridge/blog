const YOUTUBE_ID = /^[\w-]{11}$/u;

export const youtubeEmbedUrl = (videoId: string): string | null => {
  if (!YOUTUBE_ID.test(videoId)) {
    return null;
  }
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
};
