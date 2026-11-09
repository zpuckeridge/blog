import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { Project } from "@/interfaces/content-item";

import { compareProjects } from "./compare-projects.ts";

const project = (overrides: Partial<Project>): Project => ({
  date_created: new Date("2024-06-01"),
  date_updated: new Date("2024-06-01"),
  description: "",
  id: 1,
  image: "",
  link: "",
  name: "One",
  status: "published",
  tags: [],
  video: "",
  year_completed: 2024,
  ...overrides,
});

describe("compareProjects", () => {
  it("lists work in progress before published and archived", () => {
    const wip = project({ id: 1, name: "WIP", status: "work_in_progress" });
    const live = project({ id: 2, name: "Live", status: "published" });
    const archived = project({ id: 3, name: "Old", status: "archived" });

    assert.ok(compareProjects(wip, live) < 0);
    assert.ok(compareProjects(live, archived) < 0);
    assert.ok(compareProjects(archived, wip) > 0);
  });

  it("orders by year_completed descending within the same status", () => {
    const newer = project({
      id: 1,
      name: "Newer",
      status: "published",
      year_completed: 2025,
    });
    const older = project({
      id: 2,
      name: "Older",
      status: "published",
      year_completed: 2020,
    });

    assert.ok(compareProjects(newer, older) < 0);
    assert.ok(compareProjects(older, newer) > 0);
  });
});
