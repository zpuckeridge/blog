"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { BlurFade } from "@/src/components/magicui/blur-fade";

export default function CallToFaith() {
	const slides = [
		{
			text: "For all have sinned and fall short of the glory of God.",
			reference: "Romans 3:23",
			index: 1,
		},
		{
			text: "For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord.",
			reference: "Romans 6:23",
			index: 2,
		},
		{
			text: "God shows his love for us in that while we were still sinners, Christ died for us.",
			reference: "Romans 5:8",
			index: 3,
		},
		{
			text: "So, confess with your mouth that Jesus is Lord and believe in your heart that God raised Him from the dead.",
			reference: "Romans 10:9",
			index: 4,
		},
		{
			text: "For everyone who calls on the name of the Lord will be saved.",
			reference: "Romans 10:13",
			index: 5,
		},
		{
			text: "Therefore, since we have been justified by faith alone, we have peace with God through our Lord Jesus Christ.",
			reference: "Romans 5:1",
			index: 6,
		},
		{
			text: "There is therefore now no condemnation for those who are in Christ Jesus!",
			reference: "Romans 8:1",
			index: 7,
		},
	];

	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	const currentSlide = slides[currentSlideIndex];

	const [timeLeft, setTimeLeft] = useState(5); // 5 seconds
	const requestRef = useRef<number | null>(null);
	const previousTimeRef = useRef<number | null>(null);

	const radius = 90;
	const circumference = radius * 2 * Math.PI;
	const strokeDashoffset = circumference - (timeLeft / 5) * circumference;

	const animate = useCallback((time: number) => {
		if (previousTimeRef.current != null) {
			const deltaTime = time - previousTimeRef.current;
			setTimeLeft((prevTime) => {
				if (prevTime <= 0) {
					return 5; // Reset to 5 when it reaches 0
				}
				return Math.max(0, prevTime - deltaTime / 1000);
			});
		}
		previousTimeRef.current = time;
		requestRef.current = requestAnimationFrame(animate);
	}, []);

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate);
		return () => {
			if (requestRef.current) {
				cancelAnimationFrame(requestRef.current);
			}
		};
	}, [animate]);

	const goToPreviousSlide = () => {
		setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
		setTimeLeft(5); // Reset timer
	};

	const goToNextSlide = () => {
		setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
		setTimeLeft(5); // Reset timer
	};

	return (
		<div className="w-full">
			<div className="my-auto flex place-items-center">
				<div className="flex w-full flex-col gap-2 text-sm">
					<BlurFade delay={0.25} inView key={currentSlideIndex}>
						<div className="flex h-[4rem] items-center">
							<p className="text-sm">{currentSlide.text}</p>
						</div>
					</BlurFade>
					<div className="flex justify-between gap-2">
						<div className="flex gap-2">
							<p className="text-muted-foreground text-xs">
								{currentSlide.reference} — {currentSlide.index} / {slides.length}
							</p>

							<svg
								aria-label="Timer"
								className="my-auto"
								height="14"
								role="timer"
								viewBox="0 0 200 200"
								width="14"
							>
								<circle
									className="dark:stroke-[#a3a3a3]"
									cx="100"
									cy="100"
									fill="none"
									r={radius}
									stroke="#e2e8f0"
									strokeWidth="20"
								/>
								<circle
									className="dark:stroke-[#245fe0]"
									cx="100"
									cy="100"
									fill="none"
									r={radius}
									stroke="#65a8ec"
									strokeDasharray={circumference}
									strokeDashoffset={strokeDashoffset}
									strokeLinecap="round"
									strokeWidth="20"
									style={{ transition: "stroke-dashoffset 0.1s linear" }}
									transform="rotate(-90 100 100)"
								/>
							</svg>
						</div>

						<div className="my-auto flex gap-4">
							<button
								aria-label="Previous slide"
								className="text-muted-foreground transition hover:text-blue-400 dark:hover:text-blue-600"
								onClick={goToPreviousSlide} // Added padding for larger touch target
								type="button"
							>
								<ArrowLeftIcon className="h-4 w-4" />
							</button>
							<button
								aria-label="Next slide"
								className="text-muted-foreground transition hover:text-blue-400 dark:hover:text-blue-600"
								onClick={goToNextSlide} // Added padding for larger touch target
								type="button"
							>
								<ArrowRightIcon className="h-4 w-4" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// TODO:
// Need to make sure that the timer is reset when the user clicks on the previous or next button.
