import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  escapeXmlProcessingInstructionsOutsideCodeFences,
  parseTimelineMdxSource,
} from "./mdx-source.ts";

describe("escapeXmlProcessingInstructionsOutsideCodeFences", () => {
  it("leaves fenced code blocks unchanged", () => {
    const source = ["Intro", "", "```xml", '<?xml version="1.0"?>', "```"].join(
      "\n"
    );

    assert.equal(
      escapeXmlProcessingInstructionsOutsideCodeFences(source),
      source
    );
  });

  it("escapes XML processing instructions in prose", () => {
    const source = '<?xml version="1.0"?>';
    assert.equal(
      escapeXmlProcessingInstructionsOutsideCodeFences(source),
      '&lt;?xml version="1.0"?>'
    );
  });
});

describe("parseTimelineMdxSource", () => {
  it("parses prose containing an XML processing instruction without throwing", () => {
    const lines = [
      "# Monitor Windows",
      "",
      ...Array.from({ length: 28 }, (_, index) => `Paragraph ${index}.`),
      '<?xml version="1.0"?>',
      "",
      "Trailing paragraph.",
    ];

    const result = parseTimelineMdxSource(
      lines.join("\n"),
      "monitor-windows-with-grafana-and-prometheus"
    );

    assert.equal(result.error, null);
    assert.ok(result.mdast);
    assert.notEqual(result.recovery, "failed");
  });

  it("still parses valid MDX unchanged", () => {
    const source = "# Title\n\nHello **world**.";

    const result = parseTimelineMdxSource(source, "valid-post");

    assert.equal(result.error, null);
    assert.equal(result.recovery, "none");
    assert.equal(result.markdown, source);
  });
});
