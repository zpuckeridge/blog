import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { UseItem } from "@/interfaces/content-item";

import { buildUsesSections } from "./uses-sections";

const createUseItem = (
  overrides: Partial<UseItem> & Pick<UseItem, "category" | "title">
): UseItem => ({
  category_sort: 1,
  date_created: new Date("2026-01-01"),
  date_updated: new Date("2026-01-01"),
  description: "Example",
  id: 1,
  sort: 1,
  status: "published",
  ...overrides,
});

describe("buildUsesSections", () => {
  it("groups and orders items by category and sort", () => {
    const sections = buildUsesSections([
      createUseItem({
        category: "tools",
        category_sort: 2,
        id: 1,
        sort: 2,
        title: "Beta",
      }),
      createUseItem({
        category: "office",
        category_sort: 1,
        id: 2,
        sort: 2,
        title: "Desk",
      }),
      createUseItem({
        category: "tools",
        category_sort: 2,
        id: 3,
        sort: 1,
        title: "Alpha",
      }),
      createUseItem({
        category: "office",
        category_sort: 1,
        id: 4,
        sort: 1,
        title: "Chair",
      }),
    ]);

    assert.deepEqual(
      sections.map((section) => section.label),
      ["Office", "Tools"]
    );
    assert.deepEqual(
      sections[0]?.items.map((item) => item.title),
      ["Chair", "Desk"]
    );
    assert.deepEqual(
      sections[1]?.items.map((item) => item.title),
      ["Alpha", "Beta"]
    );
  });

  it("shows Comms as its own section", () => {
    const sections = buildUsesSections([
      createUseItem({
        category: "communication",
        category_sort: 4,
        id: 1,
        sort: 1,
        title: "Discord",
      }),
      createUseItem({
        category: "tools",
        category_sort: 3,
        id: 2,
        sort: 1,
        title: "Firefox",
      }),
    ]);

    assert.deepEqual(
      sections.map((section) => section.label),
      ["Tools", "Comms"]
    );
  });

  it("merges programming into the Tools section", () => {
    const sections = buildUsesSections([
      createUseItem({
        category: "programming",
        category_sort: 2,
        id: 1,
        sort: 1,
        title: "Cursor",
      }),
      createUseItem({
        category: "tools",
        category_sort: 3,
        id: 2,
        sort: 1,
        title: "Firefox",
      }),
    ]);

    assert.deepEqual(
      sections.map((section) => section.label),
      ["Tools"]
    );
    assert.deepEqual(
      sections[0]?.items.map((item) => item.title),
      ["Cursor", "Firefox"]
    );
  });
});
