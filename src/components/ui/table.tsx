"use client";

import type * as React from "react";

import { cn } from "@/lib/utils";

const Table = ({ className, ...props }: React.ComponentProps<"table">) => (
  <div className="relative w-full overflow-x-auto" data-slot="table-container">
    <table
      className={cn("w-full caption-bottom text-sm", className)}
      data-slot="table"
      {...props}
    />
  </div>
);

const TableBody = ({ className, ...props }: React.ComponentProps<"tbody">) => (
  <tbody
    className={cn("[&_tr:last-child]:border-0", className)}
    data-slot="table-body"
    {...props}
  />
);

const TableRow = ({ className, ...props }: React.ComponentProps<"tr">) => (
  <tr
    className={cn(
      "border-b transition-colors data-[state=selected]:bg-muted",
      className
    )}
    data-slot="table-row"
    {...props}
  />
);

const TableCell = ({ className, ...props }: React.ComponentProps<"td">) => (
  <td
    className={cn(
      "whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    data-slot="table-cell"
    {...props}
  />
);

export { Table, TableBody, TableRow, TableCell };
