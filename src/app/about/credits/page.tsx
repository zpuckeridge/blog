import Link from "next/link";
import CreditsAll from "@/src/components/credits-all";
import { getCredits } from "@/src/lib/directus-content";

export default async function CreditsPage() {
	const credits = await getCredits();

	return (
		<div className="max-w-lg mx-auto flex flex-col gap-4 pt-4 pb-20 space-y-20 px-6">
			<div className="text-sm flex flex-col space-y-20">
				<CreditsAll credits={credits} />
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
