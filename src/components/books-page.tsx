import BackLink from "@/components/back-link";
import BooksAll from "@/components/books-all";
import type { Book } from "@/interfaces/content-item";

export default function BooksPage({ books }: { books: Book[] }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pb-20">
      <div className="flex flex-col gap-y-20 text-sm">
        <BooksAll books={books} />

        <BackLink href="/about">../about</BackLink>
      </div>
    </div>
  );
}
