export type LocationCategory =
  | "home"
  | "work"
  | "transit"
  | "away"
  | "social";

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
    label: "At home",
    category: "home",
    commuteRole: "home",
  },
  work: {
    label: "At work",
    category: "work",
    commuteRole: "work",
  },
};

export const WORK_SCHEDULE = {
  timezone: "Australia/Brisbane",
  /** Monday = 1 … Friday = 5 (JavaScript weekday index). */
  days: [1, 2, 3, 4, 5] as number[],
  startHour: 7,
  endHour: 18,
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
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export const isWithinWorkHours = (now: Date): boolean => {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: WORK_SCHEDULE.timezone,
    weekday: "short",
    hour: "numeric",
    hour12: false,
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
    return { status: zoneConfig.label, category: zoneConfig.category };
  }

  if (zoneConfig.commuteRole === "work") {
    return { status: "Leaving work", category: "transit" };
  }

  if (zoneConfig.commuteRole === "home") {
    if (isWithinWorkHours(now)) {
      return { status: "Heading to work", category: "transit" };
    }

    return { status: "Out and about", category: "away" };
  }

  const shortName = zoneConfig.shortName ?? zone;

  return {
    status: `Leaving ${shortName}`,
    category: "away",
  };
};

export const isStale = (updatedAt: number, now = Date.now()): boolean =>
  now - updatedAt > STALE_MS;

export const toPublicResponse = (
  record: LocationStatusRecord,
  now = Date.now()
): LocationPublicResponse => ({
  status: record.status,
  category: record.category,
  updatedAt: record.updatedAt,
  isStale: isStale(record.updatedAt, now),
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

export const getServerLocationStatus = async (): Promise<LocationPublicResponse | null> => {
  const { workersEnv } = await import("./workers-env");
  const kv = workersEnv.LOCATION_KV;
  if (!kv) {
    return null;
  }

  const raw = await kv.get(LOCATION_KV_KEY);
  if (!raw) {
    return null;
  }

  try {
    const record = JSON.parse(raw) as LocationStatusRecord;
    return toPublicResponse(record);
  } catch {
    return null;
  }
};
