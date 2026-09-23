import { buildLast365HeatmapDays } from "@/lib/calendar-heatmap";
import type { HeatmapDay } from "@/lib/calendar-heatmap";
import { isoDateInBrisbane } from "@/lib/format-in-brisbane";
import { fetchLanyardPresence } from "@/lib/lanyard-client";
import { LANYARD_USER_ID } from "@/lib/lanyard-status";
import type { DiscordStatus } from "@/lib/lanyard-status";
import { isStale, LOCATION_KV_KEY } from "@/lib/location-status";
import type {
  LocationCategory,
  LocationStatusRecord,
} from "@/lib/location-status";

export const STATUS_HISTORY_KV_KEY = "status:history:v1";

export const SAMPLE_INTERVAL_MS = 5 * 60 * 1000;
export const MAX_GAP_MS = 15 * 60 * 1000;
export const RETENTION_DAYS = 365;

export interface DailyStatusRollup {
  discordObservedMinutes: number;
  discordOnlineMinutes: number;
  homeMinutes: number;
  locationObservedMinutes: number;
  workMinutes: number;
}

export interface StatusHistoryCursor {
  lastDiscordStatus: DiscordStatus | null;
  lastLocationCategory: LocationCategory | null;
  lastSampleBucket: number | null;
  lastSampledAt: number | null;
}

export interface StatusHistoryStore {
  cursor: StatusHistoryCursor;
  days: Record<string, DailyStatusRollup>;
  version: 1;
}

export interface StatusHistoryPublic {
  discord: HeatmapDay[];
  home: HeatmapDay[];
  work: HeatmapDay[];
  collectionStartedAt: number | null;
}

interface StatusKv {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
}

const emptyRollup = (): DailyStatusRollup => ({
  discordObservedMinutes: 0,
  discordOnlineMinutes: 0,
  homeMinutes: 0,
  locationObservedMinutes: 0,
  workMinutes: 0,
});

export const emptyStatusHistoryStore = (): StatusHistoryStore => ({
  cursor: {
    lastDiscordStatus: null,
    lastLocationCategory: null,
    lastSampleBucket: null,
    lastSampledAt: null,
  },
  days: {},
  version: 1,
});

export const parseDiscordStatus = (
  discordStatus: string | undefined
): DiscordStatus | null => {
  if (
    discordStatus === "online" ||
    discordStatus === "idle" ||
    discordStatus === "dnd" ||
    discordStatus === "offline"
  ) {
    return discordStatus;
  }

  return null;
};

export const isDiscordOnline = (status: DiscordStatus): boolean =>
  status === "online" || status === "idle" || status === "dnd";

export const sampleBucketForTime = (atMs: number): number =>
  Math.floor(atMs / SAMPLE_INTERVAL_MS);

const brisbaneDayStartMs = (isoDate: string): number =>
  Date.parse(`${isoDate}T00:00:00+10:00`);

const brisbaneNextDayStartMs = (isoDate: string): number => {
  const nextIso = isoDateInBrisbane(
    brisbaneDayStartMs(isoDate) + 25 * 60 * 60 * 1000
  );
  return brisbaneDayStartMs(nextIso);
};

/** Split [startMs, endMs) into Brisbane calendar days and invoke callback with fractional minutes. */
export const accrueMinutesAcrossBrisbaneDays = (
  startMs: number,
  endMs: number,
  onDay: (isoDate: string, minutes: number) => void
): void => {
  if (endMs <= startMs) {
    return;
  }

  let current = startMs;
  while (current < endMs) {
    const dayIso = isoDateInBrisbane(current);
    const nextMidnight = brisbaneNextDayStartMs(dayIso);
    const segmentEnd = Math.min(endMs, nextMidnight);
    const minutes = (segmentEnd - current) / 60_000;

    if (minutes > 0) {
      onDay(dayIso, minutes);
    }

    current = segmentEnd;
    if (current === nextMidnight && current < endMs) {
      continue;
    }
    if (current >= endMs) {
      break;
    }
  }
};

const ensureRollup = (
  store: StatusHistoryStore,
  isoDate: string
): DailyStatusRollup => {
  if (!store.days[isoDate]) {
    store.days[isoDate] = emptyRollup();
  }

  return store.days[isoDate];
};

export interface SampleAccrualState {
  discordStatus: DiscordStatus | null;
  locationCategory: LocationCategory | null;
  locationObserved: boolean;
}

export const accrueIntervalToStore = (
  store: StatusHistoryStore,
  startMs: number,
  endMs: number,
  state: SampleAccrualState
): void => {
  accrueMinutesAcrossBrisbaneDays(startMs, endMs, (isoDate, minutes) => {
    const accruesDiscord = state.discordStatus !== null;
    const accruesLocation =
      state.locationObserved && state.locationCategory !== null;

    if (!accruesDiscord && !accruesLocation) {
      return;
    }

    const rollup = ensureRollup(store, isoDate);

    if (state.discordStatus !== null) {
      rollup.discordObservedMinutes += minutes;
      if (isDiscordOnline(state.discordStatus)) {
        rollup.discordOnlineMinutes += minutes;
      }
    }

    if (state.locationObserved && state.locationCategory !== null) {
      rollup.locationObservedMinutes += minutes;
      if (state.locationCategory === "work") {
        rollup.workMinutes += minutes;
      }
      if (state.locationCategory === "home") {
        rollup.homeMinutes += minutes;
      }
    }
  });
};

export const pruneStatusHistoryDays = (
  store: StatusHistoryStore,
  nowMs: number
): void => {
  const cutoffIso = isoDateInBrisbane(
    nowMs - RETENTION_DAYS * 24 * 60 * 60 * 1000
  );

  const nextDays: Record<string, DailyStatusRollup> = {};
  for (const [isoDate, rollup] of Object.entries(store.days)) {
    if (isoDate >= cutoffIso) {
      nextDays[isoDate] = rollup;
    }
  }
  store.days = nextDays;
};

