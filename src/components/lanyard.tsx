"use client";

import { useEffect, useState } from "react";
import { useLanyardWS } from "use-lanyard";

export default function Lanyard() {
	const DISCORD_ID = "181324210876973056";
	const data = useLanyardWS(DISCORD_ID);
	const [hasInitialized, setHasInitialized] = useState(false);
	const [isFullyLoaded, setIsFullyLoaded] = useState(false);

	useEffect(() => {
		// Set initialized after a brief delay to prevent flash
		const initTimer = setTimeout(() => setHasInitialized(true), 100);

		return () => clearTimeout(initTimer);
	}, []);

	useEffect(() => {
		if (!hasInitialized) {
			return;
		}

		if (data?.discord_status) {
			// Data is available, mark as fully loaded
			setIsFullyLoaded(true);
		}
	}, [data, hasInitialized]);

	const getStatusTextAndColor = () => {
		// Show offline status until fully loaded
		if (!isFullyLoaded || !data || !data.discord_status) {
			return { statusText: "Offline", dotColor: "bg-gray-400" };
		}

		const discordStatus = data.discord_status;
		let statusText: string;
		let dotColor: string;

		switch (discordStatus) {
			case "idle":
				statusText = "Idle";
				dotColor = "bg-yellow-300";
				break;
			case "online":
				statusText = "Online";
				dotColor = "bg-green-500";
				break;
			case "dnd":
				statusText = "Do Not Disturb";
				dotColor = "bg-red-500";
				break;
			default:
				statusText = "Offline";
				dotColor = "bg-gray-400";
				break;
		}

		return { statusText, dotColor };
	};

	const { statusText, dotColor } = getStatusTextAndColor();

	// Don't render anything initially or before initialization
	if (!hasInitialized) {
		return null;
	}

	return (
		<div className="flex gap-2 animate-in fade-in duration-200">
			<div
				className={`w-2 h-2 ${isFullyLoaded ? "animate-pulse" : ""} rounded-full my-auto ${dotColor}`}
			/>
			<p className="my-auto text-xs text-muted-foreground">{statusText}</p>
		</div>
	);
}
