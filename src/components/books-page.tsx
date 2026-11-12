import AboutCollectionPage from "@/components/about-collection-page";
import BooksAll from "@/components/books-all";
import type { Book } from "@/interfaces/content-item";

const BooksPage = ({ books }: { books: Book[] }) => (
  <AboutCollectionPage>
    <BooksAll books={books} />
  </AboutCollectionPage>
);

export default BooksPage;
