import BackLink from "@/components/back-link";
import LinkWithIcon from "@/components/link-with-icon";

export default function ImprintPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pb-20">
      <div className="flex flex-col gap-y-20 text-sm">
        <div className="space-y-10">
          <div className="space-y-2">
            <p className="font-redaction text-black text-xl dark:text-white">
              Imprint
            </p>
          </div>

          <div className="flex flex-col gap-y-8">
            <div className="flex w-full flex-col gap-2">
              <p className="text-muted-foreground text-sm">
                Contact Information
              </p>
              <LinkWithIcon
                className="w-fit self-start"
                href="mailto:hi@zacchary.me"
                variant="highlighted"
              >
                hi@zacchary.me
              </LinkWithIcon>
            </div>

            <div className="flex w-full flex-col gap-2">
              <p className="text-muted-foreground text-sm">Copyright</p>
              <p className="text-sm">
                The content of this website is protected by Australian copyright
                law. Unauthorised distribution of content for commercial
                purposes (ie. screenshots, articles, videos and photos) without
                express prior consent is strictly prohibited. Otherwise, content
                is more than welcome to be referenced externally, as long as it
                is linked and done in a way that is not misleading.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2">
              <p className="text-muted-foreground text-sm">Disclaimer</p>
              <p className="text-sm">
                While I strive to ensure the accuracy of information on this
                website, I make no representations or warranties of any kind,
                express or implied, about the completeness, accuracy,
                reliability, suitability or availability of the information,
                products, services, or related graphics contained on the
                website.
              </p>
            </div>
          </div>
        </div>

        <BackLink href="/">../</BackLink>
      </div>
    </div>
  );
}
