import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  clusterActivityEvents,
  createActivityEvent,
  cleanActivityTitle,
  formatActivityLocation,
  formatActivityTitle,
  groupActivityEvents,
  isPublicActivityPath,
  pruneActivityEvents,
} from "./activity-feed.ts";

const now = Date.parse("2026-09-23T03:00:00.000Z");

const createEvent = (id: string, occurredAt: string, path = "/about") =>
  createActivityEvent(
    {
      city: "Brisbane",
      country: "AU",
      countryCode: "au",
      latitude: -27.47,
      longitude: 153.02,
      path,
      region: "Queensland",
      title: "About Zacchary",
    },
    id,
    new Date(occurredAt)
  );

describe("activity path validation", () => {
  it("excludes private, API, and activity routes", () => {
    assert.equal(isPublicActivityPath("/"), true);
    assert.equal(isPublicActivityPath("/about?from=home"), true);
    assert.equal(isPublicActivityPath("/activity"), false);
    assert.equal(isPublicActivityPath("/api/activity/feed"), false);
    assert.equal(isPublicActivityPath("/timeline/secret"), true);
    assert.equal(isPublicActivityPath("/video/private"), false);
  });
});

describe("createActivityEvent", () => {
  it("removes the site title suffix from page names", () => {
    assert.equal(cleanActivityTitle("About — Zacchary Puckeridge"), "About");
    assert.equal(
      formatActivityTitle("/", "Zacchary Puckeridge — Web developer"),
      "Home"
    );
    assert.equal(
      formatActivityTitle("/", "Song — Artist", "listened"),
      "Song — Artist"
    );
  });

  it("removes query strings and rounds location data", () => {
    const event = createEvent(
      "one",
      "2026-09-23T02:59:00.000Z",
      "/about?x=secret"
    );

    assert.ok(event);
    assert.equal(event.path, "/about");
    assert.equal(event.latitude, -27.5);
    assert.equal(event.longitude, 153);
    assert.equal(event.countryCode, "AU");
  });

  it("rejects invalid paths", () => {
    assert.equal(
      createActivityEvent(
        {
          path: "https://example.com/private",
          title: "Private",
        },
        "one",
        new Date(now)
      ),
      null
    );
  });
});

describe("pruneActivityEvents", () => {
  it("sorts newest first and drops events older than one day", () => {
    const events = [
      createEvent("old", "2026-09-22T02:59:00.000Z"),
      createEvent("new", "2026-09-23T02:59:00.000Z"),
      createEvent("middle", "2026-09-23T02:00:00.000Z"),
    ].filter((event) => event !== null);

    assert.deepEqual(
      pruneActivityEvents(events, now).map((event) => event.id),
      ["new", "middle"]
    );
  });
});

describe("activity clusters", () => {
  it("groups consecutive events from the same location", () => {
    const events = [
      createEvent("one", "2026-09-23T02:59:00.000Z", "/one"),
      createEvent("two", "2026-09-23T02:58:00.000Z", "/two"),
      createActivityEvent(
        {
          city: "Sydney",
          country: "AU",
          countryCode: "AU",
          path: "/three",
          region: "New South Wales",
          title: "Three",
        },
        "three",
        new Date("2026-09-23T02:57:00.000Z")
      ),
    ].filter((event) => event !== null);

    const clusters = clusterActivityEvents(events);
    assert.deepEqual(
      clusters.map((cluster) => cluster.events.map((event) => event.id)),
      [["one", "two"], ["three"]]
    );
    const [firstEvent] = events;
    assert.ok(firstEvent);
    assert.equal(
      formatActivityLocation(firstEvent),
      "Brisbane, Queensland, AU"
    );
  });
});

describe("activity action groups", () => {
  it("groups scattered views of the same page in latest-first order", () => {
    const events = [
      createEvent("one", "2026-09-23T02:59:00.000Z", "/timeline"),
      createEvent("two", "2026-09-23T02:58:00.000Z", "/projects"),
      createEvent("three", "2026-09-23T02:57:00.000Z", "/timeline"),
    ].filter((event) => event !== null);

    assert.deepEqual(
      groupActivityEvents(events).map(({ event, count }) => ({
        count,
        path: event.path,
      })),
      [
        { count: 2, path: "/timeline" },
        { count: 1, path: "/projects" },
      ]
    );
  });
});
