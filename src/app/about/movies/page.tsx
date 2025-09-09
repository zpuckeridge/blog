import Link from "next/link";
import MoviesAll from "@/src/components/movies-all";
import { getMovies } from "@/src/lib/directus-content";

export default async function MoviesPage() {
	const movies = await getMovies();

	return (
		<div className="mx-auto flex max-w-lg flex-col gap-4 space-y-20 px-6 pt-4 pb-20">
			<div className="flex flex-col space-y-20 text-sm">
				<MoviesAll movies={movies} />
			</div>

			<Link
				className="group inline-flex w-fit text-muted-foreground text-xs underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
				href="/about"
			>
				../about
			</Link>
		</div>
	);
}
