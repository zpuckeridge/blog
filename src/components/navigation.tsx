"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "../lib/menu-items";

export default function Navigation() {
	const pathname = usePathname();

	return (
		<div className="mx-auto flex max-w-lg items-center justify-between gap-4 px-6 pt-6 lg:pt-20">
			<Link href="/">
				<Image
					alt="Zacchary Puckeridge"
					className="h-6 w-6 rounded"
					height={100}
					src="/avatar.avif"
					width={100}
				/>
			</Link>

			<div className="flex flex-row items-center justify-end gap-4 text-muted-foreground text-xs">
				{menuItems.map((item) => {
					const isActive = pathname === item.href || pathname.includes(item.href);

					return (
						<Link
							className={`group inline-flex underline transition ease-in-out ${
								isActive
									? "text-neutral-300 decoration-solid underline-offset-4"
									: "decoration-dotted underline-offset-2 hover:decoration-solid hover:underline-offset-4"
							}`}
							href={item.href}
							key={item.href}
						>
							{item.label}
						</Link>
					);
				})}
			</div>
		</div>
	);
}
