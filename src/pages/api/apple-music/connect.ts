import type { APIRoute } from "astro";

import {
  resolveAppleMusicConnectSecret,
  verifyAppleMusicConnectBearer,
} from "@/lib/apple-music-connect-secret";
import { APPLE_MUSIC_USER_TOKEN_KV_KEY } from "@/lib/apple-music-kv";
import { jsonNoStore } from "@/lib/json-response";
import {
  enforceRateLimit,
  getRequestClientKey,
} from "@/lib/request-rate-limit";
import { workersEnv } from "@/lib/workers-env";

const readMusicUserToken = (body: unknown): string | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const token = (body as Record<string, unknown>).musicUserToken;
  if (typeof token !== "string" || token.trim().length === 0) {
    return null;
  }

  return token.trim();
};

export const POST: APIRoute = async ({ request }) => {
  const secret = resolveAppleMusicConnectSecret(workersEnv);
  const kv = workersEnv.LOCATION_KV;

  if (!secret || !kv) {
    return jsonNoStore(
      { error: "Apple Music connect is not configured" },
      { status: 503 }
    );
  }

  const authorization = request.headers.get("Authorization");
  if (!verifyAppleMusicConnectBearer(authorization, secret)) {
    return jsonNoStore({ error: "Unauthorized" }, { status: 401 });
  }

  const rateLimit = enforceRateLimit({
    bucket: "apple-music-connect",
    key: getRequestClientKey(request),
    limit: 30,
    windowMs: 1000 * 60,
  });

  if (rateLimit.limited) {
    return jsonNoStore(
      { error: "Too many connect attempts. Please try again later." },
      {
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
        status: 429,
      }
    );
  }

  try {
    const body: unknown = await request.json();
    const musicUserToken = readMusicUserToken(body);
    if (!musicUserToken) {
      return jsonNoStore(
        { error: "musicUserToken is required" },
        { status: 400 }
      );
    }

    await kv.put(APPLE_MUSIC_USER_TOKEN_KV_KEY, musicUserToken);
    return jsonNoStore({ success: true });
  } catch (error) {
    console.error("Failed to store Apple Music user token", error);
    return jsonNoStore({ error: "Failed to store token" }, { status: 500 });
  }
};
