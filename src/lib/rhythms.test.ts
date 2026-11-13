import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  applyRhythmWrite,
  emptyRhythmStore,
  readRhythmStore,
} from "./rhythms.ts";

const now = Date.parse("2026-11-13T15:00:00+10:00");

describe("applyRhythmWrite", () => {
  it("replaces a day's totals without clearing other fields", () => {
    const first = applyRhythmWrite(
      emptyRhythmStore(),
      { coffees: 1, date: "2026-11-13", steps: 8000 },
      now
    );
    assert.equal(first.ok, true);
    if (!first.ok) {
      return;
    }

    const second = applyRhythmWrite(
      first.store,
      { date: "2026-11-13", waterMl: 750 },
      now
    );
    assert.equal(second.ok, true);
    if (!second.ok) {
      return;
    }

    assert.equal(second.store.days["2026-11-13"]?.steps, 8000);
    assert.equal(second.store.days["2026-11-13"]?.coffees, 1);
    assert.equal(second.store.days["2026-11-13"]?.waterMl, 750);
  });

  it("accepts numeric strings from a shortcut", () => {
    const result = applyRhythmWrite(
      emptyRhythmStore(),
      { date: "2026-11-13", steps: "8453" },
      now
    );
    assert.equal(result.ok, true);
    if (!result.ok) {
      return;
    }
    assert.equal(result.store.days["2026-11-13"]?.steps, 8453);
  });

  it("does not apply an idempotent retry twice", () => {
    const body = {
      add: { coffees: 1 },
      date: "2026-11-13",
      idempotencyKey: "coffee-0001",
    };
    const first = applyRhythmWrite(emptyRhythmStore(), body, now);
    assert.equal(first.ok, true);
    if (!first.ok) {
      return;
    }

    const second = applyRhythmWrite(first.store, body, now);
    assert.equal(second.ok, true);
    if (!second.ok) {
      return;
    }

    assert.equal(second.replayed, true);
    assert.equal(second.store.days["2026-11-13"]?.coffees, 1);
  });

  it("files bed and wake on the morning you woke", () => {
    const result = applyRhythmWrite(
      emptyRhythmStore(),
      {
        bedAt: "2026-11-12T23:10:00+10:00",
        date: "2026-11-12",
        steps: 7000,
        wokeAt: "2026-11-13T06:40:00+10:00",
      },
      now
    );
    assert.equal(result.ok, true);
    if (!result.ok) {
      return;
    }

    assert.equal(result.store.days["2026-11-12"]?.steps, 7000);
    assert.equal(result.store.days["2026-11-12"]?.bedAt, undefined);
    assert.ok(result.store.days["2026-11-13"]?.bedAt);
    assert.ok(result.store.days["2026-11-13"]?.wokeAt);
    assert.deepEqual(result.dates, ["2026-11-12", "2026-11-13"]);
  });

  it("replaces breakfast and appends snacks up to six", () => {
    let store = emptyRhythmStore();
    const breakfast = applyRhythmWrite(
      store,
      {
        date: "2026-11-13",
        meal: { quality: "unhealthy", slot: "breakfast" },
      },
      now
    );
    assert.equal(breakfast.ok, true);
    if (!breakfast.ok) {
      return;
    }
    ({ store } = breakfast);

    const corrected = applyRhythmWrite(
      store,
      {
        date: "2026-11-13",
        meal: { quality: "healthy", slot: "breakfast" },
      },
      now
    );
    assert.equal(corrected.ok, true);
    if (!corrected.ok) {
      return;
    }
    assert.equal(
      corrected.store.days["2026-11-13"]?.meals.breakfast,
      "healthy"
    );

    ({ store } = corrected);
    for (let count = 0; count < 6; count += 1) {
      const snack = applyRhythmWrite(
        store,
        {
          date: "2026-11-13",
          meal: { quality: "healthy", slot: "snack" },
        },
        now
      );
      assert.equal(snack.ok, true);
      if (!snack.ok) {
        return;
      }
      ({ store } = snack);
    }

    const extra = applyRhythmWrite(
      store,
      { date: "2026-11-13", meal: { quality: "unhealthy", slot: "snack" } },
      now
    );
    assert.equal(extra.ok, false);
    if (extra.ok) {
      return;
    }
    assert.equal(extra.error, "Too many snacks");
  });

  it("clears a meal when the shortcut sends null", () => {
    const created = applyRhythmWrite(
      emptyRhythmStore(),
      { date: "2026-11-13", meal: { quality: "healthy", slot: "lunch" } },
      now
    );
    assert.equal(created.ok, true);
    if (!created.ok) {
      return;
    }

    const cleared = applyRhythmWrite(
      created.store,
      { date: "2026-11-13", meals: { lunch: null } },
      now
    );
    assert.equal(cleared.ok, true);
    if (!cleared.ok) {
      return;
    }
    assert.equal(cleared.store.days["2026-11-13"]?.meals.lunch, undefined);
  });

  it("rejects a future date and a wake before bed", () => {
    const future = applyRhythmWrite(
      emptyRhythmStore(),
      { date: "2026-11-14", steps: 1 },
      now
    );
    assert.equal(future.ok, false);

    const inverted = applyRhythmWrite(
      emptyRhythmStore(),
      {
        bedAt: "2026-11-13T09:00:00+10:00",
        date: "2026-11-13",
        wokeAt: "2026-11-13T07:00:00+10:00",
      },
      now
    );
    assert.equal(inverted.ok, false);
    if (inverted.ok) {
      return;
    }
    assert.equal(inverted.error, "Wake time is before bed time");
  });

  it("stores mood, weight, alcohol, reading, and company", () => {
    const result = applyRhythmWrite(
      emptyRhythmStore(),
      {
        alcohol: false,
        smoked: true,
        date: "2026-11-13",
        hungOutInPerson: true,
        hungOutOnline: false,
        mood: 4,
        readMinutes: 0,
        weightKg: 78.44,
      },
      now
    );
    assert.equal(result.ok, true);
    if (!result.ok) {
      return;
    }

    const day = result.store.days["2026-11-13"];
    assert.equal(day?.mood, 4);
    assert.equal(day?.weightKg, 78.4);
    assert.equal(day?.alcohol, false);
    assert.equal(day?.smoked, true);
    assert.equal(day?.readMinutes, 0);
    assert.equal(day?.hungOutInPerson, true);
    assert.equal(day?.hungOutOnline, false);

    const asText = applyRhythmWrite(
      result.store,
      { date: "2026-11-12", weightKg: "78.4" },
      now
    );
    assert.equal(asText.ok, true);
    if (!asText.ok) {
      return;
    }
    assert.equal(asText.store.days["2026-11-12"]?.weightKg, 78.4);

    const added = applyRhythmWrite(
      result.store,
      { date: "2026-11-13", supplement: "Creatine" },
      now
    );
    assert.equal(added.ok, true);
    if (!added.ok) {
      return;
    }
    const again = applyRhythmWrite(
      added.store,
      { date: "2026-11-13", supplement: "creatine" },
      now
    );
    assert.equal(again.ok, true);
    if (!again.ok) {
      return;
    }
    assert.deepEqual(again.store.days["2026-11-13"]?.supplements, ["Creatine"]);

    const listed = applyRhythmWrite(
      again.store,
      { date: "2026-11-13", supplements: ["Creatine", "Vitamin D"] },
      now
    );
    assert.equal(listed.ok, true);
    if (!listed.ok) {
      return;
    }
    assert.deepEqual(listed.store.days["2026-11-13"]?.supplements, [
      "Creatine",
      "Vitamin D",
    ]);

    const rejected = applyRhythmWrite(
      emptyRhythmStore(),
      { date: "2026-11-13", mood: 6 },
      now
    );
    assert.equal(rejected.ok, false);
  });
});

describe("readRhythmStore", () => {
  it("returns an empty store for invalid JSON", () => {
    const store = readRhythmStore("{");
    assert.equal(store.version, 1);
    assert.deepEqual(store.days, {});
  });

  it("drops days older than the retention window on the next write", () => {
    const store = emptyRhythmStore();
    store.days["2020-01-01"] = {
      idempotencyKeys: [],
      meals: { snacks: [] },
      steps: 1,
    };

    const result = applyRhythmWrite(
      store,
      { date: "2026-11-13", steps: 2 },
      now
    );
    assert.equal(result.ok, true);
    if (!result.ok) {
      return;
    }
    assert.equal(result.store.days["2020-01-01"], undefined);
    assert.equal(result.store.days["2026-11-13"]?.steps, 2);
  });
});
