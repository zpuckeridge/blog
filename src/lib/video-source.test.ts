import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  controlsHiddenFromStyle,
  describeMuxElement,
  describeMuxEmbed,
  getMuxPlaybackId,
  toMuxHlsUrl,
} from "./video-source.ts";

describe("getMuxPlaybackId", () => {
  it("keeps a bare playback id", () => {
    assert.equal(getMuxPlaybackId("abc123"), "abc123");
  });

  it("reads ids from stream, player, and image URLs", () => {
    assert.equal(
      getMuxPlaybackId("https://stream.mux.com/abc123.m3u8"),
      "abc123"
    );
    assert.equal(
      getMuxPlaybackId("https://stream.mux.com/abc123/highest.mp4"),
      "abc123"
    );
    assert.equal(getMuxPlaybackId("https://player.mux.com/abc123"), "abc123");
    assert.equal(
      getMuxPlaybackId("https://image.mux.com/abc123/thumbnail.jpg"),
      "abc123"
    );
    assert.equal(getMuxPlaybackId("stream.mux.com/abc123"), "abc123");
  });
});

describe("describeMuxEmbed", () => {
  it("treats a playback id as a controlled player", () => {
    assert.deepEqual(describeMuxEmbed("abc123"), {
      autoplay: false,
      controls: true,
      loop: false,
      muted: false,
      playbackId: "abc123",
      poster: null,
      posterTime: null,
      src: "abc123",
      title: null,
    });
  });

  it("keeps autoplay, muted, and loop on a player.mux.com URL", () => {
    const embed = describeMuxEmbed(
      "https://player.mux.com/abc123?autoplay=true&muted=true&loop=true"
    );
    assert.equal(embed?.autoplay, true);
    assert.equal(embed?.muted, true);
    assert.equal(embed?.loop, true);
    assert.equal(embed?.controls, true);
    assert.equal(
      toMuxHlsUrl(embed?.src ?? ""),
      "https://stream.mux.com/abc123.m3u8"
    );
  });

  it("hides controls when the iframe asks", () => {
    const embed = describeMuxEmbed(
      "https://player.mux.com/abc123?autoplay=muted&loop&controls=false"
    );
    assert.equal(embed?.controls, false);
    assert.equal(embed?.autoplay, true);
    assert.equal(embed?.muted, true);
    assert.equal(embed?.loop, true);
  });

  it("copies playback query params onto the HLS URL", () => {
    const src =
      "https://player.mux.com/abc123?max-resolution=720p&playback-token=signed&poster-time=2";
    assert.equal(
      toMuxHlsUrl(src),
      "https://stream.mux.com/abc123.m3u8?max_resolution=720p&token=signed"
    );
    assert.equal(describeMuxEmbed(src)?.posterTime, 2);
  });

  it("leaves an existing HLS URL intact", () => {
    const src = "https://stream.mux.com/abc123.m3u8?token=signed";
    assert.equal(toMuxHlsUrl(src), src);
  });

  it("ignores other hosts", () => {
    assert.equal(describeMuxEmbed("https://example.com/video.mp4"), null);
    assert.equal(describeMuxEmbed(""), null);
  });
});

describe("describeMuxElement", () => {
  it("uses mux-video when a mux-player shows controls", () => {
    const embed = describeMuxElement({
      autoplay: true,
      kind: "mux-player",
      loop: true,
      muted: true,
      playbackId: "abc123",
      title: "Clip",
    });
    assert.equal(embed?.controls, true);
    assert.equal(embed?.title, "Clip");
    assert.equal(embed?.autoplay, true);
  });

  it("uses a background embed when controls are hidden", () => {
    const fromStyle = describeMuxElement({
      autoplay: "",
      kind: "mux-player",
      loop: true,
      muted: true,
      playbackId: "abc123",
      style: "--controls: none",
    });
    assert.equal(fromStyle?.controls, false);
    assert.equal(fromStyle?.autoplay, true);

    const fromVideo = describeMuxElement({
      autoplay: true,
      kind: "video",
      loop: true,
      muted: true,
      src: "https://stream.mux.com/abc123/highest.mp4",
    });
    assert.equal(fromVideo?.controls, false);
    assert.equal(fromVideo?.playbackId, "abc123");

    const withControls = describeMuxElement({
      controls: true,
      kind: "video",
      src: "https://stream.mux.com/abc123.m3u8",
    });
    assert.equal(withControls?.controls, true);
  });

  it("reads a controls custom property from a style object", () => {
    assert.equal(controlsHiddenFromStyle({ "--controls": "none" }), true);
    assert.equal(controlsHiddenFromStyle("--controls: none;"), true);
    assert.equal(controlsHiddenFromStyle(undefined), false);
  });
});
