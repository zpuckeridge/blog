import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import type { TransitionEvent } from "react";

import {
  cachedImageSize,
  isImageSrcCached,
  resolveHiResZoomSrc,
  whenImageReady,
} from "@/lib/image-zoom-src";
import type { ImageSize } from "@/lib/image-zoom-src";

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
  /** width / height of the image file, not the cropped thumbnail box. */
  aspectRatio: number;
  rect: FlyRect;
  src: string;
  zoomSrc?: string;
}

const ASPECT_RATIO_EPSILON = 0.001;

const aspectRatioFromSize = (size: ImageSize): number | null => {
  if (size.width <= 0 || size.height <= 0) {
    return null;
  }

  return size.width / size.height;
};

const imageAspectRatio = (
  img: HTMLImageElement,
  zoomSrc: string | undefined
): number => {
  const natural = aspectRatioFromSize({
    height: img.naturalHeight,
    width: img.naturalWidth,
  });
  if (natural !== null) {
    return natural;
  }

  const cached =
    (zoomSrc ? cachedImageSize(zoomSrc) : undefined) ??
    cachedImageSize(img.currentSrc || img.src);
  const cachedAspect = cached ? aspectRatioFromSize(cached) : null;
  return cachedAspect ?? 1;
};

const withAspectRatio = (
  current: FlyImage | null,
  aspectRatio: number
): FlyImage | null => {
  if (!current || !Number.isFinite(aspectRatio) || aspectRatio <= 0) {
    return current;
  }

  if (Math.abs(current.aspectRatio - aspectRatio) < ASPECT_RATIO_EPSILON) {
    return current;
  }

  return { ...current, aspectRatio };
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

  const displaySrc = img.currentSrc || img.src;
  const hiResSrc = resolveHiResZoomSrc(displaySrc, img.dataset.zoomSrc);

  return {
    alt: img.alt,
    aspectRatio: imageAspectRatio(img, hiResSrc),
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
  const [slotElement, setSlotElement] = useState<HTMLElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const zoomSessionRef = useRef(0);
  const [lockedBox, setLockedBox] = useState<LockedBox | null>(null);
  const [flyImage, setFlyImage] = useState<FlyImage | null>(null);
  const [overlaySrc, setOverlaySrc] = useState<string | null>(null);
  const [isOverlayMounted, setIsOverlayMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const setSlotRef = useCallback((slot: HTMLElement | null) => {
    slotRef.current = slot;
    setSlotElement(slot);
  }, []);

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

    const applyHiRes = (size: ImageSize) => {
      if (zoomSessionRef.current !== session) {
        return;
      }

      setOverlaySrc(fly.zoomSrc ?? fly.src);
      const aspectRatio = aspectRatioFromSize(size);
      if (aspectRatio === null) {
        return;
      }

      setFlyImage((current) => withAspectRatio(current, aspectRatio));
    };

    const cached = cachedImageSize(fly.zoomSrc);
    if (cached) {
      applyHiRes(cached);
      return;
    }

    void whenImageReady(fly.zoomSrc)
      .then(applyHiRes)
      .catch(() => {
        // Keep the display source if high-res fails.
      });
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
    onZoomChange?.(true);
    loadHiResOverlay(nextFlyImage, session);

    if (!reduceMotion) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (zoomSessionRef.current === session) {
            setIsExpanded(true);
          }
        });
      });
    }
  }, [
    clearCloseTimer,
    isDisabled,
    isOverlayMounted,
    loadHiResOverlay,
    lockSlot,
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
      if (isExpanded || !isOverlayMounted) {
        return;
      }

      if (event.propertyName !== "width" && event.propertyName !== "height") {
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

  const setAspectRatio = useCallback((aspectRatio: number) => {
    setFlyImage((current) => withAspectRatio(current, aspectRatio));
  }, []);

  const prefetchZoomSrc = useCallback(() => {
    const img = slotRef.current?.querySelector("img");
    if (!img) {
      return;
    }

    const zoomSrc = resolveHiResZoomSrc(
      img.currentSrc || img.src,
      img.dataset.zoomSrc
    );
    if (!zoomSrc || img.dataset.zoomPrefetched === "true") {
      return;
    }

    img.dataset.zoomPrefetched = "true";

    if (isImageSrcCached(zoomSrc)) {
      return;
    }

    void whenImageReady(zoomSrc).catch(() => {
      img.dataset.zoomPrefetched = "false";
    });
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
    setAspectRatio,
    setSlotRef,
    slotElement,
    transitionMs,
  };
};
