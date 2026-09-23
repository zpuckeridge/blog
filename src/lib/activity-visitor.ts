import { ACTIVITY_RETENTION_MS } from "@/lib/activity-feed";

const ACTIVITY_VISITOR_STORAGE_KEY = "activity:visitor";

interface StoredActivityVisitor {
  createdAt: number;
  id: string;
}

const isStoredActivityVisitor = (
  value: unknown
): value is StoredActivityVisitor =>
  typeof value === "object" &&
  value !== null &&
  "createdAt" in value &&
  typeof value.createdAt === "number" &&
  "id" in value &&
  typeof value.id === "string" &&
  value.id.length > 0;

export const getActivityVisitorId = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(ACTIVITY_VISITOR_STORAGE_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (
        isStoredActivityVisitor(parsed) &&
        Date.now() - parsed.createdAt < ACTIVITY_RETENTION_MS
      ) {
        return parsed.id;
      }
    }

    const visitor = {
      createdAt: Date.now(),
      id: crypto.randomUUID(),
    };
    window.localStorage.setItem(
      ACTIVITY_VISITOR_STORAGE_KEY,
      JSON.stringify(visitor)
    );
    return visitor.id;
  } catch {
    return null;
  }
};
