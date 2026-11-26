import BackLink from "@/components/back-link";
import { expandableListSectionHeaderMainClassName } from "@/lib/expandable-list";
import { formatListenMonthLabel, genresForMonth } from "@/lib/listening-stats";
import type { ListeningStatsStore } from "@/lib/listening-stats";

const MusicGenresPage = ({
  initialMonth,
  stats,
}: {
  initialMonth: string;
  stats: ListeningStatsStore;
}) => {
  const month = stats.months[initialMonth];
  const genres = month ? genresForMonth(month) : [];
  const musicHref = `/music?month=${encodeURIComponent(initialMonth)}`;

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-lg flex-col gap-4 px-6 pb-20">
      <div className="flex flex-col gap-y-8 text-sm">
        <div className="space-y-2">
          <h1 className="font-redaction text-black text-xl dark:text-white">
            Genres
          </h1>
          <p className="text-muted-foreground">
            {formatListenMonthLabel(initialMonth)}
          </p>
        </div>

        {genres.length === 0 ? (
          <p className="text-muted-foreground">
            No genre data for this month yet.
          </p>
        ) : (
          <section className="space-y-2">
            <div className={expandableListSectionHeaderMainClassName}>
              <p className="shrink-0 text-muted-foreground text-sm">
                {genres.length.toLocaleString()}{" "}
                {genres.length === 1 ? "genre" : "genres"}
              </p>
              <hr className="min-w-0 flex-1 border-dotted border-border" />
            </div>
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {genres.map(({ count, genre }) => (
                <li className="flex justify-between gap-3" key={genre}>
                  <span>{genre}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {count.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <BackLink href={musicHref}>../music</BackLink>
      </div>
    </div>
  );
};

export default MusicGenresPage;
