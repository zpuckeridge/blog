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
      className="text-muted-foreground hover:text-black transition flex gap-2 w-auto"
    >
      <CopyIcon className="w-4 h-4" /> Copy Text
    </button>
  );
}
