import type { Note, Post } from "@/interfaces/content-item";

export interface TimelineContent {
  notes: Note[];
  posts: Post[];
}

/** Load posts and notes independently so one failed source still renders the page. */
export const loadTimelineContent = async (
  loadPosts: () => Promise<readonly Post[]>,
  loadNotes: () => Promise<readonly Note[]>
): Promise<TimelineContent> => {
  const [postsResult, notesResult] = await Promise.allSettled([
    loadPosts(),
    loadNotes(),
  ]);

  if (postsResult.status === "rejected") {
    console.error("Timeline posts unavailable", postsResult.reason);
  }

  if (notesResult.status === "rejected") {
    console.error("Timeline notes unavailable", notesResult.reason);
  }

  return {
    notes: notesResult.status === "fulfilled" ? [...notesResult.value] : [],
    posts: postsResult.status === "fulfilled" ? [...postsResult.value] : [],
  };
};
