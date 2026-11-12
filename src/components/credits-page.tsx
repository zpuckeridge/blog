import AboutCollectionPage from "@/components/about-collection-page";
import CreditsAll from "@/components/credits-all";
import type { Credit } from "@/interfaces/content-item";

const CreditsPage = ({ credits }: { credits: Credit[] }) => (
  <AboutCollectionPage>
    <CreditsAll credits={credits} />
  </AboutCollectionPage>
);

export default CreditsPage;
