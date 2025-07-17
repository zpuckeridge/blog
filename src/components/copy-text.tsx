"use client";

import { CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
export default function CopyText({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);

	const handleClick = () => {
		navigator.clipboard.writeText(text);

		toast.success("Text Copied!");

		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300 flex gap-2 w-auto cursor-pointer"
		>
			<CopyIcon className="w-4 h-4" /> {copied ? "Copied!" : "Copy Text"}
		</button>
	);
}
