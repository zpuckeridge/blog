/// <reference types="astro/client" />

import type { ActivityFeedStoreNamespace } from "@/lib/activity-feed-store";

declare global {
  interface Document {
    /** Speculative Rules prerender flag. Not in the TypeScript DOM lib yet. */
    prerendering?: boolean;
  }

  interface SiteKv {
    get: (key: string) => Promise<string | null>;
    put: (key: string, value: string) => Promise<void>;
  }

  interface DurableObjectSqlResult<Row> {
    toArray: () => Row[];
  }

  interface DurableObjectSqlStorage {
    exec: <Row = unknown>(
      query: string,
      ...bindings: unknown[]
    ) => DurableObjectSqlResult<Row>;
  }

  interface DurableObjectState {
    storage: {
      sql: DurableObjectSqlStorage;
    };
  }

  namespace Cloudflare {
    interface Env {
      /** Set via Wrangler secret, `vars`, or `.dev.vars` for local dev. */
      VIDEO_PASSWORD?: string;
      /** Read-only Directus token. Used server-side by the /img proxy; never sent to browsers. */
      DIRECTUS_TOKEN?: string;
      /** GitHub PAT with `read:user` for the contributions API. Same sources as `VIDEO_PASSWORD`. */
      GITHUB_TOKEN?: string;
      /** Loops.so API key for POST /api/subscribe. */
      LOOPS_API_KEY?: string;
      /** Bearer token for POST /api/location (iOS Shortcuts webhook). */
      LOCATION_WEBHOOK_SECRET?: string;
      /** Bearer token for POST /api/rhythms. Falls back to LOCATION_WEBHOOK_SECRET when unset. */
      RHYTHMS_WEBHOOK_SECRET?: string;
      /** Apple Music API team id for developer token signing. */
      APPLE_MUSIC_TEAM_ID?: string;
      /** Apple Music API key id for developer token signing. */
      APPLE_MUSIC_KEY_ID?: string;
      /** Apple Music API private key (.p8 PEM contents). */
      APPLE_MUSIC_PRIVATE_KEY?: string;
      /** Optional dev-only Music User Token (production uses KV from /music/connect). */
      APPLE_MUSIC_USER_TOKEN?: string;
      /** Bearer token for POST /api/apple-music/connect. */
      APPLE_MUSIC_CONNECT_SECRET?: string;
      /** KV namespace for location status, listening recents, and listening history. */
      LOCATION_KV?: SiteKv;
      /** SQLite-backed Durable Object containing the public activity feed. */
      ACTIVITY_FEED_STORE?: ActivityFeedStoreNamespace;
    }
  }

  interface ImportMetaEnv {
    readonly DIRECTUS_URL?: string;
    readonly DIRECTUS_TOKEN?: string;
    readonly PUBLIC_SITE_URL?: string;
    readonly GITHUB_TOKEN?: string;
    readonly LOCATION_WEBHOOK_SECRET?: string;
    readonly RHYTHMS_WEBHOOK_SECRET?: string;
    readonly APPLE_MUSIC_TEAM_ID?: string;
    readonly APPLE_MUSIC_KEY_ID?: string;
    readonly APPLE_MUSIC_PRIVATE_KEY?: string;
    readonly APPLE_MUSIC_USER_TOKEN?: string;
    readonly APPLE_MUSIC_CONNECT_SECRET?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

declare module "@mux/mux-player";
