"use client";

import { compareDesc } from "date-fns";
import { useCallback, useState } from "react";

import ContentThumbnail from "@/components/content-thumbnail";
import type { Movie } from "@/interfaces/content-item";
import {
  expandableListDetailsClassName,
  expandableListPreviewGridClassName,
  expandableListItemClassName,
  expandableListItemExpandedClassName,
  expandableListItemsClassName,
  expandableListMetaClassName,
  expandableListSectionHeaderClassName,
  expandableListSectionHeaderMainClassName,
  expandableListSectionLinkClassName,
  expandableListTitleClassName,
  expandableListTriggerClassName,
} from "@/lib/expandable-list";
import { formatDdMmYy } from "@/lib/format-in-brisbane";

export default function MoviesPreview({ movies }: { movies: Movie[] }) {
  const sortedMovies = movies.toSorted((a, b) =>
    compareDesc(new Date(a.date_created), new Date(b.date_created))
  );
  const previewMovies = sortedMovies.slice(0, 7);
  const [expandedMovie, setExpandedMovie] = useState<string | null>(null);

  const handleToggle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id ?? "";
    setExpandedMovie((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="space-y-2">
      <div className={expandableListPreviewGridClassName}>
        <div className={expandableListSectionHeaderClassName}>
          <div className={expandableListSectionHeaderMainClassName}>
            <p className="shrink-0 text-muted-foreground text-sm">Movies</p>
            <hr className="min-w-0 flex-1 border-dotted border-border" />
          </div>
          <a
            className={expandableListSectionLinkClassName}
            href="/about/movies"
          >
            See all {sortedMovies.length}
          </a>
        </div>
        <div
          className={`${expandableListItemsClassName} relative h-36 overflow-hidden`}
        >
          {previewMovies.map((movie: Movie) => {
            const isExpanded = expandedMovie === movie.id.toString();
            return (
              <div
                className={`${expandableListItemClassName} ${isExpanded ? expandableListItemExpandedClassName : ""}`}
                key={movie.id}
              >
                <button
                  aria-label={`${movie.title} - Click to ${isExpanded ? "hide" : "show"} details`}
                  className={expandableListTriggerClassName}
                  data-id={movie.id.toString()}
                  onClick={handleToggle}
                  type="button"
                >
                  <p className={expandableListTitleClassName}>{movie.title}</p>
                  <p
                    className={`${expandableListMetaClassName} text-muted-foreground`}
                  >
                    {formatDdMmYy(movie.date_created)}
                  </p>
                </button>
                <div
                  className={`${expandableListDetailsClassName} overflow-hidden transition-all duration-200 ease-in-out ${
                    isExpanded ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-row gap-1">
                    {movie.image && (
                      <ContentThumbnail
                        alt={movie.title}
                        assetId={movie.image}
                      />
                    )}
                    <div className="min-w-20 bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <p className="text-sm">{movie.rating}/10</p>
                    </div>

                    {movie.setting && (
                      <div className="min-w-20 bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
                        <p className="text-sm text-muted-foreground">Setting</p>
                        <p className="text-sm">{movie.setting}</p>
                      </div>
                    )}

                    {movie.with && (
                      <div className="min-w-20 bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
                        <p className="text-sm text-muted-foreground">With</p>
                        <p className="text-sm">
                          {(() => {
                            if (Array.isArray(movie.with)) {
                              const processedItems = movie.with.map((item) => {
                                // Handle both string and object cases
                                if (typeof item === "string") {
                                  return item;
                                }
                                if (typeof item === "object" && item !== null) {
                                  // If it's an object, try to extract a name or title property
                                  const obj = item as Record<string, unknown>;
                                  return (
                                    (obj.name as string) ||
                                    (obj.title as string) ||
                                    (obj.value as string) ||
                                    String(item)
                                  );
                                }
                                return String(item);
                              });

                              // Use "&" for two items, commas for more
                              if (processedItems.length === 2) {
                                return processedItems.join(" & ");
                              }
                              return processedItems.join(", ");
                            }
                            // Handle non-array cases
                            if (
                              typeof movie.with === "object" &&
                              movie.with !== null
                            ) {
                              const obj = movie.with as Record<string, unknown>;
                              return (
                                (obj.name as string) ||
                                (obj.title as string) ||
                                (obj.value as string) ||
                                String(movie.with)
                              );
                            }
                            return String(movie.with);
                          })()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-20 bg-gradient-to-t from-white dark:from-background" />
        </div>
      </div>
    </div>
  );
}
