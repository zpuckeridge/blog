import { compareDesc } from "date-fns";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import Lanyard from "@/src/components/lanyard";
import LinkWithIcon from "@/src/components/link-with-icon";
import type { Post, Video } from "@/src/interfaces/content-item";
import { getPosts, getProjects, getVideos } from "@/src/lib/directus-content";
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
	const [posts, videos, projects] = await Promise.all([getPosts(), getVideos(), getProjects()]);

	const sortedPosts = posts.sort((a, b) =>
		compareDesc(new Date(a.date_created), new Date(b.date_created))
	);
	const sortedVideos = videos.sort((a, b) =>
		compareDesc(new Date(a.date_created), new Date(b.date_created))
	);

	return (
		<div className="max-w-lg mx-auto flex flex-col gap-4 pt-4 pb-20 px-6">
			<div className="space-y-20">
				<div className="space-y-4">
					<div className="text-sm space-y-2">
						<p className="text-2xl font-semibold font-serif italic">Zacchary Puckeridge</p>
						<div>
							<p>Self-taught Web Developer & Generalist</p>
							<p>Based in Brisbane, Australia</p>
						</div>
					</div>

					<div className="flex flex-col md:flex-row md:justify-between gap-4">
						<div className="flex flex-row gap-4 text-xs text-muted-foreground">
							<LinkWithIcon href="https://x.com/zpuckeridge/">X</LinkWithIcon>
							<LinkWithIcon href="https://www.facebook.com/zpuckeridge/">Facebook</LinkWithIcon>
							<LinkWithIcon href="https://www.instagram.com/zpuckeridge/">Instagram</LinkWithIcon>
							<LinkWithIcon href="https://www.linkedin.com/in/zpuckeridge/">LinkedIn</LinkWithIcon>
							<LinkWithIcon href="https://github.com/zpuckeridge">GitHub</LinkWithIcon>
						</div>

						<div>
							<p className="text-xs text-nowrap text-muted-foreground">
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
								<MoveRight className="w-4 h-4 inline-flex" /> 2024) as an IT Administrator to deploy
								and maintain the remote Brisbane office infrastructure.
							</p>

							<p className="text-sm">
								Prior to that, I worked for{" "}
								<LinkWithIcon href="https://www.pixelzoo.com.au">Pixel Zoo</LinkWithIcon> (2021{" "}
								<MoveRight className="w-4 h-4 inline-flex" /> 2022) as a Systems Administrator to
								provide internal and remote support for ~200+ employees. Deployed various networking
								and hardware upgrades across the studio and implemented new file storage
								infrastructure.
							</p>

							<p className="text-xs text-muted-foreground">
								You can find my full employment history{" "}
								<Link
									href="/cv"
									className="underline underline-offset-2 decoration-dotted hover:decoration-solid hover:underline-offset-4 transition inline-flex group ease-in-out"
								>
									here
								</Link>
								.
							</p>
						</div>
					</div>

					<hr className="border-dotted border-muted-foreground" />

					<div className="space-y-2">
						<div className="flex flex-row w-full gap-4">
							<div className="w-20">
								<p className="text-muted-foreground text-xs">Timeline</p>
							</div>

							<div className="flex flex-col w-full gap-1 text-sm h-30 overflow-y-hidden relative">
								{sortedPosts.slice(0, 6).map((post: Post) => (
									<Link
										key={post.slug}
										href={`/timeline/${post.slug}`}
										aria-label={post.title}
										className="hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between gap-4"
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
								<div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-40 bg-linear-to-t from-white dark:from-background" />
							</div>
						</div>
						<div className="flex justify-end">
							<Link
								href="/timeline"
								className="w-fit text-muted-foreground text-xs hover:text-blue-400 dark:hover:text-blue-600 transition"
							>
								See all {sortedPosts.length}
							</Link>
						</div>
					</div>

					<div className="space-y-2">
						<div className="flex flex-row w-full gap-4">
							<div className="w-20">
								<p className="text-muted-foreground text-xs">Projects</p>
							</div>
							<div className="flex flex-col w-full gap-1 text-sm h-30 overflow-y-hidden relative">
								{projects
									.filter((project) => project.status !== "work_in_progress")
									.slice(0, 6)
									.map((project) => (
										<div key={project.name} className="flex justify-between gap-4">
											{project.link ? (
												<a
													href={project.link}
													target="_blank"
													rel="noopener noreferrer"
													className="hover:text-blue-400 dark:hover:text-blue-600 transition line-clamp-1"
												>
													{project.name}
												</a>
											) : (
												<span className="line-clamp-1">{project.name}</span>
											)}
											<span className="text-muted-foreground">{project.year_completed}</span>
										</div>
									))}
								<div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 z-40 bg-gradient-to-t from-white dark:from-background" />
							</div>
						</div>
						<div className="flex justify-end">
							<Link
								href="/projects"
								className="w-fit text-muted-foreground text-xs hover:text-blue-400 dark:hover:text-blue-600 transition"
							>
								See all {projects.length}
							</Link>
						</div>
					</div>

					<div className="space-y-2">
						<div className="flex flex-row w-full gap-4">
							<div className="w-20">
								<p className="text-muted-foreground text-xs">Videos</p>
							</div>

							<div className="flex flex-col w-full gap-1 text-sm h-30 overflow-y-hidden relative">
								{sortedVideos.slice(0, 6).map((video: Video) => (
									<Link
										key={video.slug}
										href={`/video/${video.slug}`}
										aria-label={video.title}
										className="hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between gap-4"
									>
										<p className="line-clamp-1">{video.title}</p>
										<p className="text-muted-foreground">
											{new Date(video.date_created).toLocaleDateString(undefined, {
												year: "numeric",
												month: "2-digit",
												day: "2-digit",
											})}
										</p>
									</Link>
								))}
								<div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-40 bg-linear-to-t from-white dark:from-background" />
							</div>
						</div>

						<div className="flex justify-end">
							<Link
								href="/videos"
								className="text-muted-foreground text-xs hover:text-blue-400 dark:hover:text-blue-600 transition"
							>
								See all {sortedVideos.length}
							</Link>
						</div>
					</div>

					<GitHubContributions username="zpuckeridge" />

					<hr className="border-dotted border-muted-foreground" />

					<div className="space-y-2">
						<div className="flex justify-between">
							<div className="flex flex-row gap-2 text-xs text-muted-foreground">
								<p>{brisbaneTime}</p>
								<p>•</p>
								<p>{brisbaneDate}</p>
							</div>

							<Lanyard />
						</div>
						<p className="text-xs text-muted-foreground max-w-xs">
							Waging war on weak culture—building digital strongholds, sharpening minds, and
							advancing the Kingdom of God.
						</p>

						<div className="flex justify-between gap-4">
							<div className="flex flex-row gap-2 text-xs text-muted-foreground">
								<Link
									href="/colophon"
									className="underline underline-offset-2 decoration-dotted hover:decoration-solid hover:underline-offset-4 transition inline-flex group ease-in-out"
								>
									Colophon
								</Link>{" "}
								•{" "}
								<Link
									href="/imprint"
									className="underline underline-offset-2 decoration-dotted hover:decoration-solid hover:underline-offset-4 transition inline-flex group ease-in-out"
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
