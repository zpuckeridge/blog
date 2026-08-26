export const DEFAULT_POSTHOG_HOST = "https://us.i.posthog.com";

export interface PosthogEnvSource {
  NEXT_PUBLIC_POSTHOG_HOST?: string;
  NEXT_PUBLIC_POSTHOG_KEY?: string;
  PUBLIC_POSTHOG_HOST?: string;
  PUBLIC_POSTHOG_KEY?: string;
}

export interface PosthogClientConfig {
  apiHost: string;
  apiKey: string;
}

const firstNonEmpty = (...values: (string | undefined)[]): string => {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) {
      return trimmed;
    }
  }

  return "";
};

/**
 * Resolve the public PostHog client config from Astro/Vite env or Worker vars.
 * Accepts leftover Next.js `NEXT_PUBLIC_*` names from the pre-Astro migration.
 */
export const resolvePosthogClientConfig = (
  source: PosthogEnvSource
): PosthogClientConfig | null => {
  const apiKey = firstNonEmpty(
    source.PUBLIC_POSTHOG_KEY,
    source.NEXT_PUBLIC_POSTHOG_KEY
  );

  if (!apiKey) {
    return null;
  }

  return {
    apiHost: firstNonEmpty(
      source.PUBLIC_POSTHOG_HOST,
      source.NEXT_PUBLIC_POSTHOG_HOST,
      DEFAULT_POSTHOG_HOST
    ),
    apiKey,
  };
};
