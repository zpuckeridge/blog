"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, MoreHorizontal, X } from "lucide-react";
import ManageArticle from "@/components/manage-article";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export type Posts = {
  id: string;
  title: string;
  slug: string;
  views: number;
  published: boolean;
  tag: string;
  createdAt: Date;
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
    cell: ({ row }) => {
      const published = row.original.published;

      return (
        <div className="flex justify-center">
          {published ? (
            <Check className="w-4 h-4" />
          ) : (
            <X className="w-4 h-4" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "views",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Views
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      const formattedDate = format(new Date(date), "dd-MM-yyyy");

      return (
        <div className="flex items-center">
          <span>{formattedDate}</span>
        </div>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      const title = row.original.title;
      const slug = row.original.slug;

      return <ManageArticle id={id} title={title} slug={slug} />;
    },
  },
];
