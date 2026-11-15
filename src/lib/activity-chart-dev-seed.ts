import {
  BRISBANE_TIME_ZONE,
  isoDateInBrisbane,
} from "@/lib/format-in-brisbane";
import { LISTENING_HISTORY_KV_KEY } from "@/lib/listening-history";
import type { ListenPlay } from "@/lib/listening-history";
import {
  addBrisbaneDays,
  readRhythmStore,
  RHYTHMS_KV_KEY,
} from "@/lib/rhythms";
import type { MealQuality, RhythmDay, RhythmStore } from "@/lib/rhythms";
import {
  emptyStatusHistoryStore,
  STATUS_HISTORY_KV_KEY,
} from "@/lib/status-history";
import type {
  DailyStatusRollup,
  StatusHistoryStore,
} from "@/lib/status-history";

const SEED_DAYS = 100;
const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: BRISBANE_TIME_ZONE,
  weekday: "short",
});

const weekdayIndex = (isoDate: string): number => {
  const name = weekdayFormatter.format(new Date(`${isoDate}T12:00:00+10:00`));
  const index = WEEKDAY_NAMES.indexOf(name);
  return index === -1 ? 0 : index;
};

const datesEnding = (todayIso: string): string[] => {
  const dates: string[] = [];
  for (let offset = SEED_DAYS - 1; offset >= 0; offset -= 1) {
    dates.push(addBrisbaneDays(todayIso, -offset));
  }
  return dates;
};

const atBrisbane = (isoDate: string, hours: number, minutes: number): number =>
  Date.parse(
    `${isoDate}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00+10:00`
  );

const mealQuality = (salt: number): MealQuality =>
  salt % 5 === 0 ? "unhealthy" : "healthy";

const seedSupplements = (index: number): string[] => {
  if (index % 8 === 0) {
    return [];
  }

  return [
    "Creatine",
    index % 2 === 0 ? "Berberine" : null,
    index % 3 === 0 ? "Apple cider vinegar" : null,
    index % 2 === 1 ? "Vitamin C" : null,
    index % 4 === 0 ? "Vitamin D" : null,
  ].filter((name) => name !== null);
};

const buildRhythmDays = (dates: readonly string[]): RhythmStore => {
  const days: Record<string, RhythmDay> = {};
  for (const [index, isoDate] of dates.entries()) {
    const weekday = weekdayIndex(isoDate);
    const weekend = weekday === 0 || weekday === 6;
    const previous = addBrisbaneDays(isoDate, -1);
    const bedHour = weekend ? 23 + (index % 2) : 22 + (index % 3);
    const bedDate = bedHour >= 24 ? isoDate : previous;
    const bedClock = bedHour % 24;
    const wakeMinute = 10 + (index % 35);
    days[isoDate] = {
      bedAt: new Date(atBrisbane(bedDate, bedClock, 15)).toISOString(),
      coffees: weekend ? 1 + (index % 2) : index % 4,
      idempotencyKeys: [],
      meals: {
        breakfast: mealQuality(index),
        dinner: mealQuality(index + 2),
        lunch: mealQuality(index + (weekend ? 4 : 1)),
        snacks: index % 6 === 0 ? ["unhealthy"] : [],
      },
      steps: weekend ? 9000 + (index % 7) * 400 : 6200 + (index % 9) * 280,
      waterMl: 1400 + (index % 6) * 180,
      wokeAt: new Date(
        atBrisbane(isoDate, weekend ? 8 : 6, wakeMinute)
      ).toISOString(),
      workoutMinutes:
        weekday === 1 || weekday === 3 || weekday === 5
          ? 40 + (index % 4) * 10
          : 0,
      alcohol: weekend || index % 6 === 0,
      smoked: index % 5 === 0,
      hungOutInPerson: weekend || weekday === 5,
      hungOutOnline: index % 3 === 0,
      mood: 1 + ((index + weekday) % 5),
      readMinutes: index % 4 === 0 ? 0 : 20 + (index % 5) * 8,
      supplements: seedSupplements(index),
      weightKg:
        Math.round((78.4 + Math.sin(index / 8) * 0.7 - index * 0.012) * 10) /
        10,
    };
  }

  return { days, version: 1 };
};

