import { useCallback, useState } from "react";

import ContentThumbnail from "@/components/content-thumbnail";
import ExpandableListItem from "@/components/expandable-list-item";
import type { Credit } from "@/interfaces/content-item";
import {
  expandableListGridClassName,
  expandableListItemsClassName,
  expandableListMetaClassName,
  expandableListSectionHeaderMainClassName,
  expandableListYearHeaderClassName,
} from "@/lib/expandable-list";
import { calendarYearInBrisbane, formatDdMm } from "@/lib/format-in-brisbane";

const CreditsAll = ({ credits }: { credits: Credit[] }) => {
  // Group credits by year
  const creditsByYear: Record<number, Credit[]> = {};
  for (const credit of credits) {
    const year = calendarYearInBrisbane(credit.release_date);
    if (!creditsByYear[year]) {
      creditsByYear[year] = [];
    }
    creditsByYear[year].push(credit);
  }

  // Get years sorted descending
  const years = Object.keys(creditsByYear)
    .map(Number)
    .toSorted((a, b) => b - a);

  const [expandedCredit, setExpandedCredit] = useState<string | null>(null);

  const handleToggle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id ?? "";
    setExpandedCredit((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="space-y-10">
      <h1 className="font-redaction text-black text-xl dark:text-white">
        Credits
      </h1>
      <div className="flex w-full flex-col gap-4">
        {years.map((year) => (
          <div className={expandableListGridClassName} key={year}>
            <div className={expandableListYearHeaderClassName}>
              <div className={expandableListSectionHeaderMainClassName}>
                <p className="shrink-0 text-muted-foreground text-sm">
                  {creditsByYear[year].length}
                </p>
                <hr className="min-w-0 flex-1 border-dotted border-border" />
              </div>
              <p
                className={`${expandableListMetaClassName} text-muted-foreground text-sm`}
              >
                {year}
              </p>
            </div>
            <div className={expandableListItemsClassName}>
              {creditsByYear[year]
                .toSorted((a, b) => +b.release_date - +a.release_date)
                .map((credit: Credit) => {
                  const isExpanded = expandedCredit === credit.id.toString();
                  return (
                    <ExpandableListItem
                      contentClassName="flex flex-row flex-wrap gap-1"
                      date={formatDdMm(credit.release_date)}
                      expandedDetailsClassName="max-h-40 opacity-100"
                      id={credit.id.toString()}
                      isExpanded={isExpanded}
                      key={credit.id}
                      onToggle={handleToggle}
                      title={credit.title}
                    >
                      {credit.image && (
                        <ContentThumbnail
                          alt={credit.title}
                          assetId={credit.image}
                        />
                      )}

                      {credit.director && (
                        <div className="min-w-20 whitespace-nowrap bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
                          <p className="text-sm text-muted-foreground">
                            Director
                          </p>
                          <p className="text-sm">{credit.director}</p>
                        </div>
                      )}

                      {credit.tags && (
                        <div className="min-w-20 whitespace-nowrap bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
                          <p className="text-sm text-muted-foreground">
                            {credit.tags.length === 1 ? "Tag" : "Tags"}
                          </p>

                          {credit.tags.map((tag: string, idx: number) => (
                            <span key={tag}>
                              {tag}
                              {idx < credit.tags.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      )}

                      {credit.link && (
                        <div className="min-w-20 whitespace-nowrap bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
                          <p className="text-sm text-muted-foreground">Link</p>
                          <a
                            className="text-sm text-black hover:text-muted-foreground dark:text-white dark:hover:text-muted-foreground"
                            href={credit.link}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            RSP
                          </a>
                        </div>
                      )}
                    </ExpandableListItem>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditsAll;
