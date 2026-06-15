"use client";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = ({
  className,
  htmlFor,
  ref,
  ...props
}: Omit<React.ComponentProps<"label">, "htmlFor"> &
  VariantProps<typeof labelVariants> & {
    htmlFor: string;
    ref?: React.RefObject<HTMLLabelElement | null>;
  }) => (
  <label
    className={cn(labelVariants(), className)}
    data-slot="label"
    htmlFor={htmlFor}
    ref={ref}
    {...props}
  />
);
Label.displayName = "Label";

export { Label };
