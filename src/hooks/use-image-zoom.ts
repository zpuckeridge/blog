import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import type { TransitionEvent } from "react";

const ZOOM_TRANSITION_MS = 200;

interface LockedBox {
  height: number;
  width: number;
}

export interface FlyRect {
  height: number;
  left: number;
  top: number;
  width: number;
}

export interface FlyImage {
  alt: string;
  objectFit: string;
  objectPosition: string;
  rect: FlyRect;
  src: string;
  zoomSrc?: string;
}

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
  const { zoomSrc } = img.dataset;
  const hiResSrc = zoomSrc && zoomSrc !== displaySrc ? zoomSrc : undefined;

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

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const useImageZoom = ({
  isDisabled,
  onZoomChange,
}: {
  isDisabled: boolean;
  onZoomChange?: (
    zoomed: boolean,
    data?: { event: React.SyntheticEvent | Event }
  ) => void;
}) => {
  const slotRef = useRef<HTMLElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
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
    const restore = restoreFocusRef.current ?? slotRef.current;
    restoreFocusRef.current = null;
    restore?.focus();
  }, [clearCloseTimer, unlockSlot]);

  const loadHiResOverlay = useCallback((fly: FlyImage, session: number) => {
    if (!fly.zoomSrc) {
      return;
    }

    const hiRes = new Image();
    const handleLoad = () => {
      if (zoomSessionRef.current !== session) {
        return;
      }

      setOverlaySrc(fly.zoomSrc ?? fly.src);
    };
    hiRes.addEventListener("load", handleLoad, { once: true });
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

    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : slotRef.current;
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
    (event: React.MouseEvent<HTMLElement>) => {
      if (isDisabled) {
        return;
      }

      event.preventDefault();
      open();
    },
    [isDisabled, open]
  );

  const prefetchZoomSrc = useCallback(() => {
    const img = slotRef.current?.querySelector("img");
    if (!img) {
      return;
    }

    const { zoomSrc } = img.dataset;
    if (!zoomSrc || img.dataset.zoomPrefetched === "true") {
      return;
    }

    const preload = new Image();
    preload.src = zoomSrc;
    img.dataset.zoomPrefetched = "true";
  }, []);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const onEscapeClose = useEffectEvent(() => {
    close();
  });

  useEffect(() => {
    if (!isOverlayMounted) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscapeClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isOverlayMounted]);

  return {
    close,
    flyImage,
    handleFlyTransitionEnd,
    handleSlotClick,
    isExpanded,
    isOverlayMounted,
    lockedBox,
    overlaySrc,
    prefetchZoomSrc,
    slotRef,
    transitionMs,
  };
};
