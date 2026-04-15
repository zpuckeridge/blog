interface RateLimitRecord {
  count: number;
  resetAt: number;
}

interface RateLimitOptions {
  bucket: string;
  key: string;
  limit: number;
  windowMs: number;
}

const rateLimitStore =
  (
    globalThis as typeof globalThis & {
      __blogRateLimitStore?: Map<string, RateLimitRecord>;
    }
  ).__blogRateLimitStore ?? new Map<string, RateLimitRecord>();

(
  globalThis as typeof globalThis & {
    __blogRateLimitStore?: Map<string, RateLimitRecord>;
  }
).__blogRateLimitStore = rateLimitStore;

export const getRequestClientKey = (
  request: Request,
  clientAddress?: string
): string => {
  const forwardedIp = request.headers.get("cf-connecting-ip");
  if (forwardedIp) {
    return forwardedIp;
  }

  const proxiedIp = request.headers.get("x-forwarded-for");
  if (proxiedIp) {
    return proxiedIp.split(",")[0]?.trim() || "anonymous";
  }

  return clientAddress || "anonymous";
};

export const enforceRateLimit = ({
  bucket,
  key,
  limit,
  windowMs,
}: RateLimitOptions): { limited: boolean; retryAfterSeconds: number } => {
  const now = Date.now();
  const storeKey = `${bucket}:${key}`;
  const existing = rateLimitStore.get(storeKey);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(storeKey, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      limited: false,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (existing.count >= limit) {
    return {
      limited: true,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1000)
      ),
    };
  }

  existing.count += 1;
  rateLimitStore.set(storeKey, existing);

  return {
    limited: false,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
};