const buildStatusDays = (dates: readonly string[]): StatusHistoryStore => {
  const store = emptyStatusHistoryStore();
  store.cursor.lastDiscordStatus = "online";
  store.cursor.lastLocationCategory = "home";
  store.cursor.lastSampledAt = atBrisbane(
    dates.at(-1) ?? dates[0] ?? "",
    12,
    0
  );

  for (const [index, isoDate] of dates.entries()) {
    const weekday = weekdayIndex(isoDate);
    const office = weekday >= 1 && weekday <= 5;
    let workMinutes = 0;
    if (office) {
      workMinutes = 430 + (index % 5) * 18;
    } else if (weekday === 6) {
      workMinutes = 40;
    }
    const homeMinutes = office ? 520 : 760;
    const commuteMinutes = office ? 50 : 20;
    const rollup: DailyStatusRollup = {
      discordLateMinutes: office
        ? 10 + (index % 5) * 12
        : 50 + (index % 4) * 15,
      discordObservedMinutes: 900,
      discordOnlineMinutes: office ? 160 + (index % 4) * 20 : 280,
      homeMinutes,
      locationObservedMinutes: workMinutes + homeMinutes + commuteMinutes,
      workMinutes,
    };
    store.days[isoDate] = rollup;
  }

  return store;
};

const TRACKS = [
  ["Intro", "The xx"],
  ["Holocene", "Bon Iver"],
  ["Myth", "Beach House"],
  ["Nights", "Frank Ocean"],
  ["Motion Picture Soundtrack", "Radiohead"],
] as const;

const buildListens = (dates: readonly string[]): ListenPlay[] => {
  const plays: ListenPlay[] = [];
  for (const [index, isoDate] of dates.entries()) {
    if (index % 8 === 0) {
      continue;
    }

    const count = 1 + (index % 4);
    for (let playIndex = 0; playIndex < count; playIndex += 1) {
      const [track, artist] =
        TRACKS[(index + playIndex) % TRACKS.length] ?? TRACKS[0];
      const startedAt = atBrisbane(
        isoDate,
        9 + playIndex * 3,
        (index * 7) % 50
      );
      plays.push({
        album: "Sample",
        artist,
        artistUrl: null,
        artworkUrl: null,
        listenedAt: startedAt,
        startedAt,
        track: `${track} ${isoDate}`,
        trackUrl: null,
      });
    }
  }

  return plays.toReversed();
};

export interface DevActivitySeed {
  listening: string;
  rhythms: string;
  status: string;
}

export const buildDevActivitySeed = (todayIso: string): DevActivitySeed => {
  const dates = datesEnding(todayIso);
  return {
    listening: JSON.stringify(buildListens(dates)),
    rhythms: JSON.stringify(buildRhythmDays(dates)),
    status: JSON.stringify(buildStatusDays(dates)),
  };
};

interface SeedKv {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
}

/** Local preview only. Missing chart stores are filled so every graph has days. */
export const ensureDevActivityChartSeed = async (kv: SeedKv): Promise<void> => {
  if (!import.meta.env.DEV) {
    return;
  }

  const [rhythms, status, listening] = await Promise.all([
    kv.get(RHYTHMS_KV_KEY),
    kv.get(STATUS_HISTORY_KV_KEY),
    kv.get(LISTENING_HISTORY_KV_KEY),
  ]);
  const refreshRhythms = !Object.values(readRhythmStore(rhythms).days).some(
    (day) => day.supplements?.includes("Berberine") === true
  );
  if (!refreshRhythms && status && listening) {
    return;
  }

  const seed = buildDevActivitySeed(isoDateInBrisbane());
  const writes: Promise<void>[] = [];
  if (refreshRhythms) {
    writes.push(kv.put(RHYTHMS_KV_KEY, seed.rhythms));
  }
  if (!status) {
    writes.push(kv.put(STATUS_HISTORY_KV_KEY, seed.status));
  }
  if (!listening) {
    writes.push(kv.put(LISTENING_HISTORY_KV_KEY, seed.listening));
  }
  await Promise.all(writes);
};
