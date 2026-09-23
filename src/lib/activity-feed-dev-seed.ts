import { createActivityEvent } from "@/lib/activity-feed";
import type { ActivityEvent } from "@/lib/activity-feed";

const minutesAgo = (now: number, minutes: number): string =>
  new Date(now - minutes * 60_000).toISOString();

const seedEvent = (
  id: string,
  occurredAt: string,
  input: Parameters<typeof createActivityEvent>[0],
  visitorKey: string,
  clientLabel: string | null
): ActivityEvent | null => {
  const event = createActivityEvent(input, id, new Date(occurredAt));
  if (!event) {
    return null;
  }

  return { ...event, clientLabel, visitorKey };
};

/** Sample activity for local dev when the in-memory store is empty. */
export const createDevActivitySeedEvents = (
  now = Date.now()
): ActivityEvent[] =>
  [
    seedEvent(
      "dev-seed-1",
      minutesAgo(now, 2),
      {
        action: "viewed",
        city: "Brisbane",
        country: "AU",
        countryCode: "AU",
        latitude: -27.5,
        longitude: 153,
        path: "/",
        region: "Queensland",
        title: "Zacchary Puckeridge",
      },
      "dev-visitor-safari-brisbane",
      "Safari on macOS"
    ),
    seedEvent(
      "dev-seed-2",
      minutesAgo(now, 3),
      {
        action: "viewed",
        city: "Brisbane",
        country: "AU",
        countryCode: "AU",
        latitude: -27.5,
        longitude: 153,
        path: "/uses",
        region: "Queensland",
        title: "Uses",
      },
      "dev-visitor-safari-brisbane",
      "Safari on macOS"
    ),
    seedEvent(
      "dev-seed-3",
      minutesAgo(now, 4),
      {
        action: "viewed",
        city: "Brisbane",
        country: "AU",
        countryCode: "AU",
        latitude: -27.5,
        longitude: 153,
        path: "/timeline",
        region: "Queensland",
        title: "Timeline",
      },
      "dev-visitor-chrome-brisbane",
      "Chrome on Windows"
    ),
    seedEvent(
      "dev-seed-4",
      minutesAgo(now, 8),
      {
        action: "read",
        city: "Melbourne",
        country: "AU",
        countryCode: "AU",
        latitude: -37.8,
        longitude: 145,
        path: "/timeline/example-post",
        region: "Victoria",
        title: "Example post",
      },
      "dev-visitor-firefox-melbourne",
      "Firefox on Linux"
    ),
    seedEvent(
      "dev-seed-5",
      minutesAgo(now, 12),
      {
        action: "listened",
        artist: "Ruston Kelly",
        artistUrl: "https://music.apple.com/artist/ruston-kelly",
        city: "Auckland",
        country: "NZ",
        countryCode: "NZ",
        latitude: -36.9,
        longitude: 174.8,
        path: "/",
        region: "Auckland",
        title: "Mockingbird",
        trackUrl: "https://music.apple.com/song/mockingbird",
      },
      "dev-visitor-iphone-auckland",
      "Safari on iOS"
    ),
    seedEvent(
      "dev-seed-6",
      minutesAgo(now, 15),
      {
        action: "viewed",
        city: "London",
        country: "GB",
        countryCode: "GB",
        latitude: 51.5,
        longitude: -0.1,
        path: "/projects",
        region: "England",
        title: "Projects",
      },
      "dev-visitor-edge-london",
      "Edge on Windows"
    ),
    seedEvent(
      "dev-seed-7",
      minutesAgo(now, 16),
      {
        action: "viewed",
        city: "London",
        country: "GB",
        countryCode: "GB",
        latitude: 51.5,
        longitude: -0.1,
        path: "/projects",
        region: "England",
        title: "Projects",
      },
      "dev-visitor-edge-london",
      "Edge on Windows"
    ),
    seedEvent(
      "dev-seed-8",
      minutesAgo(now, 22),
      {
        action: "watched",
        city: "Logan City",
        country: "AU",
        countryCode: "AU",
        latitude: -27.7,
        longitude: 153.1,
        path: "/video/example",
        region: "Queensland",
        title: "Example video",
      },
      "dev-visitor-chrome-logan",
      "Chrome on Android"
    ),
  ].filter((event): event is ActivityEvent => event !== null);
