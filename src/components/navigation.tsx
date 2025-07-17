"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "../lib/menuItems";

export default function Navigation() {
	const pathname = usePathname();

	return (
		<div className="flex justify-between items-center max-w-lg mx-auto gap-4 pt-6 lg:pt-20 px-6">
			<Link href="/">
				<Image
					src="/avatar.avif"
					alt="Zacchary Puckeridge"
					width={100}
					height={100}
					className="rounded w-6 h-6"
				/>
			</Link>

			<div className="flex flex-row gap-4 text-xs text-muted-foreground items-center justify-end">
				{menuItems.map((item) => {
					const isActive = pathname === item.href;

					return (
						<Link
							key={item.href}
							href={item.href}
							className={`underline transition inline-flex group ease-in-out ${
								isActive
									? "text-neutral-300 underline-offset-4 decoration-solid"
									: "underline-offset-2 decoration-dotted hover:decoration-solid hover:underline-offset-4"
							}`}
						>
							{item.label}
						</Link>
					);
				})}
			</div>
		</div>
	);
}
