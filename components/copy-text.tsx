"use client";

import { useToast } from "@/components/ui/use-toast";
import { CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function CopyText({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const { toast } = useToast();

  const handleClick = () => {
    navigator.clipboard.writeText(text);

    toast({
      title: "Text Copied!",
      description: "The post text has been copied to your clipboard.",
    });

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleClick}
      className="text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300 flex gap-2 w-auto"
    >
      <CopyIcon className="w-4 h-4" /> {copied ? "Copied!" : "Copy Text"}
    </button>
  );
}
