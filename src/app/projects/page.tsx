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
		<div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pt-4 pb-20">
			<div className="flex flex-col space-y-20 text-sm">
				<div className="space-y-2">
					<p className="font-redaction text-white text-xl">Projects</p>

					<p>
						Here you&apos;ll find a list of projects I&apos;ve worked on. I eventually plan on
						having more detailed reports on each project.
					</p>
				</div>

				<div className="w-full">
					{sortedProjects.length > 0 ? (
						<Table className="">
							<TableBody>
								{sortedProjects.map((project) => (
									<TableRow
										className={`group border-muted-foreground border-b border-dotted hover:bg-neutral-950 ${
											project.status === "archived" ? "text-yellow-700 dark:text-yellow-600" : ""
										}`}
										key={project.id}
									>
										<TableCell>
											<p className="whitespace-normal break-words text-sm opacity-100 transition-opacity group-hover:opacity-100">
												{project.name}
											</p>
										</TableCell>
										<TableCell className="whitespace-nowrap text-right">
											<p className="text-muted-foreground text-sm opacity-100 transition-opacity group-hover:opacity-100">
												{project.status === "work_in_progress"
													? "Present"
													: project.year_completed || "Present"}
											</p>
										</TableCell>
										<TableCell className="whitespace-nowrap text-right">
											{(() => {
												if (project.status === "archived") {
													return <span className="text-muted-foreground text-sm">Archived</span>;
												}
												if (project.status === "work_in_progress") {
													return <AnimatedGradientText text="WIP" />;
												}
												if (project.link) {
													return (
														<a
															className="text-muted-foreground text-sm opacity-100 transition hover:text-blue-400 group-hover:opacity-100 dark:hover:text-blue-600"
															href={project.link}
															rel="noopener noreferrer"
															target="_blank"
														>
															Link
														</a>
													);
												}
												return null;
											})()}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<div className="py-8 text-center">
							<p className="text-muted-foreground">No projects found.</p>
						</div>
					)}
				</div>

				<Link
					className="group inline-flex w-fit text-muted-foreground text-xs underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
					href="/"
				>
					../
				</Link>
			</div>
		</div>
	);
}
