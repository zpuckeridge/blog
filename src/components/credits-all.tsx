"use client";

import { useCallback, useState } from "react";

import ContentThumbnail from "@/components/content-thumbnail";
import LinkWithIcon from "@/components/link-with-icon";
import type { Credit } from "@/interfaces/content-item";
import { directusAssetUrl } from "@/lib/directus-asset";
import { calendarYearInBrisbane, formatDdMm } from "@/lib/format-in-brisbane";

export default function CreditsAll({ credits }: { credits: Credit[] }) {
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
      <p className="font-redaction text-black text-xl dark:text-white">
        Credits
      </p>
      <div className="flex w-full flex-col gap-4">
        {years.map((year) => (
          <div key={year}>
            <div className="mb-2 flex w-full flex-row items-center gap-2">
              <p className="text-muted-foreground text-sm">
                {creditsByYear[year].length}
              </p>
              <hr className="w-full border-dotted border-border" />
              <p className="text-muted-foreground text-sm">{year}</p>
            </div>
            <div className="relative flex w-full flex-col gap-1 overflow-y-hidden text-sm">
              {creditsByYear[year]
                .toSorted((a, b) => +b.release_date - +a.release_date)
                .map((credit: Credit) => {
                  const isExpanded = expandedCredit === credit.id.toString();
                  return (
                    <div className="space-y-1" key={credit.id}>
                      <button
                        aria-label={`${credit.title} - Click to ${isExpanded ? "hide" : "show"} details`}
                        className="flex w-full justify-between gap-4 px-1 text-left hover:bg-muted"
                        data-id={credit.id.toString()}
                        onClick={handleToggle}
                        type="button"
                      >
                        <p className="line-clamp-1">{credit.title}</p>
                        <p className="text-muted-foreground">
                          {formatDdMm(credit.release_date)}
                        </p>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 ease-in-out ${
                          isExpanded
                            ? "max-h-40 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="flex flex-row flex-wrap gap-1">
                          {credit.image && (
                            <ContentThumbnail
                              alt={credit.title}
                              src={directusAssetUrl(credit.image, {
                                width: 150,
                                height: 225,
                              })}
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
                              <p className="text-sm text-muted-foreground">
                                Link
                              </p>
                              <LinkWithIcon
                                href={credit.link}
                                variant="default"
                              >
                                RSP
                              </LinkWithIcon>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
