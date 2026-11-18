import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  ACTIVITY_DISPLAY_DAYS,
  buildRecentHeatmapDays,
  summarizeHeatmap,
} from "@/lib/calendar-heatmap";

describe("summarizeHeatmap", () => {
  it("returns a 30-day strip and averages logged days", () => {
    const values = new Map<string, { hasData: boolean; value: number }>([
      ["2026-11-16", { hasData: true, value: 120 }],
      ["2026-11-17", { hasData: true, value: 60 }],
    ]);

    const days = buildRecentHeatmapDays(
      values,
      ACTIVITY_DISPLAY_DAYS,
      "2026-11-17"
    );
    const summary = summarizeHeatmap(days, "at work");

    assert.equal(summary.days.length, ACTIVITY_DISPLAY_DAYS);
    assert.equal(summary.loggedDays, 2);
    assert.equal(summary.yearTotalMinutes, 180);
    assert.equal(summary.averageMinutes, 90);
  });
});
