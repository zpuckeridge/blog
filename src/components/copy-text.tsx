"use client";

import { useCallback, useState } from "react";
import { RxCopy } from "react-icons/rx";
import { toast } from "sonner";

export default function CopyText({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copyArticleText = useCallback(() => {
    navigator.clipboard.writeText(text);

    toast.success("Text Copied!");

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [text]);

  return (
    <button
      className="flex w-auto cursor-pointer gap-2 text-muted-foreground transition-all duration-200 hover:text-blue-400 dark:hover:text-blue-600"
      onClick={copyArticleText}
      type="button"
    >
      <RxCopy className="size-4" /> {copied ? "Copied!" : "Copy Text"}
    </button>
  );
}
