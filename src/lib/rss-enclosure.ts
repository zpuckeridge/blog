const escapeXml = (unsafe: string): string =>
  unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const readContentLength = (header: string | null): number => {
  const length = Number(header);
  if (!Number.isFinite(length) || length <= 0) {
    return 0;
  }
  return Math.round(length);
};

export const enclosureLength = (filesize: unknown): number => {
  const length = typeof filesize === "number" ? filesize : Number(filesize);
  if (!Number.isFinite(length) || length <= 0) {
    return 0;
  }
  return Math.round(length);
};

export const enclosureType = (type: string | null | undefined): string =>
  type?.startsWith("image/") ? type : "image/jpeg";

export const buildEnclosureTag = ({
  length,
  type,
  url,
}: {
  length: number;
  type?: string | null;
  url: string;
}): string =>
  `<enclosure url="${escapeXml(url)}" length="${enclosureLength(length)}" type="${escapeXml(enclosureType(type))}" />`;
