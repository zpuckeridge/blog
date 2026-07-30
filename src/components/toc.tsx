"use client";

import { useCallback, useEffect, useState } from "react";

const HEADING_SELECTOR = "h1, h2, h3, h4, h5, h6";

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

const extractHeadingsFromArticle = (): TocHeading[] => {
  const article = document.querySelector("article");
  if (!article) {
    return [];
  }

  const newHeadings: TocHeading[] = [];

  for (const element of article.querySelectorAll(HEADING_SELECTOR)) {
    if (element.closest(".footnotes, .gfm-footnotes")) {
      continue;
    }

    const { id } = element;
    const text = element.textContent?.trim() ?? "";
    const level = Math.trunc(Number(element.tagName.charAt(1)));

    if (id && text) {
      newHeadings.push({ id, level, text });
    }
  }

  return newHeadings;
};

const TableOfContents = () => {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const syncHeadings = () => {
      const next = extractHeadingsFromArticle();
      setHeadings((current) =>
        current.length === next.length &&
        current.every(
          (heading, index) =>
            heading.id === next[index]?.id &&
            heading.text === next[index]?.text &&
            heading.level === next[index]?.level
        )
          ? current
          : next
      );
    };

    syncHeadings();

    const article = document.querySelector("article");
    if (!article) {
      const timer = window.setTimeout(syncHeadings, 100);
      return () => window.clearTimeout(timer);
    }

    const observer = new MutationObserver(syncHeadings);
    observer.observe(article, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      let currentHeading: TocHeading | null = null;

      for (const heading of headings) {
        const element = document.querySelector(`#${CSS.escape(heading.id)}`);
        if (element && (element as HTMLElement).offsetTop <= scrollPosition) {
          currentHeading = heading;
        } else {
          break;
        }
      }

      setActiveId(currentHeading ? currentHeading.id : null);
    };

    if (headings.length > 0) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [headings]);

  const handleHeadingClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const headingId = e.currentTarget.getAttribute("href")?.slice(1) ?? "";
      const targetElement = document.querySelector(`#${CSS.escape(headingId)}`);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          behavior: "smooth",
          top: offsetPosition,
        });

        window.history.pushState(null, "", `#${headingId}`);
      }
    },
    []
  );

  const handleTocClick = useCallback(() => {
    if (isExpanded) {
      setIsAnimating(true);
      const maxDelay = (headings.length - 1) * 0.05;
      const totalDuration = 200 + maxDelay * 1000;
      window.setTimeout(() => {
        setIsExpanded(false);
        setIsAnimating(false);
      }, totalDuration);
    } else {
      setIsExpanded(true);
    }
  }, [isExpanded, headings.length]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile version - always visible, standard TOC */}
      <div className="mb-6 space-y-4 border border-neutral-200 bg-neutral-50 px-6 py-4 text-black text-sm lg:hidden dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
        <h2 className="mb-4 text-neutral-500 text-sm dark:text-neutral-400">
          Contents
        </h2>
        <nav className="font-normal text-sm">
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  className={`line-clamp-2 block cursor-pointer transition-opacity duration-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                    activeId === heading.id
                      ? "font-medium text-blue-600 dark:text-blue-400"
                      : "text-neutral-700 dark:text-neutral-300"
                  }`}
                  href={`#${heading.id}`}
                  onClick={handleHeadingClick}
                  style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Desktop version - fixed sidebar */}
      <div className="hidden lg:fixed lg:top-1/2 lg:left-6 lg:block lg:max-h-[calc(100vh-6rem)] lg:-translate-y-1/2 lg:overflow-y-auto">
        <button
          aria-expanded={isExpanded}
          aria-label={
            isExpanded
              ? "Collapse table of contents"
              : "Expand table of contents"
          }
          className="cursor-pointer px-1.5 py-2.5 text-left transition-colors duration-200 hover:bg-neutral-900 dark:hover:bg-neutral-900"
          onClick={handleTocClick}
          type="button"
        >
          <div className="relative flex h-fit w-fit flex-col gap-3">
            {headings.map((heading) => (
              <div
                className="h-px w-3 transition-colors duration-200"
                key={heading.id}
                style={{
                  backgroundColor:
                    activeId === heading.id ? "#ffffff" : "#a1a1a1",
                }}
              />
            ))}
          </div>
        </button>
      </div>

      {(isExpanded || isAnimating) && (
        <div
          className="scrollbar-hide hidden lg:fixed lg:top-1/2 lg:left-14 lg:block lg:max-h-[calc(100vh-6rem)] lg:max-w-56 lg:-translate-y-1/2 lg:overflow-y-auto"
          style={{
            animation: isAnimating
              ? "toc-fade-slide-out 200ms cubic-bezier(0.4,0,0.2,1) forwards"
              : "toc-fade-slide-in 200ms cubic-bezier(0.4,0,0.2,1) forwards",
          }}
        >
          <ul className="max-w-56 space-y-3">
            {headings.map((heading, idx) => (
              <li
                key={heading.id}
                style={{
                  animation: isAnimating
                    ? "toc-fade-slide-out 200ms cubic-bezier(0.4,0,0.2,1) both"
                    : "toc-fade-slide-in 200ms cubic-bezier(0.4,0,0.2,1) both",
                  animationDelay: isAnimating
                    ? `${0.03 * idx}s`
                    : `${0.05 * idx + 0.1}s`,
                }}
              >
                <a
                  className={`line-clamp-2 block cursor-pointer break-words text-sm transition-colors duration-200 hover:text-white dark:hover:text-white ${
                    activeId === heading.id
                      ? "text-white dark:text-white"
                      : "text-neutral-400 dark:text-neutral-400"
                  }`}
                  href={`#${heading.id}`}
                  onClick={handleHeadingClick}
                  style={{ paddingLeft: `${(heading.level - 1) * 12 + 8}px` }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TableOfContents;
