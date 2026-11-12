import type { ReactNode } from "react";

import BackLink from "@/components/back-link";

const AboutCollectionPage = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pb-20">
    <div className="flex flex-col gap-y-20 text-sm">
      {children}
      <BackLink href="/about">../about</BackLink>
    </div>
  </div>
);

export default AboutCollectionPage;
