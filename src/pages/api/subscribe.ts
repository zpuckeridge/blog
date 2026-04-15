import type { APIRoute } from "astro";
import { LoopsClient } from "loops";

import {
  enforceRateLimit,
  getRequestClientKey,
} from "@/lib/request-rate-limit";

const EMAIL_REGEX =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;
const JSON_HEADERS = { "Cache-Control": "no-store" };

const jsonWithHeaders = (body: unknown, init?: ResponseInit): Response =>
  Response.json(body, {
    ...init,
    headers: {
      ...init?.headers,
      ...JSON_HEADERS,
    },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const loopsApiKey =
    import.meta.env.LOOPS_API_KEY ?? process.env.LOOPS_API_KEY;
  if (!loopsApiKey) {
    return jsonWithHeaders(
      { error: "Subscribe is not configured" },
      { status: 503 }
    );
  }

  const rateLimit = enforceRateLimit({
    bucket: "subscribe",
    key: getRequestClientKey(request, clientAddress),
    limit: 5,
    windowMs: 1000 * 60 * 10,
  });
  if (rateLimit.limited) {
    return jsonWithHeaders(
      { error: "Too many subscribe attempts. Please try again later." },
      {
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
        status: 429,
      }
    );
  }

  const loops = new LoopsClient(loopsApiKey);

  try {
    const body = (await request.json()) as unknown;
    const email =
      typeof body === "object" &&
      body !== null &&
      "email" in body &&
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!email) {
      return jsonWithHeaders({ error: "Email is required" }, { status: 400 });
    }

    if (email.length > 254 || !EMAIL_REGEX.test(email)) {
      return jsonWithHeaders(
        { error: "Email address is invalid" },
        { status: 400 }
      );
    }

    await loops.createContact(email);

    return jsonWithHeaders({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to subscribe email", error);
    return jsonWithHeaders({ error: "Failed to subscribe" }, { status: 500 });
  }
};
