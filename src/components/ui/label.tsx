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
  ref,
  ...props
}: React.ComponentProps<"label"> &
  VariantProps<typeof labelVariants> & {
    ref?: React.RefObject<HTMLLabelElement | null>;
  }) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control -- reusable label primitive; consumers set htmlFor or wrap controls
  <label
    className={cn(labelVariants(), className)}
    data-slot="label"
    ref={ref}
    {...props}
  />
);
Label.displayName = "Label";

export { Label };
