import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { Note, Post } from "@/interfaces/content-item";

import { loadTimelineContent } from "./timeline-content.ts";

const post = { slug: "hello", title: "Hello" } as Post;
const note = { content: "A note", id: 1 } as Note;

const withoutErrorLog = async (run: () => Promise<void>): Promise<void> => {
  const originalError = console.error;
  console.error = () => {};
  try {
    await run();
  } finally {
    console.error = originalError;
  }
};

describe("loadTimelineContent", () => {
  it("returns both sources when they succeed", async () => {
    const content = await loadTimelineContent(
      () => Promise.resolve([post]),
      () => Promise.resolve([note])
    );

    assert.deepEqual(content.posts, [post]);
    assert.deepEqual(content.notes, [note]);
  });

  it("renders notes when posts fail", async () => {
    await withoutErrorLog(async () => {
      const content = await loadTimelineContent(
        () => Promise.reject(new Error("posts failed")),
        () => Promise.resolve([note])
      );

      assert.deepEqual(content.posts, []);
      assert.deepEqual(content.notes, [note]);
    });
  });

  it("renders posts when notes fail", async () => {
    await withoutErrorLog(async () => {
      const content = await loadTimelineContent(
        () => Promise.resolve([post]),
        () => Promise.reject(new Error("notes failed"))
      );

      assert.deepEqual(content.posts, [post]);
      assert.deepEqual(content.notes, []);
    });
  });
});
