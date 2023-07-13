"use client";

import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import { usePathname } from "next/navigation";
import DocumentOperations from "./document-operations";
import Link from "next/link";

export default function DocumentCard({ document }: any) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        buttonVariants({ variant: "outline" }),
        "h-8 w-full justify-between  rounded-none",
        pathname === `/article/${document.slug}` && "bg-secondary",
      )}
    >
      <Link
        className="flex w-full items-center"
        href={`/article/${document.slug}`}
      >
        <FileText className="mr-2 h-4 w-4" />
        <div className="w-52 overflow-hidden truncate text-ellipsis whitespace-nowrap">
          {document.title}
        </div>
      </Link>
      <DocumentOperations id={document.id} title={document.title} />
    </div>
  );
}
