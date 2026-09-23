import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import useSWR from "swr";

import {
  clusterActivityEvents,
  formatActivityTitle,
  formatActivityVisitorLine,
  groupActivityEvents,
} from "@/lib/activity-feed";
import type { ActivityCluster, ActivityEvent } from "@/lib/activity-feed";

interface ActivityFeedResponse {
  count: number;
  events: ActivityEvent[];
}

interface ActivityFeedProps {
  initialEvents: ActivityEvent[];
}

const fetcher = async (url: string): Promise<ActivityFeedResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Activity feed unavailable");
  }
  return response.json() as Promise<ActivityFeedResponse>;
};

const ACTIVITY_LINK_CLASS =
  "text-foreground underline decoration-border underline-offset-2 transition-colors duration-150 ease-out hover:decoration-foreground";

const ActivityLink = ({
  children,
  href,
  title,
}: {
  children: ReactNode;
  href: string;
  title: string;
}) => {
  const external = href.startsWith("http");

  return (
    <a
      className={ACTIVITY_LINK_CLASS}
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
      title={title}
    >
      {children}
    </a>
  );
};

const ActivityCount = ({ count }: { count: number }) =>
  count > 1 ? (
    <span className="ml-1 inline-flex h-5 items-center bg-muted px-1 align-middle text-xs text-muted-foreground">
      ×{count}
    </span>
  ) : null;

const getListenedLabels = (event: ActivityEvent) => {
  const separator = " — ";
  const separatorIndex = event.title.lastIndexOf(separator);
  const track =
    event.artist || separatorIndex === -1
      ? event.title
      : event.title.slice(0, separatorIndex);
  const artist =
    event.artist ??
    (separatorIndex === -1
      ? null
      : event.title.slice(separatorIndex + separator.length));

  return { artist, track };
};

const ListenedActivityAction = ({
  count,
  event,
}: {
  count: number;
  event: ActivityEvent;
}) => {
  const { artist, track } = getListenedLabels(event);
  const trackHref = event.trackUrl ?? event.path;
  const artistHref = event.artistUrl ?? event.path;

  return (
    <span className="relative z-10 block min-w-0 text-muted-foreground">
      <span>listened to </span>
      <ActivityLink href={trackHref} title={track}>
        {track}
      </ActivityLink>
      {artist ? (
        <>
          <span>, </span>
          <ActivityLink href={artistHref} title={artist}>
            {artist}
          </ActivityLink>
        </>
      ) : null}
      <ActivityCount count={count} />
    </span>
  );
};

const StandardActivityAction = ({
  count,
  event,
}: {
  count: number;
  event: ActivityEvent;
}) => {
  const title = formatActivityTitle(event.path, event.title, event.action);

  return (
    <span className="relative z-10 block min-w-0 text-muted-foreground">
      <span>{event.action} </span>
      <ActivityLink href={event.path} title={title}>
        {title}
      </ActivityLink>
      <ActivityCount count={count} />
    </span>
  );
};

/** Dot and grouped connector share x = centre of pl-6 timeline gutter (12px). */
const ACTIVITY_TIMELINE_DOT_CLASS =
  "absolute left-2 top-5 size-2 rounded-full bg-orange-500/80";
const ACTIVITY_TIMELINE_CONNECTOR_CLASS =
  "pointer-events-none absolute -left-[13px] top-[1.375rem] bottom-[calc((1lh+0.25rem)/2-3px)] w-2 rounded-bl-lg border-border border-b-2 border-l-2";

const ActivityAction = ({
  count = 1,
  event,
}: {
  count?: number;
  event: ActivityEvent;
}) => {
  if (event.action === "listened") {
    return <ListenedActivityAction count={count} event={event} />;
  }

  return <StandardActivityAction count={count} event={event} />;
};

const ActivityClusterRow = ({
  cluster,
  newEventIds,
}: {
  cluster: ActivityCluster;
  newEventIds: ReadonlySet<string>;
}) => {
  const [latest] = cluster.events;
  if (!latest) {
    return null;
  }

  const visitorLine = formatActivityVisitorLine(latest);
  const isGrouped = cluster.events.length > 1;
  const actionGroups = groupActivityEvents(cluster.events);

  return (
    <article
      className="group relative py-3 pl-6 transition-colors duration-150 ease-out"
      data-new={newEventIds.has(latest.id) ? "true" : undefined}
    >
      <span aria-hidden="true" className={ACTIVITY_TIMELINE_DOT_CLASS} />
      <div className="text-sm leading-6">
        {isGrouped ? (
          <div className="relative">
            <span
              aria-hidden="true"
              className={ACTIVITY_TIMELINE_CONNECTOR_CLASS}
            />
            <span className="relative z-10 text-foreground">{visitorLine}</span>
            <ul className="relative z-10 mt-1 flex flex-col gap-0 pl-[3px]">
              {actionGroups.map(({ count, event }) => (
                <li
                  className="relative flex items-baseline gap-1.5 py-0.5"
                  key={event.id}
                >
                  <ActivityAction count={count} event={event} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <span className="text-foreground">{visitorLine}</span>
            <ActivityAction event={latest} />
          </>
        )}
      </div>
    </article>
  );
};

const ActivityFeed = ({ initialEvents }: ActivityFeedProps) => {
  const { data, error } = useSWR<ActivityFeedResponse>(
    "/api/activity/feed",
    fetcher,
    {
      dedupingInterval: 2000,
      fallbackData: { count: initialEvents.length, events: initialEvents },
      refreshInterval: 5000,
      revalidateOnFocus: true,
    }
  );
  const events = data?.events ?? initialEvents;
  const clusters = useMemo(() => clusterActivityEvents(events), [events]);
  const previousIds = useRef<Set<string> | null>(null);
  const [newEventIds, setNewEventIds] = useState<ReadonlySet<string>>(
    new Set()
  );

  useEffect(() => {
    const nextIds = new Set(events.map((event) => event.id));
    if (!previousIds.current) {
      previousIds.current = nextIds;
      return;
    }
    const previous = previousIds.current;
    const addedIds = new Set(
      events.filter((event) => !previous.has(event.id)).map((event) => event.id)
    );
    previousIds.current = nextIds;
    if (addedIds.size === 0) {
      return;
    }

    setNewEventIds(addedIds);
    const timeout = window.setTimeout(() => setNewEventIds(new Set()), 1600);
    return () => window.clearTimeout(timeout);
  }, [events]);

  let feedContent: ReactNode;
  if (error) {
    feedContent = (
      <p className="border-y border-dotted border-border py-6 text-sm text-muted-foreground">
        Activity is temporarily unavailable.
      </p>
    );
  } else if (clusters.length === 0) {
    feedContent = (
      <p className="border-y border-dotted border-border py-6 text-sm text-muted-foreground">
        No recent visits yet.
      </p>
    );
  } else {
    feedContent = (
      <div className="mt-4">
        {clusters.map((cluster) => (
          <ActivityClusterRow
            cluster={cluster}
            key={cluster.events[0]?.id ?? cluster.locationKey}
            newEventIds={newEventIds}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid min-w-0 gap-10">
      <section aria-label="Recent visitor activity" className="min-w-0">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <h1 className="font-redaction text-xl">Activity</h1>
        </div>

        {feedContent}
      </section>
    </div>
  );
};

export default ActivityFeed;
