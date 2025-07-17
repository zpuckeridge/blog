import Link from "next/link";
import MoviesAll from "@/src/components/movies-all";
import { getAllMovies } from "@/src/lib/getAllContent";

export default async function MoviesPage() {
	const movies = await getAllMovies();

	return (
		<div className="max-w-lg mx-auto flex flex-col gap-4 pt-4 pb-20 space-y-20 px-6">
			<div className="text-sm flex flex-col space-y-20">
				<MoviesAll movies={movies} />
			</div>

			<Link
				href="/about"
				className="underline underline-offset-2 decoration-dotted hover:decoration-solid hover:underline-offset-4 transition inline-flex group ease-in-out text-xs text-muted-foreground"
			>
				../about
			</Link>
		</div>
	);
}
