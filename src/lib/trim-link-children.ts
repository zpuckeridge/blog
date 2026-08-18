import type { ReactNode } from "react";

/** Trim whitespace from plain link labels. */
export const trimLinkLabel = (value: string): string => value.trim();

const isPrimitiveChild = (child: ReactNode): child is string | number =>
  typeof child === "string" || typeof child === "number";

const normalizeChildren = (children: ReactNode): ReactNode[] => {
  if (
    children === null ||
    children === undefined ||
    typeof children === "boolean"
  ) {
    return [];
  }

  if (Array.isArray(children)) {
    return children;
  }

  return [children];
};

/** Strip leading/trailing whitespace from link text without affecting inner spaces. */
export const trimLinkChildren = (children: ReactNode): ReactNode => {
  const parts = normalizeChildren(children);
  if (parts.length === 0) {
    return children;
  }

  if (parts.every(isPrimitiveChild)) {
    return trimLinkLabel(parts.map(String).join(""));
  }

  const trimmed: ReactNode[] = [];
  const lastIndex = parts.length - 1;

  for (const [index, part] of parts.entries()) {
    if (typeof part !== "string") {
      trimmed.push(part);
      continue;
    }

    let value = part;
    if (index === 0) {
      value = value.replace(/^\s+/u, "");
    }
    if (index === lastIndex) {
      value = value.replace(/\s+$/u, "");
    }
    if (value.length > 0) {
      trimmed.push(value);
    }
  }

  if (trimmed.length === 1) {
    return trimmed[0];
  }

  return trimmed;
};

/** Trim rendered Astro slot HTML down to plain link text. */
export const trimLinkSlotHtml = (html: string): string =>
  trimLinkLabel(html.replaceAll(/<[^>]*>/gu, ""));
