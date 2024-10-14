"use client";

import { useEffect, useState } from "react";

export default function TableOfContents({ content }: { content: any }) {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null); // Added state for active heading

  useEffect(() => {
    // New logic to extract headings from the markdown content
    const headingRegex = /^(#{1,6})\s+(.*)$/gm; // Regex to match markdown headings
    const newHeadings: { id: string; text: string }[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length; // Number of '#' indicates heading level
      const text = match[2];
      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""); // Create an ID from the text, removing special characters
      newHeadings.push({ id, text });
    }

    setHeadings(newHeadings);
  }, [content]); // Added content as a dependency

  // New effect to update active heading based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const currentHeading = headings.reduce(
        (prev, heading) => {
          const element = document.getElementById(heading.id);
          if (element && element.offsetTop <= scrollPosition + 10) {
            return heading; // Return the last heading that is in view
          }
          return prev; // Keep the previous heading if the current one is not in view
        },
        null as { id: string; text: string } | null,
      );

      setActiveId(currentHeading ? currentHeading.id : null);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  return (
    <div className="lg:fixed lg:top-20 lg:left-8 text-xs text-muted-foreground hidden lg:block">
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300 max-w-[200px] line-clamp-3 ${activeId === heading.id ? "text-blue-600 dark:text-blue-400" : ""}`} // Updated class for active link
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
