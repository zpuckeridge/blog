import BackLink from "@/components/back-link";
import MoviesAll from "@/components/movies-all";
import type { Movie } from "@/interfaces/content-item";

export default function MoviesPage({ movies }: { movies: Movie[] }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pb-20">
      <div className="flex flex-col gap-y-20 text-sm">
        <MoviesAll movies={movies} />

        <BackLink href="/about">../about</BackLink>
      </div>
    </div>
  );
}
