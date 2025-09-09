"use client";

import { useEffect, useState } from "react";

export default function TableOfContents() {
	const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
	const [activeId, setActiveId] = useState<string | null>(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		// Extract headings from the DOM after the component mounts
		const extractHeadings = () => {
			const article = document.querySelector("article");
			if (!article) {
				return;
			}

			const headingElements = article.querySelectorAll("h1, h2, h3, h4, h5, h6");
			const newHeadings: { id: string; text: string; level: number }[] = [];

			for (const element of Array.from(headingElements)) {
				// Skip headings that are within footnotes sections
				if (element.closest(".footnotes")) {
					return;
				}

				const id = element.id;
				const text = element.textContent || "";
				const level = Number.parseInt(element.tagName.charAt(1), 10);

				if (id && text) {
					newHeadings.push({ id, text, level });
				}
			}

			setHeadings(newHeadings);
		};

		// Wait for the content to be rendered
		const timer = setTimeout(extractHeadings, 100);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + 100; // Add offset for better detection

			let currentHeading: { id: string; text: string; level: number } | null = null;

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

	const handleHeadingClick = (e: React.MouseEvent<HTMLAnchorElement>, headingId: string) => {
		e.preventDefault();
		const targetElement = document.getElementById(headingId);

		if (targetElement) {
			// Calculate the target position with offset for the fixed header
			const headerOffset = 80; // Adjust this value based on your header height
			const elementPosition = targetElement.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});

			// Update the URL hash without triggering a jump
			window.history.pushState(null, "", `#${headingId}`);
		}
	};

	const handleTocClick = () => {
		if (isExpanded) {
			// Start exit animation
			setIsAnimating(true);
			// Wait for animation to complete before hiding
			// Account for staggered delays: base duration + max delay
			const maxDelay = (headings.length - 1) * 0.05;
			const totalDuration = 400 + maxDelay * 1000;
			setTimeout(() => {
				setIsExpanded(false);
				setIsAnimating(false);
			}, totalDuration);
		} else {
			setIsExpanded(true);
		}
	};

	if (headings.length === 0) {
		return null; // Don't render if no headings found
	}

	return (
		<>
			{/* Mobile version - always visible, standard TOC */}
			<div className="mb-6 space-y-4 rounded-lg border border-neutral-200 bg-neutral-50 px-6 py-4 text-black text-sm lg:hidden dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
				<h2 className="mb-4 text-neutral-500 text-xs dark:text-neutral-400">Contents</h2>
				<nav className="font-normal text-[13px]">
					<ul className="space-y-2">
						{headings.map((heading) => (
							<li key={heading.id}>
								<a
									className={`line-clamp-2 block cursor-pointer transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${
										activeId === heading.id
											? "font-medium text-blue-600 dark:text-blue-400"
											: "text-neutral-700 dark:text-neutral-300"
									}`}
									href={`#${heading.id}`}
									onClick={(e) => handleHeadingClick(e, heading.id)}
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
			<div className="lg:-translate-y-1/2 hidden lg:fixed lg:top-1/2 lg:left-6 lg:block lg:max-h-[calc(100vh-6rem)] lg:transform lg:overflow-y-auto">
				<button
					className="cursor-pointer rounded px-1.5 py-2.5 text-left transition-all duration-300 hover:bg-neutral-900 dark:hover:bg-neutral-900"
					onClick={handleTocClick}
					type="button"
				>
					<div className="relative flex h-fit w-fit flex-col gap-3">
						{headings.map((heading) => (
							<div
								className="h-px w-3 transition-all duration-300"
								key={heading.id}
								style={{
									backgroundColor: activeId === heading.id ? "#ffffff" : "#a1a1a1",
								}}
							/>
						))}
					</div>
				</button>
			</div>

			{/* Expanded content with proper exit animation */}
			{(isExpanded || isAnimating) && (
				<div
					className="lg:-translate-y-1/2 hidden lg:fixed lg:top-1/2 lg:left-14 lg:block lg:max-h-[calc(100vh-6rem)] lg:transform lg:overflow-y-auto"
					style={{
						animation: isAnimating
							? "toc-fade-slide-out 0.4s cubic-bezier(0.4,0,0.2,1) forwards"
							: "toc-fade-slide-in 0.4s cubic-bezier(0.4,0,0.2,1) forwards",
					}}
				>
					<ul className="space-y-3">
						{headings.map((heading, idx) => (
							<li
								key={heading.id}
								style={{
									animation: isAnimating
										? "toc-fade-slide-out 0.4s cubic-bezier(0.4,0,0.2,1) both"
										: "toc-fade-slide-in 0.4s cubic-bezier(0.4,0,0.2,1) both",
									animationDelay: isAnimating ? `${0.03 * idx}s` : `${0.05 * idx + 0.1}s`,
								}}
							>
								<a
									className={`line-clamp-2 block cursor-pointer text-xs transition-all duration-300 hover:text-white dark:hover:text-white ${
										activeId === heading.id
											? "text-white dark:text-white"
											: "text-neutral-400 dark:text-neutral-400"
									}`}
									href={`#${heading.id}`}
									onClick={(e) => handleHeadingClick(e, heading.id)}
									style={{ paddingLeft: `${(heading.level - 1) * 12 + 8}px` }}
								>
									{heading.text}
								</a>
							</li>
						))}
					</ul>
					<style global jsx>{`
						@keyframes toc-fade-slide-in {
							from {
								opacity: 0;
								transform: translateX(-24px);
							}
							to {
								opacity: 1;
								transform: translateX(0);
							}
						}

						@keyframes toc-fade-slide-out {
							from {
								opacity: 1;
								transform: translateX(0);
							}
							to {
								opacity: 0;
								transform: translateX(-24px);
							}
						}
					`}</style>
				</div>
			)}
		</>
	);
}
