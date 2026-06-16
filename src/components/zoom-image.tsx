"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type TransitionEvent,
} from "react";
import { createPortal } from "react-dom";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const ZOOM_TRANSITION_MS = 200;
const ZOOM_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

interface LockedBox {
  height: number;
  width: number;
}

interface FlyRect {
  height: number;
  left: number;
  top: number;
  width: number;
}

interface FlyImage {
  alt: string;
  objectFit: string;
  objectPosition: string;
  rect: FlyRect;
  src: string;
  zoomSrc?: string;
}

type ImageZoomProps = {
  aspectVideo?: boolean;
  backdropClassName?: string;
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  onZoomChange?: (
    zoomed: boolean,
    data?: { event: React.SyntheticEvent | Event }
  ) => void;
  wrapElement?: "div" | "span";
  zoomMargin?: number;
};

const measureFlyImage = (slot: HTMLElement): FlyImage | null => {
  const img = slot.querySelector("img");
  if (!img) {
    return null;
  }

  const rect = img.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) {
    return null;
  }

  const computed = window.getComputedStyle(img);
  const displaySrc = img.currentSrc || img.src;
  const zoomSrc = img.dataset.zoomSrc;
  const hiResSrc =
    zoomSrc && zoomSrc !== displaySrc ? zoomSrc : undefined;

  return {
    alt: img.alt,
    objectFit: computed.objectFit || "cover",
    objectPosition: computed.objectPosition || "center",
    rect: {
      height: rect.height,
      left: rect.left,
      top: rect.top,
      width: rect.width,
    },
    src: displaySrc,
    zoomSrc: hiResSrc,
  };
};

