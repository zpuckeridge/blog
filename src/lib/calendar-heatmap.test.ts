import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  ACTIVITY_DISPLAY_DAYS,
  buildRecentHeatmapDays,
  formatHeatmapDelta,
  heatmapTotalDeltaMinutes,
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
    assert.equal(summary.deltaMinutes, null);
  });

  it("compares the visible total with the 30 days before", () => {
    const today = "2026-11-17";
    const history = buildRecentHeatmapDays(new Map(), 60, today);
    const values = new Map(
      history.map((day, index) => [
        day.date,
        { hasData: true, value: index < 30 ? 60 : 90 },
      ])
    );
    const days = buildRecentHeatmapDays(values, 60, today);

    assert.equal(heatmapTotalDeltaMinutes(days), 900);
    const summary = summarizeHeatmap(days, "at work");
    assert.equal(summary.days.length, ACTIVITY_DISPLAY_DAYS);
    assert.equal(summary.yearTotalMinutes, 2700);
    assert.equal(summary.deltaMinutes, 900);
    assert.equal(formatHeatmapDelta(900), "Δ +15 hours");
    assert.equal(formatHeatmapDelta(-90), "Δ −1 hour 30 minutes");
    assert.equal(formatHeatmapDelta(0), "Δ 0 minutes");
  });

  it("hides the delta until both periods have a week of samples", () => {
    const today = "2026-11-17";
    const history = buildRecentHeatmapDays(new Map(), 60, today);
    const values = new Map(
      history.flatMap((day, index) =>
        index >= 54 ? [[day.date, { hasData: true, value: 60 }] as const] : []
      )
    );
    const days = buildRecentHeatmapDays(values, 60, today);

    assert.equal(heatmapTotalDeltaMinutes(days), null);
  });
});
