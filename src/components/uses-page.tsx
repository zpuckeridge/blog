import BackLink from "@/components/back-link";
import type { UsesSection } from "@/lib/uses-sections";

const UsesPage = ({ sections }: { sections: UsesSection[] }) => (
  <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pb-20">
    <div className="flex flex-col gap-y-20 text-sm">
      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="font-redaction text-black text-xl dark:text-white">
            Uses
          </h1>
          <p>A summary of the tools and hardware I use on a daily basis.</p>
        </div>

        <div className="space-y-10">
          <div className="group/list">
            {sections.map((section) => (
              <div
                className="flex w-full border-t border-dotted border-border text-sm"
                key={section.label}
              >
                <h2 className="w-[100px] shrink-0 py-3 text-muted-foreground">
                  {section.label}
                </h2>
                <div className="flex min-w-0 w-full flex-col">
                  {section.items.map((item, index) => (
                    <div
                      className={`flex w-full justify-between gap-8 py-3 ${
                        index === section.items.length - 1
                          ? ""
                          : "border-b border-dotted border-border"
                      }`}
                      key={`${section.label}-${item.title}`}
                    >
                      <p className="min-w-0">{item.title}</p>
                      <p className="shrink-0 text-right text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BackLink href="/about">../about</BackLink>
    </div>
  </div>
);

export default UsesPage;
