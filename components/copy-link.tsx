"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckIcon, Link2Icon } from "@radix-ui/react-icons";
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
            <CheckIcon className="w-4 h-4 my-auto text-muted-foreground" />
          ) : (
            <Link2Icon className="my-auto text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300" />
          )}
        </TooltipTrigger>
        <TooltipContent side="bottom">Copy Link</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
