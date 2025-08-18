import Link from "next/link";
import BooksAll from "@/src/components/books-all";
import { getBooks } from "@/src/lib/directus-content";

export default async function BooksPage() {
	const books = await getBooks();

	return (
		<div className="max-w-lg mx-auto flex flex-col gap-4 pt-4 pb-20 space-y-20 px-6">
			<div className="text-sm flex flex-col space-y-20">
				<BooksAll books={books} />
			</div>

			<Link
				href="/about"
				className="underline underline-offset-2 decoration-dotted hover:decoration-solid hover:underline-offset-4 transition inline-flex group ease-in-out text-xs text-muted-foreground w-fit"
			>
				../about
			</Link>
		</div>
	);
}
