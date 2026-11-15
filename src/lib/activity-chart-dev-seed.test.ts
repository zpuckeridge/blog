import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildDevActivitySeed } from "./activity-chart-dev-seed.ts";
import { readListenHistory } from "./listening-history.ts";
import { buildActivityCharts } from "./rhythm-charts.ts";
import { readRhythmStore } from "./rhythms.ts";
import { parseStatusHistoryStore } from "./status-history.ts";

describe("dev activity seed", () => {
  it("fills every activity chart", () => {
    const today = "2026-11-13";
    const seed = buildDevActivitySeed(today);
    const charts = buildActivityCharts({
      listens: readListenHistory(seed.listening),
      rhythms: readRhythmStore(seed.rhythms),
      status: parseStatusHistoryStore(seed.status),
      todayIso: today,
    });

    assert.equal(charts.movement.empty, false);
    assert.equal(charts.sleep.empty, false);
    assert.equal(charts.drinks.empty, false);
    assert.equal(charts.meals.empty, false);
    assert.equal(charts.place.empty, false);
    assert.equal(charts.attention.empty, false);
    assert.equal(charts.afterTen.empty, false);
    assert.equal(charts.weekWork.empty, false);
    assert.ok(charts.weekSteps);
    assert.match(charts.place.headline ?? "", /at work/u);
    assert.match(charts.attention.headline ?? "", /play/u);
    assert.match(charts.afterTen.headline ?? "", /after 10 pm/u);
    assert.match(charts.weekWork.headline ?? "", /Most on/u);
    assert.equal(charts.mood.empty, false);
    assert.equal(charts.weight.empty, false);
    assert.equal(charts.vices.empty, false);
    assert.equal(charts.reading.empty, false);
    assert.equal(charts.people.empty, false);
    assert.match(charts.weight.headline ?? "", /kg/u);
    assert.match(charts.vices.headline ?? "", /a week/u);
    assert.equal(charts.supplements.empty, false);
    assert.match(charts.supplements.headline ?? "", /a week/u);
  });
});
