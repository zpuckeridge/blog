import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode, TransitionEvent } from "react";
import { createPortal } from "react-dom";

import { useImageZoom } from "@/hooks/use-image-zoom";
import type { FlyImage, FlyRect } from "@/hooks/use-image-zoom";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const ZOOM_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

interface ImageZoomProps {
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
}

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

const ImageZoomSlot = ({
  aspectVideo,
  children,
  className,
  handleSlotClick,
  imageAlt,
  isDisabled,
  lockedBox,
  prefetchZoomSrc,
  slotRef,
  wrapElement,
}: {
  aspectVideo: boolean;
  children: ReactNode;
  className?: string;
  handleSlotClick: (event: React.MouseEvent<HTMLElement>) => void;
  imageAlt: string;
  isDisabled: boolean;
  lockedBox: { height: number; width: number } | null;
  prefetchZoomSrc: () => void;
  slotRef: React.RefObject<HTMLElement | null>;
  wrapElement: "div" | "span";
}) => {
  const Inner = wrapElement;
  let slotSizeClass: string | null = null;
  if (!lockedBox) {
    slotSizeClass = aspectVideo ? "aspect-video w-full" : "size-full";
  }

  const slotClassName = cn(
    "relative shrink-0 overflow-hidden border-0 bg-transparent p-0 text-left",
    slotSizeClass,
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

  const inner = (
    <Inner
      className={cn(
        "block size-full min-h-0 [&_img]:cursor-zoom-in",
        className
      )}
    >
      {children}
    </Inner>
  );
  const setSlotRef = (node: HTMLElement | null) => {
    slotRef.current = node;
  };

  if (isDisabled) {
    return (
      <div className={slotClassName} ref={setSlotRef} style={slotStyle}>
        {inner}
      </div>
    );
  }

  return (
    <button
      aria-haspopup="dialog"
      aria-label={imageAlt}
      className={slotClassName}
      onClick={handleSlotClick}
      onFocus={prefetchZoomSrc}
      onMouseEnter={prefetchZoomSrc}
      ref={setSlotRef}
      style={slotStyle}
      type="button"
    >
      {inner}
    </button>
  );
};

const ImageZoomOverlay = ({
  backdropClassName,
  close,
  flyImage,
  handleFlyTransitionEnd,
  isExpanded,
  overlaySrc,
  transitionMs,
  zoomMargin,
}: {
  backdropClassName?: string;
  close: () => void;
  flyImage: FlyImage;
  handleFlyTransitionEnd: (event: TransitionEvent<HTMLButtonElement>) => void;
  isExpanded: boolean;
  overlaySrc: string | null;
  transitionMs: number;
  zoomMargin: number;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const flyStyle: CSSProperties = {
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
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }
    closeButtonRef.current?.focus();

    const getFocusable = () =>
      [
        ...dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ),
      ].filter((element) => !element.hasAttribute("disabled"));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusable();
      const [first] = focusable;
      const last = focusable.at(-1);
      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onCancel = (event: Event) => {
      event.preventDefault();
      close();
    };

    dialog.addEventListener("keydown", onKeyDown);
    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("keydown", onKeyDown);
      dialog.removeEventListener("cancel", onCancel);
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [close]);

  return createPortal(
    <dialog
      aria-label={flyImage.alt || "Zoomed image"}
      className="fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-transparent"
      ref={dialogRef}
    >
      <button
        aria-label="Close image zoom"
        className={cn(
          "fixed inset-0 z-50 border-0 bg-background/80 p-0 backdrop-blur-md transition-opacity",
          isExpanded ? "opacity-100" : "opacity-0",
          backdropClassName
        )}
        onClick={close}
        ref={closeButtonRef}
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
    </dialog>,
    document.body
  );
};

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
  const {
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
  } = useImageZoom({ isDisabled, onZoomChange });
  const [imageAlt, setImageAlt] = useState("Zoom image");

  useEffect(() => {
    const img = slotRef.current?.querySelector("img");
    setImageAlt(img?.alt ? `Zoom ${img.alt}` : "Zoom image");
  }, [children, slotRef]);

  return (
    <>
      <ImageZoomSlot
        aspectVideo={aspectVideo}
        className={className}
        handleSlotClick={handleSlotClick}
        imageAlt={imageAlt}
        isDisabled={isDisabled}
        lockedBox={lockedBox}
        prefetchZoomSrc={prefetchZoomSrc}
        slotRef={slotRef}
        wrapElement={wrapElement}
      >
        {children}
      </ImageZoomSlot>
      {mounted && isOverlayMounted && flyImage ? (
        <ImageZoomOverlay
          backdropClassName={backdropClassName}
          close={close}
          flyImage={flyImage}
          handleFlyTransitionEnd={handleFlyTransitionEnd}
          isExpanded={isExpanded}
          overlaySrc={overlaySrc}
          transitionMs={transitionMs}
          zoomMargin={zoomMargin}
        />
      ) : null}
    </>
  );
};
