import { Children, type ReactNode } from "react";

/** Strip leading/trailing whitespace from link text without affecting inner spaces. */
export const trimLinkChildren = (children: ReactNode): ReactNode => {
  const parts = Children.toArray(children);
  if (parts.length === 0) {
    return children;
  }

  return parts.map((part, index) => {
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
  });
};
