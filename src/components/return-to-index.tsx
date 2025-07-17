"use client";

import { ArrowLeftIcon, ChevronLeftIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"; // {{ edit_1 }}
import Link from "next/link";
import { usePathname } from "next/navigation"; // {{ edit_1 }}
import { useTheme } from "next-themes"; // {{ edit_1 }}
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/src/components/ui/tooltip";

export default function ReturnToIndex() {
	const pathname = usePathname(); // {{ edit_2 }}
	const { theme, setTheme } = useTheme(); // {{ edit_2 }}

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<div className="flex flex-col lg:w-1/3 max-w-sm lg:sticky top-0">
			<div className="lg:sticky top-8 space-y-6">
				<div className="space-y-2">
					<div className="flex gap-2 justify-between text-sm whitespace-nowrap">
						{pathname !== "/" ? ( // {{ edit_3 }}
							<Link
								href="/"
								className="text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600  flex items-center gap-1 group transition-all duration-200 ease-in-out"
							>
								<div className="relative w-4 h-4">
									<ChevronLeftIcon className="absolute inset-0 w-4 h-4 transition-opacity duration-200 opacity-100 group-hover:opacity-0 -translate-x-0.5 ease-in-out" />
									<ArrowLeftIcon className="absolute inset-0 w-4 h-4 transition-all duration-200 opacity-0 group-hover:opacity-100 ease-in-out" />
								</div>
								<span className="transition-all duration-200">Index</span>
							</Link>
						) : (
							<div className="flex gap-6 items-center">
								<Link
									href="/"
									className="text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-200 ease-in-out "
								>
									Zacchary Puckeridge
								</Link>

								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger
											onClick={toggleTheme}
											aria-label="Toggle Theme"
											className="text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-200 ease-in-out"
										>
											{theme === "dark" ? (
												<SunIcon className="w-4 h-4" />
											) : (
												<MoonIcon className="w-4 h-4" />
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
