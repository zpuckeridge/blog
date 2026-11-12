import { compareDesc } from "date-fns";
import { useCallback, useState } from "react";

import ContentThumbnail from "@/components/content-thumbnail";
import ExpandableListItem from "@/components/expandable-list-item";
import type { Movie } from "@/interfaces/content-item";
import { formatDirectusRelationList } from "@/lib/directus-relations";
import {
  expandableListGridClassName,
  expandableListItemsClassName,
  expandableListMetaClassName,
  expandableListSectionHeaderMainClassName,
  expandableListYearGroupsClassName,
  expandableListYearHeaderClassName,
  expandableListYearPageClassName,
} from "@/lib/expandable-list";
import { formatDdMm } from "@/lib/format-in-brisbane";
import { groupItemsByBrisbaneYear } from "@/lib/group-by-brisbane-year";

const MoviesAll = ({ movies }: { movies: Movie[] }) => {
  const moviesByYear = groupItemsByBrisbaneYear(
    movies,
    (movie) => movie.date_created
  );

  const years = Object.keys(moviesByYear)
    .map(Number)
    .toSorted((a, b) => b - a);

  const [expandedMovie, setExpandedMovie] = useState<string | null>(null);

  const handleToggle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id ?? "";
    setExpandedMovie((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className={expandableListYearPageClassName}>
      <h1 className="font-redaction text-black text-xl dark:text-white">
        Movies
      </h1>

      <div className={expandableListYearGroupsClassName}>
        {years.map((year) => (
          <div className={expandableListGridClassName} key={year}>
            <div className={expandableListYearHeaderClassName}>
              <div className={expandableListSectionHeaderMainClassName}>
                <p className="shrink-0 text-muted-foreground text-sm">
                  {moviesByYear[year].length}
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
              {moviesByYear[year]
                .toSorted((a, b) =>
                  compareDesc(
                    new Date(a.date_created),
                    new Date(b.date_created)
                  )
                )
                .map((movie: Movie) => {
                  const isExpanded = expandedMovie === movie.id.toString();
                  return (
                    <ExpandableListItem
                      contentClassName="flex flex-row gap-1"
                      date={formatDdMm(movie.date_created)}
                      expandedDetailsClassName="max-h-20 opacity-100"
                      id={movie.id.toString()}
                      isExpanded={isExpanded}
                      key={movie.id}
                      onToggle={handleToggle}
                      title={movie.title}
                    >
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
                          <p className="text-sm text-muted-foreground">
                            Setting
                          </p>
                          <p className="text-sm">{movie.setting}</p>
                        </div>
                      )}

                      {movie.with && (
                        <div className="min-w-20 bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
                          <p className="text-sm text-muted-foreground">With</p>
                          <p className="text-sm">
                            {formatDirectusRelationList(movie.with)}
                          </p>
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

export default MoviesAll;