export const parseStatusHistoryStore = (
  raw: string | null
): StatusHistoryStore => {
  if (!raw) {
    return emptyStatusHistoryStore();
  }

  try {
    const parsed = JSON.parse(raw) as Partial<StatusHistoryStore>;
    if (parsed.version !== 1 || typeof parsed.days !== "object") {
      return emptyStatusHistoryStore();
    }

    return {
      cursor: {
        lastDiscordStatus: parsed.cursor?.lastDiscordStatus ?? null,
        lastLocationCategory: parsed.cursor?.lastLocationCategory ?? null,
        lastSampleBucket: parsed.cursor?.lastSampleBucket ?? null,
        lastSampledAt: parsed.cursor?.lastSampledAt ?? null,
      },
      days: parsed.days ?? {},
      version: 1,
    };
  } catch {
    return emptyStatusHistoryStore();
  }
};

const parseLocationRecord = (
  raw: string | null
): LocationStatusRecord | null => {
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as LocationStatusRecord;
  } catch {
    return null;
  }
};

export const storeToPublicHistory = (
  store: StatusHistoryStore
): StatusHistoryPublic => {
  const discordValues = new Map<
    string,
    Pick<HeatmapDay, "hasData" | "value">
  >();
  const workValues = new Map<string, Pick<HeatmapDay, "hasData" | "value">>();
  const homeValues = new Map<string, Pick<HeatmapDay, "hasData" | "value">>();

  for (const [date, rollup] of Object.entries(store.days)) {
    discordValues.set(date, {
      hasData: rollup.discordObservedMinutes > 0,
      value: rollup.discordOnlineMinutes,
    });
    workValues.set(date, {
      hasData: rollup.locationObservedMinutes > 0,
      value: rollup.workMinutes,
    });
    homeValues.set(date, {
      hasData: rollup.locationObservedMinutes > 0,
      value: rollup.homeMinutes,
    });
  }

  return {
    collectionStartedAt: store.cursor.lastSampledAt,
    discord: buildLast365HeatmapDays(discordValues),
    home: buildLast365HeatmapDays(homeValues),
    work: buildLast365HeatmapDays(workValues),
  };
};

export const readStatusHistoryPublic = async (
  kv: StatusKv
): Promise<StatusHistoryPublic> => {
  const raw = await kv.get(STATUS_HISTORY_KV_KEY);
  return storeToPublicHistory(parseStatusHistoryStore(raw));
};

export const getServerStatusHistory =
  async (): Promise<StatusHistoryPublic | null> => {
    const { workersEnv } = await import("./workers-env");
    const kv = workersEnv.LOCATION_KV;
    if (!kv) {
      return null;
    }

    return readStatusHistoryPublic(kv);
  };

export interface RecordStatusSampleResult {
  recorded: boolean;
  store: StatusHistoryStore;
}

export interface StatusSampleReading {
  discordStatus: DiscordStatus | null;
  locationCategory: LocationCategory | null;
  locationFresh: boolean;
}

export const applyStatusSample = (
  store: StatusHistoryStore,
  scheduledTimeMs: number,
  reading: StatusSampleReading
): RecordStatusSampleResult => {
  const bucket = sampleBucketForTime(scheduledTimeMs);

  if (store.cursor.lastSampleBucket === bucket) {
    return { recorded: false, store };
  }

  const previousSampleAt = store.cursor.lastSampledAt;
  if (previousSampleAt !== null) {
    const rawDelta = scheduledTimeMs - previousSampleAt;
    const cappedDelta = Math.min(rawDelta, MAX_GAP_MS);
    const intervalEnd = previousSampleAt + cappedDelta;

    accrueIntervalToStore(store, previousSampleAt, intervalEnd, {
      discordStatus: store.cursor.lastDiscordStatus,
      locationCategory: store.cursor.lastLocationCategory,
      locationObserved: store.cursor.lastLocationCategory !== null,
    });
  }

  store.cursor.lastSampledAt = scheduledTimeMs;
  store.cursor.lastSampleBucket = bucket;

  if (reading.discordStatus !== null) {
    store.cursor.lastDiscordStatus = reading.discordStatus;
  }

  if (reading.locationFresh && reading.locationCategory !== null) {
    store.cursor.lastLocationCategory = reading.locationCategory;
  } else if (!reading.locationFresh) {
    store.cursor.lastLocationCategory = null;
  }

  pruneStatusHistoryDays(store, scheduledTimeMs);

  return { recorded: true, store };
};

export const recordStatusSample = async (
  kv: StatusKv,
  scheduledTimeMs: number
): Promise<RecordStatusSampleResult> => {
  const store = parseStatusHistoryStore(await kv.get(STATUS_HISTORY_KV_KEY));

  const [presence, locationRaw] = await Promise.all([
    fetchLanyardPresence(LANYARD_USER_ID),
    kv.get(LOCATION_KV_KEY),
  ]);

  const locationRecord = parseLocationRecord(locationRaw);
  const locationFresh =
    locationRecord !== null &&
    !isStale(locationRecord.updatedAt, scheduledTimeMs);

  const result = applyStatusSample(store, scheduledTimeMs, {
    discordStatus: presence
      ? parseDiscordStatus(presence.discord_status)
      : null,
    locationCategory: locationFresh ? locationRecord.category : null,
    locationFresh,
  });

  if (result.recorded) {
    await kv.put(STATUS_HISTORY_KV_KEY, JSON.stringify(result.store));
  }

  return result;
};
