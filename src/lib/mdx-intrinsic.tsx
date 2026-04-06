import * as React from "react";
import type { ReactNode } from "react";

import { sanitizeMdxHtmlProps } from "@/lib/sanitize-mdx-html-props";

/** Renders a native tag with MDX/HTML-safe props (kebab SVG attrs, string styles). */
export function createMdxIntrinsic(
  tag: keyof React.JSX.IntrinsicElements
): (
  props: Record<string, unknown> & { children?: ReactNode }
) => React.ReactElement {
  const MdxIntrinsic = ({
    children,
    ...rest
  }: Record<string, unknown> & { children?: ReactNode }) =>
    React.createElement(
      tag,
      sanitizeMdxHtmlProps(rest as Record<string, unknown>),
      children
    );
  MdxIntrinsic.displayName = `Mdx(${String(tag)})`;
  return MdxIntrinsic as (
    props: Record<string, unknown> & { children?: ReactNode }
  ) => React.ReactElement;
}
