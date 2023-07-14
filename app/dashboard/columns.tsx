"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import DocumentOperations from "@/components/document-operations";
import { Button } from "@/components/ui/button";

export type Posts = {
  id: string;
  title: string;
  published: boolean;
  tag: string;
};

export const columns: ColumnDef<Posts>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "tag",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tag
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "published",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const title = row.original.title;
      const id = row.original.id;

      return <DocumentOperations id={id} title={title} />;
    },
  },
];
