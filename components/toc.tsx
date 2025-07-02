"use client";

import { useEffect, useState } from "react";

export default function TableOfContents() {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // Extract headings from the DOM after the component mounts
    const extractHeadings = () => {
      const article = document.querySelector("article");
      if (!article) return;

      const headingElements = article.querySelectorAll(
        "h1, h2, h3, h4, h5, h6",
      );
      const newHeadings: { id: string; text: string; level: number }[] = [];

      headingElements.forEach((element) => {
        // Skip headings that are within footnotes sections
        if (element.closest(".footnotes")) {
          return;
        }

        const id = element.id;
        const text = element.textContent || "";
        const level = parseInt(element.tagName.charAt(1));

        if (id && text) {
          newHeadings.push({ id, text, level });
        }
      });

      setHeadings(newHeadings);
    };

    // Wait for the content to be rendered
    const timer = setTimeout(extractHeadings, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Add offset for better detection

      let currentHeading: { id: string; text: string; level: number } | null =
        null;

      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element && element.offsetTop <= scrollPosition) {
          currentHeading = heading;
        } else {
          break; // Stop at the first heading that's below the scroll position
        }
      }

      setActiveId(currentHeading ? currentHeading.id : null);
    };

    if (headings.length > 0) {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Check initial position
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [headings]);

  const handleHeadingClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    headingId: string,
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(headingId);

    if (targetElement) {
      // Calculate the target position with offset for the fixed header
      const headerOffset = 80; // Adjust this value based on your header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update the URL hash without triggering a jump
      window.history.pushState(null, "", `#${headingId}`);
    }
  };

  if (headings.length === 0) {
    return null; // Don't render if no headings found
  }

  return (
    <div className="hidden lg:block lg:fixed lg:top-20 lg:left-8 lg:w-64 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <div className="text-sm text-muted-foreground">
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleHeadingClick(e, heading.id)}
                className={`block hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300 line-clamp-2 cursor-pointer ${
                  activeId === heading.id
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : ""
                }`}
                style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
