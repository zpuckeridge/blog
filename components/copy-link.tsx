"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { CheckIcon, Link2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function CopyLink() {
  const [copied, setCopied] = useState(false);

  const { toast } = useToast();

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);

    toast({
      title: "URL Copied!",
      description: "The page URL has been copied to your clipboard.",
    });

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={handleClick} aria-label="Copy Link">
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
