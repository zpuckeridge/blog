export const ACTIVITY_RETENTION_MS = 24 * 60 * 60 * 1000;
export const ACTIVITY_MAX_EVENTS = 300;
export const ACTIVITY_MAX_VISITORS = 100;
export const ACTIVITY_TITLE_MAX_LENGTH = 120;
export const ACTIVITY_PATH_MAX_LENGTH = 200;

const MULTIPLE_SPACES = /\s+/gu;
const SITE_TITLE_SUFFIX = " — Zacchary Puckeridge";

export type ActivityEventAction = "listened" | "read" | "viewed" | "watched";

export interface ActivityEvent {
  action: ActivityEventAction;
  artist: string | null;
  artistUrl: string | null;
  city: string | null;
  country: string | null;
  countryCode: string | null;
  id: string;
  latitude: number | null;
  longitude: number | null;
  path: string;
  region: string | null;
  trackUrl: string | null;
  title: string;
  occurredAt: string;
}

export interface ActivityCaptureInput {
  action?: ActivityEventAction;
  artist?: string | null;
  artistUrl?: string | null;
  path: string;
  title: string;
  occurredAt?: string;
  city?: string | null;
  country?: string | null;
  countryCode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  region?: string | null;
  trackUrl?: string | null;
  visitorId?: string | null;
}

export interface ActivityCluster {
  events: ActivityEvent[];
  locationKey: string;
}

export interface ActivityEventGroup {
  count: number;
  event: ActivityEvent;
}

const cleanText = (
  value: string | null | undefined,
  maxLength: number
): string | null => {
  if (!value) {
    return null;
  }

  const cleaned = [...value]
    .filter((character) => {
      const codePoint = character.codePointAt(0) ?? 0;
      return codePoint > 0x1f && codePoint !== 0x7f;
    })
    .join("")
    .replace(MULTIPLE_SPACES, " ")
    .trim();

  return cleaned ? cleaned.slice(0, maxLength) : null;
};

export const cleanActivityPath = (path: string): string | null => {
  const cleaned = cleanText(path.split(/[?#]/u)[0], ACTIVITY_PATH_MAX_LENGTH);
  if (!cleaned || !cleaned.startsWith("/") || cleaned.startsWith("//")) {
    return null;
  }

  return cleaned === "/" ? cleaned : cleaned.replace(/\/+$/u, "") || "/";
};

export const cleanActivityTitle = (title: string): string =>
  (
    cleanText(title, ACTIVITY_TITLE_MAX_LENGTH)?.replace(
      SITE_TITLE_SUFFIX,
      ""
    ) ?? "Untitled page"
  ).trim() || "Untitled page";

export const formatActivityTitle = (
  path: string,
  title: string,
  action: ActivityEventAction = "viewed"
): string =>
  path === "/" && action !== "listened" ? "Home" : cleanActivityTitle(title);

export const getActivityAction = (path: string): ActivityEventAction => {
  if (path.startsWith("/timeline/")) {
    return "read";
  }
  return "viewed";
};

const cleanCountryCode = (countryCode: string | null | undefined): string =>
  cleanText(countryCode, 2)?.toUpperCase() ?? "";

export const cleanActivityExternalUrl = (
  value: string | null | undefined
): string | null => {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString().slice(0, 500)
      : null;
  } catch {
    return null;
  }
};

const roundCoordinate = (
  coordinate: number | null | undefined
): number | null =>
  typeof coordinate === "number" && Number.isFinite(coordinate)
    ? Math.round(coordinate * 10) / 10
    : null;

export const getActivityLocationKey = (
  event: Pick<ActivityEvent, "city" | "region" | "countryCode">
): string =>
  [
    event.city?.toLowerCase() ?? "",
    event.region?.toLowerCase() ?? "",
    event.countryCode?.toLowerCase() ?? "",
  ].join(":");

export const formatActivityLocation = (
  event: Pick<ActivityEvent, "city" | "region" | "country">
): string => {
  const parts = [event.city, event.region, event.country].filter(
    (part): part is string => Boolean(part)
  );
  return parts.length > 0 ? parts.join(", ") : "an unknown location";
};

export const createActivityEvent = (
  input: ActivityCaptureInput,
  id: string,
  now = new Date()
): ActivityEvent | null => {
  const path = cleanActivityPath(input.path);
  if (!path) {
    return null;
  }

  const occurredAt = input.occurredAt ? new Date(input.occurredAt) : now;
  if (Number.isNaN(occurredAt.getTime())) {
    return null;
  }

  return {
    action: input.action ?? getActivityAction(path),
    artist: cleanText(input.artist, 120),
    artistUrl: cleanActivityExternalUrl(input.artistUrl),
    city: cleanText(input.city, 80),
    country: cleanText(input.country, 80),
    countryCode: cleanCountryCode(input.countryCode) || null,
    id,
    latitude: roundCoordinate(input.latitude),
    longitude: roundCoordinate(input.longitude),
    occurredAt: occurredAt.toISOString(),
    path,
    region: cleanText(input.region, 80),
    title: cleanActivityTitle(input.title),
    trackUrl: cleanActivityExternalUrl(input.trackUrl),
  };
};

export const pruneActivityEvents = (
  events: readonly ActivityEvent[],
  now = Date.now()
): ActivityEvent[] =>
  events
    .filter((event) => {
      const timestamp = Date.parse(event.occurredAt);
      return (
        !Number.isNaN(timestamp) &&
        timestamp >= now - ACTIVITY_RETENTION_MS &&
        timestamp <= now + 60_000
      );
    })
    .toSorted((a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt))
    .slice(0, ACTIVITY_MAX_EVENTS);

export const clusterActivityEvents = (
  events: readonly ActivityEvent[]
): ActivityCluster[] => {
  const clusters: ActivityCluster[] = [];

  for (const event of events) {
    const locationKey = getActivityLocationKey(event);
    const previous = clusters.at(-1);
    if (previous?.locationKey === locationKey) {
      previous.events.push(event);
    } else {
      clusters.push({
        events: [event],
        locationKey,
      });
    }
  }

  return clusters;
};

export const groupActivityEvents = (
  events: readonly ActivityEvent[]
): ActivityEventGroup[] => {
  const groups: ActivityEventGroup[] = [];
  const groupsByKey = new Map<string, ActivityEventGroup>();

  for (const event of events) {
    const key = [
      event.action,
      event.path,
      event.title,
      event.artist ?? "",
    ].join(":");
    const existing = groupsByKey.get(key);

    if (existing) {
      existing.count += 1;
    } else {
      const group = { count: 1, event };
      groups.push(group);
      groupsByKey.set(key, group);
    }
  }

  return groups;
};

export const isPublicActivityPath = (path: string): boolean => {
  const cleanPath = cleanActivityPath(path);
  if (!cleanPath) {
    return false;
  }

  return !(
    cleanPath === "/activity" ||
    cleanPath.startsWith("/api/") ||
    cleanPath.startsWith("/_astro/") ||
    cleanPath.startsWith("/video/") ||
    cleanPath === "/videos"
  );
};
