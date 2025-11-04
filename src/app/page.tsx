import { compareDesc } from "date-fns";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import Lanyard from "@/components/lanyard";
import LinkWithIcon from "@/components/link-with-icon";
import type { Post } from "@/interfaces/content-item";
import { getPosts, getProjects } from "@/lib/directus-content";
import GitHubContributions from "../components/contributions-graph";
import { ToggleTheme } from "../components/toggle-theme";

// Get current Brisbane time and date
const now = new Date();
const brisbaneTime = new Intl.DateTimeFormat("en-US", {
	timeZone: "Australia/Brisbane",
	timeStyle: "short",
	hour12: true,
}).format(now);

const brisbaneDate = new Intl.DateTimeFormat("en-US", {
	timeZone: "Australia/Brisbane",
	month: "short",
	day: "numeric",
	year: "numeric",
}).format(now);

export default async function Home() {
	const [posts, projects] = await Promise.all([getPosts(), getProjects()]);

	const sortedPosts = posts.sort((a, b) =>
		compareDesc(new Date(a.date_created), new Date(b.date_created))
	);

	return (
		<div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pt-4 pb-20">
			<div className="space-y-20">
				<div className="space-y-4">
					<div className="space-y-2 text-sm">
						<p className="font-redaction text-white text-xl">Zacchary Puckeridge</p>
						<div>
							<p>Self-taught Web Developer & Generalist</p>
							<p>Based in Brisbane, Australia</p>
						</div>
					</div>

					<div className="flex flex-col gap-4 md:flex-row md:justify-between">
						<div className="flex flex-row gap-4 text-muted-foreground text-xs">
							<LinkWithIcon href="https://x.com/zpuckeridge/">X</LinkWithIcon>
							<LinkWithIcon href="https://www.facebook.com/zpuckeridge/">Facebook</LinkWithIcon>
							<LinkWithIcon href="https://www.instagram.com/zpuckeridge/">Instagram</LinkWithIcon>
							<LinkWithIcon href="https://www.linkedin.com/in/zpuckeridge/">LinkedIn</LinkWithIcon>
							<LinkWithIcon href="https://github.com/zpuckeridge">GitHub</LinkWithIcon>
						</div>

						<div>
							<p className="text-nowrap text-muted-foreground text-xs">
								&copy; {new Date().getFullYear()} Zacchary Puckeridge
							</p>
						</div>
					</div>
				</div>

				<div className="space-y-10">
					<div className="flex flex-row gap-4">
						<div className="w-20">
							<p className="text-muted-foreground text-xs">Now</p>
						</div>

						<div className="w-full space-y-2">
							<p className="text-sm">
								IT Operations Lead for{" "}
								<LinkWithIcon href="https://www.starcompass.com.au">Star Compass</LinkWithIcon>, a
								disability support service and{" "}
								<LinkWithIcon href="https://www.haddoninstitute.org">Haddon Institute</LinkWithIcon>
								, a distinctly Reformed seminary.
							</p>
							<p className="text-sm">
								I also run a web design studio known as{" "}
								<LinkWithIcon href="https://obambulo.studio">obambulo studio</LinkWithIcon>. I have
								limited availability, but I am open to hearing about your project!
							</p>
						</div>
					</div>
					<div className="flex flex-row gap-4">
						<div className="w-20">
							<p className="text-muted-foreground text-xs">Prev</p>
						</div>

						<div className="w-full space-y-2">
							<p className="text-sm">
								Previously, I was working for{" "}
								<LinkWithIcon href="https://www.rsp.com.au">Rising Sun Pictures</LinkWithIcon> (2022{" "}
								<MoveRight className="inline-flex h-4 w-4" /> 2024) as an IT Administrator to deploy
								and maintain the remote Brisbane office infrastructure.
							</p>

							<p className="text-sm">
								Prior to that, I worked for{" "}
								<LinkWithIcon href="https://www.pixelzoo.com.au">Pixel Zoo</LinkWithIcon> (2021{" "}
								<MoveRight className="inline-flex h-4 w-4" /> 2022) as a Systems Administrator to
								provide internal and remote support for ~200+ employees. Deployed various networking
								and hardware upgrades across the studio and implemented new file storage
								infrastructure.
							</p>

							<p className="text-muted-foreground text-xs">
								You can find my full employment history{" "}
								<Link
									className="group inline-flex underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
									href="/cv"
								>
									here
								</Link>
								.
							</p>
						</div>
					</div>

					<hr className="border-muted-foreground border-dotted" />

					<div className="space-y-2">
						<div className="flex w-full flex-row gap-4">
							<div className="w-20">
								<p className="text-muted-foreground text-xs">Timeline</p>
							</div>

							<div className="relative flex h-30 w-full flex-col gap-1 overflow-y-hidden text-sm">
								{sortedPosts.slice(0, 6).map((post: Post) => (
									<Link
										aria-label={post.title}
										className="flex justify-between gap-4 transition hover:text-blue-400 dark:hover:text-blue-600"
										href={`/timeline/${post.slug}`}
										key={post.slug}
									>
										<p className="line-clamp-1">{post.title}</p>
										<p className="text-muted-foreground">
											{new Date(post.date_created).toLocaleDateString(undefined, {
												year: "numeric",
												month: "2-digit",
												day: "2-digit",
											})}
										</p>
									</Link>
								))}
								<div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-20 bg-linear-to-t from-white dark:from-background" />
							</div>
						</div>
						<div className="flex justify-end">
							<Link
								className="w-fit text-muted-foreground text-xs transition hover:text-blue-400 dark:hover:text-blue-600"
								href="/timeline"
							>
								See all {sortedPosts.length}
							</Link>
						</div>
					</div>

					<div className="space-y-2">
						<div className="flex w-full flex-row gap-4">
							<div className="w-20">
								<p className="text-muted-foreground text-xs">Projects</p>
							</div>
							<div className="relative flex h-30 w-full flex-col gap-1 overflow-y-hidden text-sm">
								{projects
									.filter((project) => project.status !== "work_in_progress")
									.slice(0, 6)
									.map((project) => (
										<div className="flex justify-between gap-4" key={project.name}>
											{project.link ? (
												<a
													className="line-clamp-1 transition hover:text-blue-400 dark:hover:text-blue-600"
													href={project.link}
													rel="noopener noreferrer"
													target="_blank"
												>
													{project.name}
												</a>
											) : (
												<span className="line-clamp-1">{project.name}</span>
											)}
											<span className="text-muted-foreground">{project.year_completed}</span>
										</div>
									))}
								<div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-10 bg-gradient-to-t from-white dark:from-background" />
							</div>
						</div>
						<div className="flex justify-end">
							<Link
								className="w-fit text-muted-foreground text-xs transition hover:text-blue-400 dark:hover:text-blue-600"
								href="/projects"
							>
								See all {projects.length}
							</Link>
						</div>
					</div>

					<GitHubContributions username="zpuckeridge" />

					<hr className="border-muted-foreground border-dotted" />

					<div className="space-y-2">
						<div className="flex justify-between">
							<div className="flex flex-row gap-2 text-muted-foreground text-xs">
								<p>{brisbaneTime}</p>
								<p>•</p>
								<p>{brisbaneDate}</p>
							</div>

							<Lanyard />
						</div>
						<p className="max-w-xs text-muted-foreground text-xs">
							Waging war on weak culture—building digital strongholds, sharpening minds, and
							advancing the Kingdom of God.
						</p>

						<div className="flex justify-between gap-4">
							<div className="flex flex-row gap-2 text-muted-foreground text-xs">
								<Link
									className="group inline-flex underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
									href="/colophon"
								>
									Colophon
								</Link>{" "}
								•{" "}
								<Link
									className="group inline-flex underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
									href="/imprint"
								>
									Imprint
								</Link>
							</div>

							<ToggleTheme />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
