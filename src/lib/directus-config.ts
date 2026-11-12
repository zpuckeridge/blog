const DEFAULT_DIRECTUS_URL = "https://directus.obambulo.studio";

export const getDirectusUrl = (): string => {
  const configured =
    import.meta.env.DIRECTUS_URL ||
    (typeof process === "undefined" ? undefined : process.env.DIRECTUS_URL);
  return configured || DEFAULT_DIRECTUS_URL;
};

export const DIRECTUS_ORIGIN = new URL(getDirectusUrl()).origin;
