"use client";

import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
				<TooltipTrigger aria-label="Copy Link" className="cursor-pointer" onClick={handleClick}>
					{copied ? (
						<CheckIcon className="fade-in-0 zoom-in-95 my-auto animate-in text-green-500 duration-200" />
					) : (
						<CopyIcon className="fade-in-0 zoom-in-95 my-auto animate-in text-muted-foreground transition-all duration-200 hover:text-blue-400 dark:hover:text-blue-600" />
					)}
				</TooltipTrigger>
				<TooltipContent
					className="bg-muted/60 text-black text-xs backdrop-blur-sm dark:bg-neutral-900/60 dark:text-muted-foreground"
					side="bottom"
				>
					Copy Link
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
