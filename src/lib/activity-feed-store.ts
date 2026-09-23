import { DurableObject } from "cloudflare:workers";

import {
  ACTIVITY_MAX_EVENTS,
  ACTIVITY_MAX_VISITORS,
  ACTIVITY_RETENTION_MS,
  createActivityEvent,
} from "@/lib/activity-feed";
import type {
  ActivityCaptureInput,
  ActivityEvent,
  ActivityEventAction,
} from "@/lib/activity-feed";

export interface ActivityFeedStoreRpc {
  append: (
    input: ActivityCaptureInput,
    id: string,
    visitorId?: string | null
  ) => Promise<ActivityEvent | null>;
  list: () => Promise<ActivityEvent[]>;
}

export interface ActivityFeedStoreNamespace {
  getByName: (name: string) => ActivityFeedStoreRpc;
}

interface ActivityEventRow {
  action: ActivityEventAction;
  artist: string | null;
  artist_url: string | null;
  city: string | null;
  country: string | null;
  country_code: string | null;
  id: string;
  latitude: number | null;
  longitude: number | null;
  occurred_at: number;
  path: string;
  region: string | null;
  track_url: string | null;
  title: string;
}

const encoder = new TextEncoder();

const hashVisitorId = async (
  visitorId: string | null | undefined
): Promise<string | null> => {
  if (!visitorId || visitorId.length > 200) {
    return null;
  }

  const digest = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(visitorId)
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
};

const toActivityEvent = (row: ActivityEventRow): ActivityEvent => ({
  action: row.action,
  artist: row.artist,
  artistUrl: row.artist_url,
  city: row.city,
  country: row.country,
  countryCode: row.country_code,
  id: row.id,
  latitude: row.latitude,
  longitude: row.longitude,
  occurredAt: new Date(row.occurred_at).toISOString(),
  path: row.path,
  region: row.region,
  title: row.title,
  trackUrl: row.track_url,
});

export class ActivityFeedStore
  extends DurableObject<Cloudflare.Env>
  implements ActivityFeedStoreRpc
{
  constructor(ctx: DurableObjectState, env: Cloudflare.Env) {
    super(ctx, env);
    this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS activity_events (
        id TEXT PRIMARY KEY,
        action TEXT NOT NULL DEFAULT 'viewed',
        artist TEXT,
        artist_url TEXT,
        occurred_at INTEGER NOT NULL,
        path TEXT NOT NULL,
        title TEXT NOT NULL,
        city TEXT,
        region TEXT,
        country TEXT,
        country_code TEXT,
        latitude REAL,
        longitude REAL,
        track_url TEXT,
        visitor_key TEXT
      );
      CREATE INDEX IF NOT EXISTS activity_events_occurred_at
        ON activity_events (occurred_at DESC);
    `);
    try {
      this.ctx.storage.sql.exec(
        "ALTER TABLE activity_events ADD COLUMN action TEXT NOT NULL DEFAULT 'viewed'"
      );
    } catch {
      // Existing SQLite databases already have the action column.
    }
    for (const column of ["artist", "artist_url", "track_url", "visitor_key"]) {
      try {
        this.ctx.storage.sql.exec(
          `ALTER TABLE activity_events ADD COLUMN ${column} TEXT`
        );
      } catch {
        // Existing SQLite databases already have this column.
      }
    }
    this.ctx.storage.sql.exec(
      "DROP INDEX IF EXISTS activity_events_visitor_key"
    );
  }

  async append(
    input: ActivityCaptureInput,
    id: string,
    visitorId?: string | null
  ): Promise<ActivityEvent | null> {
    const event = createActivityEvent(input, id);
    if (!event) {
      return null;
    }

    const occurredAt = Date.parse(event.occurredAt);
    const visitorKey = await hashVisitorId(visitorId ?? input.visitorId);
    if (!visitorKey) {
      return null;
    }
    this.ctx.storage.sql.exec(
      `INSERT OR IGNORE INTO activity_events
        (id, action, artist, artist_url, occurred_at, path, title, city, region, country, country_code, latitude, longitude, track_url, visitor_key)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      event.id,
      event.action,
      event.artist,
      event.artistUrl,
      occurredAt,
      event.path,
      event.title,
      event.city,
      event.region,
      event.country,
      event.countryCode,
      event.latitude,
      event.longitude,
      event.trackUrl,
      visitorKey
    );
    this.prune(occurredAt);

    return event;
  }

  list(): Promise<ActivityEvent[]> {
    const cutoff = Date.now() - ACTIVITY_RETENTION_MS;
    const rows = this.ctx.storage.sql
      .exec<ActivityEventRow>(
        `SELECT id, action, artist, artist_url, occurred_at, path, title, city,
          region, country, country_code, latitude, longitude, track_url
         FROM activity_events
         WHERE occurred_at >= ?
         ORDER BY occurred_at DESC
         LIMIT ?`,
        cutoff,
        ACTIVITY_MAX_EVENTS
      )
      .toArray();

    return Promise.resolve(rows.map(toActivityEvent));
  }

  private prune(now: number): void {
    this.ctx.storage.sql.exec(
      "DELETE FROM activity_events WHERE occurred_at < ?",
      now - ACTIVITY_RETENTION_MS
    );
    this.ctx.storage.sql.exec(
      `DELETE FROM activity_events
       WHERE visitor_key NOT IN (
         SELECT visitor_key FROM activity_events
         WHERE visitor_key IS NOT NULL
         GROUP BY visitor_key
         ORDER BY MAX(occurred_at) DESC
         LIMIT ?
       )`,
      ACTIVITY_MAX_VISITORS
    );
    this.ctx.storage.sql.exec(
      `DELETE FROM activity_events
       WHERE id NOT IN (
         SELECT id FROM activity_events
         ORDER BY occurred_at DESC
         LIMIT ?
       )`,
      ACTIVITY_MAX_EVENTS
    );
  }
}
