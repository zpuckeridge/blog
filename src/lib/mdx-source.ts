import type { Root } from "mdast";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { mdxParse } from "safe-mdx/parse";

const loggedMdxParseIssues = new Set<string>();

const FENCED_CODE_LINE = /^(?<indent>\s*)(?<marker>`{3,}|~{3,})(?<info>.*)$/u;

/**
 * XML processing instructions (`<?...?>`) in prose are invalid MDX JSX and crash the parser.
 * Escape the leading `<` outside fenced code blocks so the line renders as text.
 */
export const escapeXmlProcessingInstructionsOutsideCodeFences = (
  source: string
): string => {
  let inFencedCode = false;

  return source
    .split("\n")
    .map((line) => {
      if (FENCED_CODE_LINE.test(line)) {
        inFencedCode = !inFencedCode;
        return line;
      }

      if (inFencedCode) {
        return line;
      }

      return line.replaceAll("<?", "&lt;?");
    })
    .join("\n");
};

const gfmMarkdownParser = remark().use(remarkGfm);

const parseGfmMarkdown = (source: string): Root =>
  gfmMarkdownParser.parse(source) as Root;

export type TimelineMdxParseResult =
  | {
      error: null;
      markdown: string;
      mdast: Root;
      recovery: "none" | "sanitized" | "markdown-fallback";
    }
  | {
      error: string;
      markdown: string;
      mdast: null;
      recovery: "failed";
    };

const logMdxParseIssue = (
  contentSlug: string | undefined,
  recovery: TimelineMdxParseResult["recovery"],
  detail: string
): void => {
  const key = contentSlug ?? "unknown";
  if (loggedMdxParseIssues.has(key)) {
    return;
  }

  loggedMdxParseIssues.add(key);
  console.warn(`Timeline MDX parse ${recovery} for post "${key}": ${detail}`);
};

/**
 * Parse CMS timeline MDX without letting a single bad token crash the Worker request.
 */
export const parseTimelineMdxSource = (
  source: string,
  contentSlug?: string
): TimelineMdxParseResult => {
  const attempts: { recovery: "none" | "sanitized"; markdown: string }[] = [
    { markdown: source, recovery: "none" },
  ];

  const sanitized = escapeXmlProcessingInstructionsOutsideCodeFences(source);
  if (sanitized !== source) {
    attempts.push({ markdown: sanitized, recovery: "sanitized" });
  }

  let lastError = "Unknown MDX parse error";

  for (const attempt of attempts) {
    try {
      const mdast = mdxParse(attempt.markdown);
      if (attempt.recovery !== "none") {
        logMdxParseIssue(contentSlug, attempt.recovery, lastError);
      }

      return {
        error: null,
        markdown: attempt.markdown,
        mdast,
        recovery: attempt.recovery,
      };
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }

  try {
    const mdast = parseGfmMarkdown(source);
    logMdxParseIssue(contentSlug, "markdown-fallback", lastError);

    return {
      error: null,
      markdown: source,
      mdast,
      recovery: "markdown-fallback",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logMdxParseIssue(contentSlug, "failed", message);

    return {
      error: message,
      markdown: source,
      mdast: null,
      recovery: "failed",
    };
  }
};
