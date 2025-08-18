"use client";

import Link from "next/link";
import { useState } from "react";
import AnimatedGradientText from "@/src/components/animated-gradient-text";
import { Table, TableBody, TableCell, TableRow } from "@/src/components/ui/table";
import { projects } from "@/src/lib/projects";

export default function Projects() {
	const [isAnyProjectHovered, setIsAnyProjectHovered] = useState(false);

	/** biome-ignore lint/complexity/noExcessiveCognitiveComplexity: to be reviewed */
	const sortProjects = (a: (typeof projects)[0], b: (typeof projects)[0]) => {
		// First sort by WIP status
		if (a.status === "WIP" && b.status !== "WIP") {
			return -1;
		}
		if (a.status !== "WIP" && b.status === "WIP") {
			return 1;
		}

		// Then sort by Archived status
		if (a.status === "Archived" && b.status !== "Archived") {
			return 1;
		}
		if (a.status !== "Archived" && b.status === "Archived") {
			return -1;
		}

		// Then sort by year
		if (a.year === "Present" && b.year !== "Present") {
			return -1;
		}
		if (a.year !== "Present" && b.year === "Present") {
			return 1;
		}

		// For non-Present years, sort numerically
		if (a.year !== "Present" && b.year !== "Present") {
			const yearA = parseInt(a.year.split("-")[0], 10);
			const yearB = parseInt(b.year.split("-")[0], 10);
			return yearB - yearA;
		}

		return 0;
	};

	const sortedProjects = [...projects].sort(sortProjects);

	return (
		<div className="max-w-lg mx-auto flex flex-col gap-4 pt-4 pb-20 px-6">
			<div className="text-sm flex flex-col space-y-20">
				<div className="space-y-2">
					<p className="text-2xl font-semibold font-serif italic">Projects</p>

					<p>
						Here you&apos;ll find a list of projects I&apos;ve worked on. I eventually plan on
						having more detailed reports on each project.
					</p>
				</div>

				<div className="w-full">
					<Table className="">
						<TableBody>
							{/** biome-ignore lint/complexity/noExcessiveCognitiveComplexity: to be reviewed */}
							{sortedProjects.map((project, _index) => (
								<TableRow
									key={project.name}
									className={`group hover:bg-neutral-950 border-b border-dotted border-muted-foreground ${
										project.status === "Archived" ? "text-yellow-700 dark:text-yellow-600" : ""
									}`}
									onMouseEnter={() => setIsAnyProjectHovered(true)}
									onMouseLeave={() => setIsAnyProjectHovered(false)}
								>
									<TableCell>
										<p
											className={`text-sm transition-opacity whitespace-normal break-words ${
												isAnyProjectHovered ? "opacity-50 group-hover:opacity-100" : "opacity-100"
											}`}
										>
											{project.name}
										</p>
									</TableCell>
									<TableCell className="text-right whitespace-nowrap">
										<p
											className={`text-sm text-muted-foreground transition-opacity ${
												isAnyProjectHovered ? "opacity-50 group-hover:opacity-100" : "opacity-100"
											}`}
										>
											{project.year}
										</p>
									</TableCell>
									<TableCell className="text-right whitespace-nowrap">
										{project.link && !project.status && (
											<a
												href={project.link}
												target="_blank"
												className={`text-sm text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition ${
													isAnyProjectHovered ? "opacity-50 group-hover:opacity-100" : "opacity-100"
												}`}
											>
												Link
											</a>
										)}
										{project.status && (
											<span
												className={`text-sm text-muted-foreground gap-1 ${
													isAnyProjectHovered ? "opacity-50 group-hover:opacity-100" : "opacity-100"
												}`}
											>
												{project.status === "WIP" ? (
													<AnimatedGradientText text="WIP" />
												) : project.status === "Archived" && project.link ? (
													<a
														href={project.link}
														target="_blank"
														className="hover:text-blue-400 dark:hover:text-blue-600 transition"
													>
														Link
													</a>
												) : (
													"Archived"
												)}
											</span>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				<Link
					href="/"
					className="underline underline-offset-2 decoration-dotted hover:decoration-solid hover:underline-offset-4 transition inline-flex group ease-in-out text-xs text-muted-foreground w-fit"
				>
					../
				</Link>
			</div>
		</div>
	);
}
