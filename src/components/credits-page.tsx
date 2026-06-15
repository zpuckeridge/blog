import BackLink from "@/components/back-link";
import CreditsAll from "@/components/credits-all";
import type { Credit } from "@/interfaces/content-item";

export default function CreditsPage({ credits }: { credits: Credit[] }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pb-20">
      <div className="flex flex-col gap-y-20 text-sm">
        <CreditsAll credits={credits} />

        <BackLink href="/about">../about</BackLink>
      </div>
    </div>
  );
}
