"use client";

import { ArrowLeftIcon, ChevronLeftIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"; // {{ edit_1 }}
import Link from "next/link";
import { usePathname } from "next/navigation"; // {{ edit_1 }}
import { useTheme } from "next-themes"; // {{ edit_1 }}
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ReturnToIndex() {
	const pathname = usePathname(); // {{ edit_2 }}
	const { theme, setTheme } = useTheme(); // {{ edit_2 }}

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<div className="top-0 flex max-w-sm flex-col lg:sticky lg:w-1/3">
			<div className="top-8 space-y-6 lg:sticky">
				<div className="space-y-2">
					<div className="flex justify-between gap-2 whitespace-nowrap text-sm">
						{pathname !== "/" ? ( // {{ edit_3 }}
							<Link
								className="group flex items-center gap-1 text-muted-foreground transition-all duration-200 ease-in-out hover:text-blue-400 dark:hover:text-blue-600"
								href="/"
							>
								<div className="relative h-4 w-4">
									<ChevronLeftIcon className="-translate-x-0.5 absolute inset-0 h-4 w-4 opacity-100 transition-opacity duration-200 ease-in-out group-hover:opacity-0" />
									<ArrowLeftIcon className="absolute inset-0 h-4 w-4 opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100" />
								</div>
								<span className="transition-all duration-200">Index</span>
							</Link>
						) : (
							<div className="flex items-center gap-6">
								<Link
									className="text-muted-foreground transition-all duration-200 ease-in-out hover:text-blue-400 dark:hover:text-blue-600"
									href="/"
								>
									Zacchary Puckeridge
								</Link>

								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger
											aria-label="Toggle Theme"
											className="text-muted-foreground transition-all duration-200 ease-in-out hover:text-blue-400 dark:hover:text-blue-600"
											onClick={toggleTheme}
										>
											{theme === "dark" ? (
												<SunIcon className="h-4 w-4" />
											) : (
												<MoonIcon className="h-4 w-4" />
											)}
										</TooltipTrigger>
										<TooltipContent side="bottom">Toggle Theme</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
