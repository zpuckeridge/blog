"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

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
    <button onClick={handleClick}>
      {copied ? (
        <div className="inline-flex">
          <CheckIcon className="w-4 h-4 my-auto text-muted-foreground" />
        </div>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CopyIcon className="w-4 h-4 my-auto text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy URL</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </button>
  );
}
