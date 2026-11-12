import AboutCollectionPage from "@/components/about-collection-page";
import MoviesAll from "@/components/movies-all";
import type { Movie } from "@/interfaces/content-item";

const MoviesPage = ({ movies }: { movies: Movie[] }) => (
  <AboutCollectionPage>
    <MoviesAll movies={movies} />
  </AboutCollectionPage>
);

export default MoviesPage;
