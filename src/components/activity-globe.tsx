import createGlobe from "cobe";
import { useEffect, useRef } from "react";

import type { ActivityEvent } from "@/lib/activity-feed";

interface ActivityGlobeProps {
  events: ActivityEvent[];
}

const ActivityGlobe = ({ events }: ActivityGlobeProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(max-width: 767px)").matches) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDark = document.documentElement.classList.contains("dark");
    const markers: {
      location: [number, number];
      size: number;
      id: string;
    }[] = [];
    for (const event of events) {
      if (
        event.latitude === null ||
        event.longitude === null ||
        event.city === null
      ) {
        continue;
      }
      const key = `${event.latitude}:${event.longitude}`;
      if (markers.some((marker) => marker.id === key)) {
        continue;
      }
      markers.push({
        id: key,
        location: [event.latitude, event.longitude],
        size: 0.04,
      });
      if (markers.length === 40) {
        break;
      }
    }

    const globe = createGlobe(canvas, {
      baseColor: isDark ? [0.09, 0.09, 0.09] : [0.92, 0.92, 0.92],
      dark: isDark ? 1 : 0,
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      diffuse: 1.2,
      glowColor: isDark ? [0.08, 0.08, 0.08] : [0.82, 0.82, 0.82],
      height: 640,
      mapBaseBrightness: isDark ? 0.03 : 0.02,
      mapBrightness: isDark ? 2.4 : 1.7,
      mapSamples: 16_000,
      markerColor: isDark ? [1, 0.36, 0.12] : [0.86, 0.2, 0.05],
      markers,
      phi: 0,
      theta: 0.15,
      width: 640,
    });

    let animationFrame = 0;
    if (!reducedMotion) {
      let frame = 0;
      const animate = () => {
        globe.update({ phi: (frame / 2000) % (Math.PI * 2) });
        frame += 1;
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      globe.destroy();
    };
  }, [events]);

  return (
    <div className="hidden min-h-80 items-center justify-center lg:flex">
      <canvas
        aria-label="Globe showing approximate locations of recent visitors"
        className="max-w-full"
        height={640}
        ref={canvasRef}
        width={640}
      />
    </div>
  );
};

export default ActivityGlobe;
