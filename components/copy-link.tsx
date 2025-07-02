"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";

export default function CopyLink() {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);

    toast.success("URL Copied!");

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={handleClick}
          aria-label="Copy Link"
          className="cursor-pointer"
        >
          {copied ? (
            <CheckIcon className="my-auto text-green-500 animate-in fade-in-0 zoom-in-95 duration-300" />
          ) : (
            <CopyIcon className="my-auto text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition-all animate-in fade-in-0 zoom-in-95 duration-300" />
          )}
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="text-xs bg-neutral-900 text-muted-foreground"
        >
          Copy Link
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
