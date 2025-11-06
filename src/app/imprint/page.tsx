import Link from "next/link";

export default function Imprint() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pt-4 pb-20">
      <div className="flex flex-col space-y-20 text-sm">
        <div className="flex flex-col space-y-8">
          <p className="font-redaction text-white text-xl">Imprint</p>

          <div className="flex w-full flex-col gap-2">
            <p className="text-muted-foreground text-xs">Contact Information</p>
            <p>
              <Link
                className="group inline-flex underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
                href="mailto:hi@zacchary.me"
              >
                hi@zacchary.me
              </Link>
            </p>
          </div>

          <div className="flex w-full flex-col gap-2">
            <p className="text-muted-foreground text-xs">Copyright</p>
            <p className="text-sm">
              The content of this website is protected by Australian copyright
              law. Unauthorised distrubution of content for commercial purposes
              (ie. screenshots, articles, videos and photos) without express
              prior consent is strictly prohibited. Otherwise, content is more
              than welcome to be referenced externally, as long as it is linked
              and done in a way that is not misleading.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2">
            <p className="text-muted-foreground text-xs">Disclaimer</p>
            <p className="text-sm">
              While I strive to ensure the accuracy of information on this
              website, I make no representations or warranties of any kind,
              express or implied, about the completeness, accuracy, reliability,
              suitability or availability of the information, products,
              services, or related graphics contained on the website.
            </p>
          </div>
        </div>

        <Link
          className="group inline-flex w-fit text-muted-foreground text-xs underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
          href="/"
        >
          ../
        </Link>
      </div>
    </div>
  );
}
