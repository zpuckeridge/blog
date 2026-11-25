import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode, TransitionEvent } from "react";
import { createPortal } from "react-dom";

import { useImageZoom } from "@/hooks/use-image-zoom";
import type { FlyImage } from "@/hooks/use-image-zoom";
import { useMounted } from "@/hooks/use-mounted";
import { fitImageFrame } from "@/lib/image-zoom-frame";
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

const flyBoxTransition = (transitionMs: number): string | undefined =>
  transitionMs > 0
    ? `left ${transitionMs}ms ${ZOOM_EASING}, top ${transitionMs}ms ${ZOOM_EASING}, width ${transitionMs}ms ${ZOOM_EASING}, height ${transitionMs}ms ${ZOOM_EASING}`
    : undefined;

interface ViewportBox {
  height: number;
  offsetLeft: number;
  offsetTop: number;
  width: number;
}

const readViewport = (): ViewportBox => {
  const visual = window.visualViewport;
  return {
    height: visual?.height ?? window.innerHeight,
    offsetLeft: visual?.offsetLeft ?? 0,
    offsetTop: visual?.offsetTop ?? 0,
    width: visual?.width ?? window.innerWidth,
  };
};

const useViewportSize = (): ViewportBox => {
  const [viewport, setViewport] = useState(readViewport);

  useEffect(() => {
    const update = () => {
      setViewport(readViewport());
    };

    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
    };
  }, []);

  return viewport;
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
  setSlotRef,
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
  setSlotRef: React.RefCallback<HTMLElement>;
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
      data-image-zoom=""
      onClick={handleSlotClick}
      onFocus={prefetchZoomSrc}
      onMouseEnter={prefetchZoomSrc}
      onPointerDown={prefetchZoomSrc}
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
  onAspectRatio,
  overlaySrc,
  transitionMs,
  zoomMargin,
}: {
  backdropClassName?: string;
  close: () => void;
  flyImage: FlyImage;
  handleFlyTransitionEnd: (event: TransitionEvent<HTMLButtonElement>) => void;
  isExpanded: boolean;
  onAspectRatio: (aspectRatio: number) => void;
  overlaySrc: string | null;
  transitionMs: number;
  zoomMargin: number;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const viewport = useViewportSize();
  const transition = flyBoxTransition(transitionMs);
  const expandedFrame = fitImageFrame(
    flyImage.aspectRatio,
    { height: viewport.height, width: viewport.width },
    zoomMargin
  );
  const flyStyle: CSSProperties = isExpanded
    ? {
        cursor: "zoom-out",
        height: expandedFrame.height,
        left: expandedFrame.left + viewport.offsetLeft,
        overflow: "hidden",
        position: "fixed",
        top: expandedFrame.top + viewport.offsetTop,
        transform: "none",
        transition,
        width: expandedFrame.width,
        zIndex: 51,
      }
    : {
        cursor: "zoom-out",
        height: flyImage.rect.height,
        left: flyImage.rect.left,
        overflow: "hidden",
        position: "fixed",
        top: flyImage.rect.top,
        transform: "none",
        transition,
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
          decoding="async"
          draggable={false}
          fetchPriority="high"
          onLoad={(event) => {
            const { naturalHeight, naturalWidth } = event.currentTarget;
            if (naturalWidth > 0 && naturalHeight > 0) {
              onAspectRatio(naturalWidth / naturalHeight);
            }
          }}
          src={overlaySrc ?? flyImage.src}
          style={{
            objectFit: "contain",
            objectPosition: "center",
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
    setAspectRatio,
    setSlotRef,
    slotElement,
    transitionMs,
  } = useImageZoom({ isDisabled, onZoomChange });
  const image = slotElement?.querySelector("img");
  const imageAlt = image?.alt ? `Zoom ${image.alt}` : "Zoom image";

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
        setSlotRef={setSlotRef}
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
          onAspectRatio={setAspectRatio}
          overlaySrc={overlaySrc}
          transitionMs={transitionMs}
          zoomMargin={zoomMargin}
        />
      ) : null}
    </>
  );
};
