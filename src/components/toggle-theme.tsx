"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function ToggleTheme() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Prevent hydration mismatch by only rendering after mount
	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	// Dont render anything until mounted to prevent hydration mismatch
	if (!mounted) {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger
						aria-label="Toggle Theme"
						className="text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-200 ease-in-out"
					>
						<MoonIcon className="w-3.5 h-3.5" />
					</TooltipTrigger>
					<TooltipContent
						side="bottom"
						className="text-xs bg-muted/60 dark:bg-neutral-900/60 backdrop-blur-sm text-black dark:text-muted-foreground"
					>
						Toggle Theme
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					onClick={toggleTheme}
					aria-label="Toggle Theme"
					className="text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-200 ease-in-out"
				>
					{theme === "dark" ? (
						<SunIcon className="w-3.5 h-3.5" />
					) : (
						<MoonIcon className="w-3.5 h-3.5" />
					)}
				</TooltipTrigger>
				<TooltipContent
					side="bottom"
					className="text-xs bg-muted/60 dark:bg-neutral-900/60 backdrop-blur-sm text-black dark:text-muted-foreground"
				>
					Toggle Theme
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
