import Link from "next/link";
import AnimatedGradientText from "@/src/components/animated-gradient-text";
import { Table, TableBody, TableCell, TableRow } from "@/src/components/ui/table";
import { getProjects } from "@/src/lib/directus-content";

export default async function Projects() {
	const projects = await getProjects();

	const sortProjects = (a: (typeof projects)[0], b: (typeof projects)[0]) => {
		// First sort by status (work_in_progress, then published, then archived)
		if (a.status === "work_in_progress" && b.status !== "work_in_progress") {
			return -1;
		}
		if (a.status !== "work_in_progress" && b.status === "work_in_progress") {
			return 1;
		}
		if (a.status === "archived" && b.status !== "archived") {
			return 1;
		}
		if (a.status !== "archived" && b.status === "archived") {
			return -1;
		}

		// Then sort by year completed (descending)
		if (a.year_completed && b.year_completed) {
			return b.year_completed - a.year_completed;
		}
		if (a.year_completed && !b.year_completed) {
			return -1;
		}
		if (!a.year_completed && b.year_completed) {
			return 1;
		}

		// Finally sort by date created (descending)
		return new Date(b.date_created).getTime() - new Date(a.date_created).getTime();
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
					{sortedProjects.length > 0 ? (
						<Table className="">
							<TableBody>
								{/** biome-ignore lint/complexity/noExcessiveCognitiveComplexity: to be reviewed */}
								{sortedProjects.map((project) => (
									<TableRow
										key={project.id}
										className={`group hover:bg-neutral-950 border-b border-dotted border-muted-foreground ${
											project.status === "archived" ? "text-yellow-700 dark:text-yellow-600" : ""
										}`}
									>
										<TableCell>
											<p className="text-sm transition-opacity whitespace-normal break-words opacity-100 group-hover:opacity-100">
												{project.name}
											</p>
										</TableCell>
										<TableCell className="text-right whitespace-nowrap">
											<p className="text-sm text-muted-foreground transition-opacity opacity-100 group-hover:opacity-100">
												{project.status === "work_in_progress"
													? "Present"
													: project.year_completed || "Present"}
											</p>
										</TableCell>
										<TableCell className="text-right whitespace-nowrap">
											{project.status === "archived" ? (
												<span className="text-sm text-muted-foreground">Archived</span>
											) : project.status === "work_in_progress" ? (
												<AnimatedGradientText text="WIP" />
											) : project.link ? (
												<a
													href={project.link}
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition opacity-100 group-hover:opacity-100"
												>
													Link
												</a>
											) : null}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<div className="text-center py-8">
							<p className="text-muted-foreground">No projects found.</p>
						</div>
					)}
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
