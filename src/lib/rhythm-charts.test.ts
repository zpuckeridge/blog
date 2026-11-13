import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  brisbaneWeekdayIndex,
  buildActivityCharts,
  sleepAxisFractions,
} from "./rhythm-charts.ts";
import { emptyRhythmStore } from "./rhythms.ts";
import type { RhythmStore } from "./rhythms.ts";
import { emptyStatusHistoryStore } from "./status-history.ts";
import type { StatusHistoryStore } from "./status-history.ts";

const today = "2026-11-13";

const chartsFrom = (
  rhythms: RhythmStore,
  status: StatusHistoryStore = emptyStatusHistoryStore(),
  listens: { listenedAt: number }[] = []
) =>
  buildActivityCharts({
    listens,
    rhythms,
    status,
    todayIso: today,
  });

describe("sleep axis", () => {
  it("places 11 pm to 7 am on the 6 pm to noon scale", () => {
    const fractions = sleepAxisFractions(
      "2026-03-01T23:00:00+10:00",
      "2026-03-02T07:00:00+10:00"
    );
    assert.ok(fractions);
    assert.ok(Math.abs(fractions.start - 5 / 18) < 0.001);
    assert.ok(Math.abs(fractions.end - 13 / 18) < 0.001);
  });
});

describe("weekday index", () => {
  it("treats 9 November 2026 as Monday", () => {
    assert.equal(brisbaneWeekdayIndex("2026-11-09"), 1);
    assert.equal(brisbaneWeekdayIndex("2026-11-13"), 5);
  });
});

describe("buildActivityCharts", () => {
  it("compares the step average with 56 days earlier", () => {
    const rhythms = emptyRhythmStore();
    const charts = chartsFrom(rhythms);
    const dates = charts.movement.points.map((point) => point.date);

    for (const [index, date] of dates.entries()) {
      if (date === today) {
        continue;
      }
      const day = rhythms.days[date] ?? {
        idempotencyKeys: [],
        meals: { snacks: [] },
      };
      day.steps = index < 50 ? 10_000 : 8000;
      rhythms.days[date] = day;
    }

    const { movement } = chartsFrom(rhythms);
    assert.equal(movement.headline, "8,000 steps");
    assert.equal(movement.delta, "Δ −2,000 steps");
    assert.equal(movement.points.at(-1)?.bar, null);
    assert.equal(movement.points.at(-2)?.bar, 8000);
  });

  it("leaves a missed shortcut as a gap", () => {
    const rhythms = emptyRhythmStore();
    rhythms.days["2026-11-12"] = {
      idempotencyKeys: [],
      meals: { snacks: [] },
      steps: 4000,
    };

    const { movement } = chartsFrom(rhythms);
    const logged = movement.points.filter((point) => point.bar !== null);
    assert.equal(logged.length, 1);
    assert.equal(movement.headline, "1 day logged");
    assert.equal(movement.delta, null);
  });

  it("averages healthy meals as a share", () => {
    const rhythms = emptyRhythmStore();
    const seed = chartsFrom(rhythms);
    for (const point of seed.meals.points.slice(-8, -1)) {
      rhythms.days[point.date] = {
        idempotencyKeys: [],
        meals: { breakfast: "healthy", lunch: "unhealthy", snacks: [] },
      };
    }

    const { meals } = chartsFrom(rhythms);
    assert.equal(meals.headline, "50% healthy");
    assert.equal(meals.stacked, true);
    assert.equal(meals.compareMax, 100);
  });

  it("counts a silent day inside the listening history as zero", () => {
    const first = Date.parse("2026-11-10T12:00:00+10:00");
    const third = Date.parse("2026-11-12T12:00:00+10:00");
    const { attention } = chartsFrom(
      emptyRhythmStore(),
      emptyStatusHistoryStore(),
      [{ listenedAt: first }, { listenedAt: third }]
    );
    const byDate = new Map(
      attention.points.map((point) => [point.date, point.bar])
    );

    assert.equal(byDate.get("2026-11-10"), 1);
    assert.equal(byDate.get("2026-11-11"), 0);
    assert.equal(byDate.get("2026-11-12"), 1);
    assert.equal(byDate.get("2026-11-09"), null);
  });

  it("names the weekday with the most time at work", () => {
    const status = emptyStatusHistoryStore();
    for (const date of ["2026-11-10", "2026-11-03"]) {
      status.days[date] = {
        discordObservedMinutes: 0,
        discordOnlineMinutes: 0,
        homeMinutes: 0,
        locationObservedMinutes: 480,
        workMinutes: 480,
      };
    }
    status.days["2026-11-09"] = {
      discordObservedMinutes: 0,
      discordOnlineMinutes: 0,
      homeMinutes: 0,
      locationObservedMinutes: 60,
      workMinutes: 60,
    };

    const week = chartsFrom(emptyRhythmStore(), status).weekWork;
    assert.equal(week.headline, "Most on Tuesday");
    assert.equal(week.days[1]?.peak, true);
    assert.equal(week.days[0]?.label, "Mon");
  });

  it("hides the late-night chart until a night has been sampled", () => {
    const rhythms = emptyRhythmStore();
    rhythms.days["2026-11-13"] = {
      bedAt: "2026-11-12T23:00:00+10:00",
      idempotencyKeys: [],
      meals: { snacks: [] },
      wokeAt: "2026-11-13T07:00:00+10:00",
    };

    const withoutLate = chartsFrom(rhythms).afterTen;
    assert.equal(withoutLate.empty, true);
    assert.equal(withoutLate.headline, null);

    const status = emptyStatusHistoryStore();
    status.days["2026-11-13"] = {
      discordLateMinutes: 40,
      discordObservedMinutes: 40,
      discordOnlineMinutes: 40,
      homeMinutes: 0,
      locationObservedMinutes: 0,
      workMinutes: 0,
    };
    const withLate = chartsFrom(rhythms, status).afterTen;
    assert.equal(withLate.empty, false);
    const latest = withLate.points.at(-1);
    assert.equal(latest?.bar, 40);
  });
});
