export type LocationCategory = "home" | "work" | "transit" | "away" | "social";

export type LocationEvent = "enter" | "leave";

export type CommuteRole = "home" | "work";

export interface ZoneConfig {
  label: string;
  category: LocationCategory;
  commuteRole?: CommuteRole;
  shortName?: string;
}

export const ZONES: Record<string, ZoneConfig> = {
  home: {
    category: "home",
    commuteRole: "home",
    label: "At home",
  },
  work: {
    category: "work",
    commuteRole: "work",
    label: "At work",
  },
};

export const WORK_SCHEDULE = {
  /** Monday = 1 … Friday = 5 (JavaScript weekday index). */
  days: [1, 2, 3, 4, 5] as number[],
  endHour: 18,
  startHour: 7,
  timezone: "Australia/Brisbane",
};

export const LOCATION_KV_KEY = "location:status";
export const STALE_MS = 6 * 60 * 60 * 1000;

export interface LocationStatusRecord {
  status: string;
  zone: string;
  event: LocationEvent;
  category: LocationCategory;
  updatedAt: number;
}

export interface LocationPublicResponse {
  status: string;
  category: LocationCategory;
  updatedAt: number;
  isStale: boolean;
}

const BRISBANE_WEEKDAY: Record<string, number> = {
  Fri: 5,
  Mon: 1,
  Sat: 6,
  Sun: 0,
  Thu: 4,
  Tue: 2,
  Wed: 3,
};

export const isWithinWorkHours = (now: Date): boolean => {
  const parts = new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    hour12: false,
    timeZone: WORK_SCHEDULE.timezone,
    weekday: "short",
  }).formatToParts(now);

  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const day = BRISBANE_WEEKDAY[weekday] ?? -1;

  if (!WORK_SCHEDULE.days.includes(day)) {
    return false;
  }

  return hour >= WORK_SCHEDULE.startHour && hour < WORK_SCHEDULE.endHour;
};

export const deriveStatus = (
  zone: string,
  event: LocationEvent,
  now: Date
): { status: string; category: LocationCategory } => {
  const zoneConfig = ZONES[zone];
  if (!zoneConfig) {
    throw new Error(`Unknown zone: ${zone}`);
  }

  if (event === "enter") {
    return { category: zoneConfig.category, status: zoneConfig.label };
  }

  if (zoneConfig.commuteRole === "work") {
    return { category: "transit", status: "Leaving work" };
  }

  if (zoneConfig.commuteRole === "home") {
    if (isWithinWorkHours(now)) {
      return { category: "transit", status: "Heading to work" };
    }

    return { category: "away", status: "Out and about" };
  }

  const shortName = zoneConfig.shortName ?? zone;

  return {
    category: "away",
    status: `Leaving ${shortName}`,
  };
};

export const isStale = (updatedAt: number, now = Date.now()): boolean =>
  now - updatedAt > STALE_MS;

export const toPublicResponse = (
  record: LocationStatusRecord,
  now = Date.now()
): LocationPublicResponse => ({
  category: record.category,
  isStale: isStale(record.updatedAt, now),
  status: record.status,
  updatedAt: record.updatedAt,
});

export const formatLocationRelativeTime = (
  updatedAt: number,
  now = Date.now()
): string => {
  const seconds = Math.max(0, Math.floor((now - updatedAt) / 1000));

  if (seconds < 60) {
    return "just now";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const PRODUCTION_LOCATION_URL = "https://zacchary.me/api/location";

const parseStoredRecord = (raw: string): LocationStatusRecord | null => {
  try {
    return JSON.parse(raw) as LocationStatusRecord;
  } catch {
    return null;
  }
};

const isPublicLocationResponse = (
  value: unknown
): value is LocationPublicResponse => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Partial<LocationPublicResponse>;
  return (
    typeof record.status === "string" &&
    record.status.length > 0 &&
    typeof record.category === "string" &&
    typeof record.updatedAt === "number" &&
    typeof record.isStale === "boolean"
  );
};

/** Dev-only: empty in-memory KV has no webhook history — mirror production. */
const seedLocationFromProduction = async (
  kv: NonNullable<Cloudflare.Env["LOCATION_KV"]>
): Promise<LocationPublicResponse | null> => {
  if (!import.meta.env.DEV) {
    return null;
  }

  try {
    const response = await fetch(PRODUCTION_LOCATION_URL, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      return null;
    }

    const payload: unknown = await response.json();
    if (!isPublicLocationResponse(payload)) {
      return null;
    }

    const zone =
      payload.category === "work" || payload.category === "home"
        ? payload.category
        : "home";

    const record: LocationStatusRecord = {
      category: payload.category,
      event: "enter",
      status: payload.status,
      updatedAt: payload.updatedAt,
      zone,
    };

    await kv.put(LOCATION_KV_KEY, JSON.stringify(record));
    return toPublicResponse(record);
  } catch {
    return null;
  }
};

export const readLocationPublicStatus =
  async (): Promise<LocationPublicResponse | null> => {
    const { workersEnv } = await import("./workers-env");
    const kv = workersEnv.LOCATION_KV;
    if (!kv) {
      return null;
    }

    const raw = await kv.get(LOCATION_KV_KEY);
    if (raw) {
      const record = parseStoredRecord(raw);
      return record ? toPublicResponse(record) : null;
    }

    return seedLocationFromProduction(kv);
  };

export const getServerLocationStatus =
  (): Promise<LocationPublicResponse | null> => readLocationPublicStatus();