const getZoomTransform = (rect: FlyRect, margin: number): string => {
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  const availableW = Math.max(viewportW - margin * 2, 1);
  const availableH = Math.max(viewportH - margin * 2, 1);
  const scale = Math.min(availableW / rect.width, availableH / rect.height);
  const centerX = viewportW / 2;
  const centerY = viewportH / 2;
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  return `translate(${centerX - originX}px, ${centerY - originY}px) scale(${scale})`;
};

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const ImageZoom = ({
  aspectVideo = false,
  backdropClassName,
  children,
  className,
  isDisabled = false,
  onZoomChange,
  wrapElement = "div",
  zoomMargin = 24,
}: ImageZoomProps) => {
  const mounted = useMounted();
  const slotRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const zoomSessionRef = useRef(0);
  const [lockedBox, setLockedBox] = useState<LockedBox | null>(null);
  const [flyImage, setFlyImage] = useState<FlyImage | null>(null);
  const [overlaySrc, setOverlaySrc] = useState<string | null>(null);
  const [isOverlayMounted, setIsOverlayMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const reduceMotion = prefersReducedMotion();
  const transitionMs = reduceMotion ? 0 : ZOOM_TRANSITION_MS;

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const lockSlot = useCallback(() => {
    const slot = slotRef.current;
    if (!slot) {
      return;
    }

    const { width, height } = slot.getBoundingClientRect();
    if (width > 0 && height > 0) {
      setLockedBox({
        height: Math.round(height),
        width: Math.round(width),
      });
    }
  }, []);

  const unlockSlot = useCallback(() => {
    setLockedBox(null);
  }, []);

  const finishClose = useCallback(() => {
    clearCloseTimer();
    zoomSessionRef.current += 1;
    setIsOverlayMounted(false);
    setIsExpanded(false);
    setFlyImage(null);
    setOverlaySrc(null);
    unlockSlot();
    document.documentElement.classList.remove("image-zoom-open");
  }, [clearCloseTimer, unlockSlot]);

  const loadHiResOverlay = useCallback((fly: FlyImage, session: number) => {
    if (!fly.zoomSrc) {
      return;
    }

    const hiRes = new Image();
    hiRes.onload = () => {
      if (zoomSessionRef.current !== session) {
        return;
      }

      setOverlaySrc(fly.zoomSrc ?? fly.src);
    };
    hiRes.src = fly.zoomSrc;
  }, []);

  const open = useCallback(() => {
    if (isDisabled || isOverlayMounted) {
      return;
    }

    const slot = slotRef.current;
    if (!slot) {
      return;
    }

    const nextFlyImage = measureFlyImage(slot);
    if (!nextFlyImage) {
      return;
    }

    clearCloseTimer();
    lockSlot();
    const session = zoomSessionRef.current + 1;
    zoomSessionRef.current = session;
    setFlyImage(nextFlyImage);
    setOverlaySrc(nextFlyImage.src);
    setIsOverlayMounted(true);
    setIsExpanded(reduceMotion);
    document.documentElement.classList.add("image-zoom-open");
    loadHiResOverlay(nextFlyImage, session);

    onZoomChange?.(true);

    if (!reduceMotion) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsExpanded(true));
      });
    }
  }, [
    clearCloseTimer,
    isDisabled,
    isOverlayMounted,
    lockSlot,
    loadHiResOverlay,
    onZoomChange,
    reduceMotion,
  ]);

  const close = useCallback(() => {
    if (!isOverlayMounted) {
      return;
    }

    const slot = slotRef.current;
    if (slot) {
      const nextFlyImage = measureFlyImage(slot);
      if (nextFlyImage) {
        setFlyImage(nextFlyImage);
      }
    }

    onZoomChange?.(false);

    if (reduceMotion) {
      finishClose();
      return;
    }

    setIsExpanded(false);
    clearCloseTimer();
    closeTimerRef.current = setTimeout(finishClose, transitionMs + 50);
  }, [
    clearCloseTimer,
    finishClose,
    isOverlayMounted,
    onZoomChange,
    reduceMotion,
    transitionMs,
  ]);

  const handleFlyTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLButtonElement>) => {
      if (
        event.propertyName !== "transform" ||
        isExpanded ||
        !isOverlayMounted
      ) {
        return;
      }

      clearCloseTimer();
      finishClose();
    },
    [clearCloseTimer, finishClose, isExpanded, isOverlayMounted]
  );

  const handleSlotClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled) {
        return;
      }

      if ((event.target as HTMLElement).closest("img")) {
        event.preventDefault();
        open();
      }
    },
    [isDisabled, open]
  );

  const handleSlotKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isDisabled) {
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    },
    [isDisabled, open]
  );

  const prefetchZoomSrc = useCallback(() => {
    const img = slotRef.current?.querySelector("img");
    if (!img) {
      return;
    }

    const zoomSrc = img.dataset.zoomSrc;
    if (!zoomSrc || img.dataset.zoomPrefetched === "true") {
      return;
    }

    const preload = new Image();
    preload.src = zoomSrc;
    img.dataset.zoomPrefetched = "true";
  }, []);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    if (!isOverlayMounted) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [close, isOverlayMounted]);

  const Inner = wrapElement;
  const innerClassName = cn(
    "block size-full min-h-0 [&_img]:cursor-zoom-in",
    className
  );

  const slotClassName = cn(
    "relative shrink-0 overflow-hidden",
    lockedBox ? null : aspectVideo ? "aspect-video w-full" : "size-full",
    !isDisabled && "[&_img]:cursor-zoom-in"
  );

  const slotStyle = lockedBox
    ? {
        height: lockedBox.height,
        maxHeight: lockedBox.height,
        maxWidth: lockedBox.width,
        minHeight: lockedBox.height,
        minWidth: lockedBox.width,
        width: lockedBox.width,
      }
    : undefined;

  const flyStyle: CSSProperties | undefined = flyImage
    ? {
        cursor: "zoom-out",
        height: flyImage.rect.height,
        left: flyImage.rect.left,
        overflow: "hidden",
        position: "fixed",
        top: flyImage.rect.top,
        transform: isExpanded
          ? getZoomTransform(flyImage.rect, zoomMargin)
          : "translate(0, 0) scale(1)",
        transformOrigin: "center center",
        transition:
          transitionMs > 0
            ? `transform ${transitionMs}ms ${ZOOM_EASING}`
            : undefined,
        width: flyImage.rect.width,
        zIndex: 51,
      }
    : undefined;

  const overlay =
    mounted && isOverlayMounted && flyImage
      ? createPortal(
          <>
            <button
              aria-label="Close image zoom"
              className={cn(
                "fixed inset-0 z-50 border-0 bg-background/80 p-0 backdrop-blur-md transition-opacity",
                isExpanded ? "opacity-100" : "opacity-0",
                backdropClassName
              )}
              onClick={close}
              style={{
                cursor: "zoom-out",
                transitionDuration: `${transitionMs}ms`,
              }}
              type="button"
            />
            <button
              aria-label="Close image zoom"
              className="fixed z-[51] border-0 bg-transparent p-0"
              onClick={close}
              onTransitionEnd={handleFlyTransitionEnd}
              style={flyStyle}
              type="button"
            >
              <img
                alt={flyImage.alt}
                className={cn("pointer-events-none size-full select-none")}
                draggable={false}
                src={overlaySrc ?? flyImage.src}
                style={{
                  objectFit: flyImage.objectFit as CSSProperties["objectFit"],
                  objectPosition: flyImage.objectPosition,
                }}
              />
            </button>
          </>,
          document.body
        )
      : null;

  return (
    <>
      <div
        className={slotClassName}
        onClick={handleSlotClick}
        onKeyDown={handleSlotKeyDown}
        onMouseEnter={prefetchZoomSrc}
        onFocus={prefetchZoomSrc}
        ref={slotRef}
        role="presentation"
        style={slotStyle}
      >
        <Inner className={innerClassName}>{children}</Inner>
      </div>
      {overlay}
    </>
  );
};
