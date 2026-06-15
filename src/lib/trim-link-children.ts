import { Children, type ReactNode } from "react";

/** Trim whitespace from plain link labels. */
export const trimLinkLabel = (value: string): string => value.trim();

const isPrimitiveChild = (child: ReactNode): child is string | number =>
  typeof child === "string" || typeof child === "number";

/** Strip leading/trailing whitespace from link text without affecting inner spaces. */
export const trimLinkChildren = (children: ReactNode): ReactNode => {
  const parts = Children.toArray(children);
  if (parts.length === 0) {
    return children;
  }

  if (parts.every(isPrimitiveChild)) {
    return trimLinkLabel(parts.map(String).join(""));
  }

  const trimmed = parts
    .map((part, index) => {
      if (typeof part !== "string") {
        return part;
      }

      let value = part;
      if (index === 0) {
        value = value.replace(/^\s+/u, "");
      }
      if (index === parts.length - 1) {
        value = value.replace(/\s+$/u, "");
      }
      return value;
    })
    .filter((part) => typeof part !== "string" || part.length > 0);

  if (trimmed.length === 1) {
    return trimmed[0];
  }

  return trimmed;
};

/** Trim rendered Astro slot HTML down to plain link text. */
export const trimLinkSlotHtml = (html: string): string =>
  trimLinkLabel(html.replace(/<[^>]*>/gu, ""));
