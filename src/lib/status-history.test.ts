import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  accrueIntervalToStore,
  accrueMinutesAcrossBrisbaneDays,
  applyStatusSample,
  emptyStatusHistoryStore,
  isDiscordOnline,
  MAX_GAP_MS,
  parseStatusHistoryStore,
  pruneStatusHistoryDays,
  RETENTION_DAYS,
  SAMPLE_INTERVAL_MS,
  sampleBucketForTime,
  storeToPublicHistory,
} from "./status-history.ts";

describe("isDiscordOnline", () => {
  it("treats online, idle, and dnd as active presence", () => {
    assert.equal(isDiscordOnline("online"), true);
    assert.equal(isDiscordOnline("idle"), true);
    assert.equal(isDiscordOnline("dnd"), true);
    assert.equal(isDiscordOnline("offline"), false);
  });
});

describe("sampleBucketForTime", () => {
  it("groups five-minute windows", () => {
    const base = Date.parse("2026-03-01T10:00:00+10:00");
    const bucket = sampleBucketForTime(base);
    assert.equal(bucket, sampleBucketForTime(base + 4 * 60 * 1000));
    assert.notEqual(bucket, sampleBucketForTime(base + SAMPLE_INTERVAL_MS));
  });
});

describe("applyStatusSample idempotency", () => {
  it("records the first sample without accrual", () => {
    const store = emptyStatusHistoryStore();
    const at = Date.parse("2026-03-01T10:00:00+10:00");

    const first = applyStatusSample(store, at, {
      discordStatus: "online",
      locationCategory: "work",
      locationFresh: true,
    });

    assert.equal(first.recorded, true);
    assert.equal(first.store.cursor.lastSampledAt, at);
    assert.deepEqual(first.store.days, {});
  });

  it("skips duplicate buckets", () => {
    let store = emptyStatusHistoryStore();
    const at = Date.parse("2026-03-01T10:00:00+10:00");

    const { store: afterFirst } = applyStatusSample(store, at, {
      discordStatus: "online",
      locationCategory: "work",
      locationFresh: true,
    });
    store = afterFirst;

    const duplicate = applyStatusSample(store, at + 60_000, {
      discordStatus: "offline",
      locationCategory: "home",
      locationFresh: true,
    });

    assert.equal(duplicate.recorded, false);
    assert.equal(duplicate.store.cursor.lastDiscordStatus, "online");
  });
});

describe("accrual", () => {
  it("counts discord online minutes and work minutes", () => {
    const store = emptyStatusHistoryStore();
    const start = Date.parse("2026-03-01T10:00:00+10:00");
    const end = start + SAMPLE_INTERVAL_MS;

    store.cursor.lastDiscordStatus = "online";
    store.cursor.lastLocationCategory = "work";
    store.cursor.lastSampledAt = start;

    accrueIntervalToStore(store, start, end, {
      discordStatus: "online",
      locationCategory: "work",
      locationObserved: true,
    });

    assert.equal(store.days["2026-03-01"]?.discordOnlineMinutes, 5);
    assert.equal(store.days["2026-03-01"]?.workMinutes, 5);
  });

  it("does not accrue discord when status unknown", () => {
    const store = emptyStatusHistoryStore();
    const start = Date.parse("2026-03-01T10:00:00+10:00");
    const end = start + SAMPLE_INTERVAL_MS;

    accrueIntervalToStore(store, start, end, {
      discordStatus: null,
      locationCategory: null,
      locationObserved: false,
    });

    assert.equal(store.days["2026-03-01"], undefined);
  });

  it("splits intervals at Brisbane midnight", () => {
    const totals = new Map<string, number>();
    const start = Date.parse("2026-03-01T22:00:00+10:00");
    const end = Date.parse("2026-03-02T02:00:00+10:00");

    accrueMinutesAcrossBrisbaneDays(start, end, (isoDate, minutes) => {
      totals.set(isoDate, (totals.get(isoDate) ?? 0) + minutes);
    });

    assert.equal(totals.get("2026-03-01"), 120);
    assert.equal(totals.get("2026-03-02"), 120);
  });

  it("caps long gaps", () => {
    const store = emptyStatusHistoryStore();
    const start = Date.parse("2026-03-01T10:00:00+10:00");

    store.cursor.lastDiscordStatus = "online";
    store.cursor.lastLocationCategory = null;
    store.cursor.lastSampledAt = start;

    accrueIntervalToStore(store, start, start + MAX_GAP_MS, {
      discordStatus: "online",
      locationCategory: null,
      locationObserved: false,
    });

    assert.equal(store.days["2026-03-01"]?.discordOnlineMinutes, 15);
  });
});

describe("storeToPublicHistory", () => {
  it("marks days without samples as no data", () => {
    const store = emptyStatusHistoryStore();
    store.days["2026-03-01"] = {
      discordObservedMinutes: 5,
      discordOnlineMinutes: 5,
      homeMinutes: 0,
      locationObservedMinutes: 5,
      workMinutes: 5,
    };

    const pub = storeToPublicHistory(store);
    const day = pub.work.find((entry) => entry.date === "2026-03-01");

    assert.ok(day);
    assert.equal(day.hasData, true);
    assert.equal(day.value, 5);

    const emptyDay = pub.home.find((entry) => entry.date === "2026-03-02");
    assert.ok(emptyDay);
    assert.equal(emptyDay.hasData, false);
  });
});

describe("pruneStatusHistoryDays", () => {
  it("drops days older than retention window", () => {
    const store = emptyStatusHistoryStore();
    const now = Date.parse("2027-03-01T12:00:00+10:00");
    const oldIso = "2020-01-01";

    store.days[oldIso] = {
      discordObservedMinutes: 1,
      discordOnlineMinutes: 1,
      homeMinutes: 0,
      locationObservedMinutes: 0,
      workMinutes: 0,
    };
    store.days["2027-02-01"] = {
      discordObservedMinutes: 1,
      discordOnlineMinutes: 1,
      homeMinutes: 0,
      locationObservedMinutes: 0,
      workMinutes: 0,
    };

    pruneStatusHistoryDays(store, now);

    assert.equal(store.days[oldIso], undefined);
    assert.ok(store.days["2027-02-01"]);
    assert.ok(RETENTION_DAYS >= 365);
  });
});

describe("parseStatusHistoryStore", () => {
  it("returns empty store for invalid JSON", () => {
    const parsed = parseStatusHistoryStore("{");
    assert.equal(parsed.version, 1);
    assert.deepEqual(parsed.days, {});
  });
});
