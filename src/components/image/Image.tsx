/**
 * @file Image component — enhanced image with preview overlay.
 *
 * Extends the native `<img>` element with a click-to-preview modal that
 * supports zoom, rotation, and keyboard navigation. Also provides an
 * `Image.PreviewGroup` for browsing a gallery of images. Includes fallback
 * and placeholder support for loading states.
 *
 * Key props: `src`, `preview`, `fallback`, `placeholder`.
 *
 * @example
 * ```tsx
 * <Image src="/photo.jpg" width={200} />
 * <Image src="/photo.jpg" preview={false} />
 * <Image.PreviewGroup items={['/a.jpg', '/b.jpg']}>
 *   <Image src="/a.jpg" />
 *   <Image src="/b.jpg" />
 * </Image.PreviewGroup>
 * ```
 *
 * @see {@link ./types.ts} for prop type definitions
 * @see {@link ./index.ts} for the public export
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
  RotateCwIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
} from "lucide-react";
import type { ImageProps, PreviewGroupProps, PreviewConfig } from "./types";

// ---------------------------------------------------------------------------
// Preview Modal
// ---------------------------------------------------------------------------

interface PreviewModalProps {
  visible: boolean;
  src: string;
  alt?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  scaleStep?: number;
  minScale?: number;
  maxScale?: number;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  visible,
  src,
  alt,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  scaleStep = 0.5,
  minScale = 0.25,
  maxScale = 5,
}) => {
  const [scale, setScale] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);

  React.useEffect(() => {
    if (visible) {
      setScale(1);
      setRotation(0);
    }
  }, [visible, src]);

  React.useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev && hasPrev) onPrev();
      if (e.key === "ArrowRight" && onNext && hasNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          onClick={() => setScale(Math.max(minScale, scale - scaleStep))}
          title="Zoom out"
        >
          <ZoomOutIcon className="size-5" />
        </button>
        <button
          className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          onClick={() => setScale(Math.min(maxScale, scale + scaleStep))}
          title="Zoom in"
        >
          <ZoomInIcon className="size-5" />
        </button>
        <button
          className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          onClick={() => setRotation(rotation + 90)}
          title="Rotate"
        >
          <RotateCwIcon className="size-5" />
        </button>
        <button
          className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          onClick={onClose}
          title="Close"
        >
          <XIcon className="size-5" />
        </button>
      </div>

      {/* Navigation arrows */}
      {onPrev && hasPrev && (
        <button
          className="absolute left-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          onClick={onPrev}
        >
          <ChevronLeftIcon className="size-6" />
        </button>
      )}
      {onNext && hasNext && (
        <button
          className="absolute right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          onClick={onNext}
        >
          <ChevronRightIcon className="size-6" />
        </button>
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className="relative z-[1] max-h-[85vh] max-w-[85vw] object-contain transition-transform"
        style={{
          transform: `scale(${scale}) rotate(${rotation}deg)`,
        }}
        draggable={false}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// InternalImage
// ---------------------------------------------------------------------------

const InternalImage = React.forwardRef<HTMLDivElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      preview = true,
      fallback,
      placeholder,
      rootClassName,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const [imgError, setImgError] = React.useState(false);
    const [imgLoaded, setImgLoaded] = React.useState(false);
    const [previewVisible, setPreviewVisible] = React.useState(false);

    const previewConfig: PreviewConfig | false =
      preview === false
        ? false
        : preview === true
          ? {}
          : preview;

    const isControlledPreview = previewConfig !== false && previewConfig.visible !== undefined;
    const showPreview =
      previewConfig !== false &&
      (isControlledPreview ? previewConfig.visible : previewVisible);

    const handlePreviewChange = (vis: boolean) => {
      if (previewConfig !== false && previewConfig.onVisibleChange) {
        previewConfig.onVisibleChange(vis);
      }
      if (!isControlledPreview) {
        setPreviewVisible(vis);
      }
    };

    const displaySrc = imgError && fallback ? fallback : src;
    const previewSrc = previewConfig !== false && previewConfig.src ? previewConfig.src : displaySrc;

    const showPlaceholder = placeholder && !imgLoaded && !imgError;

    return (
      <>
        <div
          ref={ref}
          className={cn(
            "relative inline-block overflow-hidden",
            rootClassName,
          )}
          style={{ width, height }}
        >
          {showPlaceholder && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              {placeholder === true ? (
                <div className="animate-pulse bg-muted" style={{ width, height }} />
              ) : (
                placeholder
              )}
            </div>
          )}

          <img
            src={displaySrc}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "block",
              !imgLoaded && "opacity-0",
              imgLoaded && "opacity-100 transition-opacity",
              className,
            )}
            style={style}
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              setImgError(true);
              setImgLoaded(true);
            }}
            {...rest}
          />

          {/* Preview mask */}
          {previewConfig !== false && (
            <div
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 opacity-0 transition-opacity hover:bg-black/40 hover:opacity-100"
              onClick={() => handlePreviewChange(true)}
            >
              {previewConfig.mask ?? (
                <span className="flex items-center gap-1 text-sm text-white">
                  <EyeIcon className="size-4" />
                  Preview
                </span>
              )}
            </div>
          )}
        </div>

        {previewConfig !== false && (
          <PreviewModal
            visible={!!showPreview}
            src={previewSrc ?? ""}
            alt={alt}
            onClose={() => handlePreviewChange(false)}
            scaleStep={previewConfig.scaleStep}
            minScale={previewConfig.minScale}
            maxScale={previewConfig.maxScale}
          />
        )}
      </>
    );
  },
);

InternalImage.displayName = "Image";

// ---------------------------------------------------------------------------
// Image.PreviewGroup
// ---------------------------------------------------------------------------

const PreviewGroup: React.FC<PreviewGroupProps> = ({
  preview = true,
  items,
  className,
  children,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  const previewConfig: PreviewConfig | false =
    preview === false ? false : preview === true ? {} : preview;

  const isControlled = previewConfig !== false && previewConfig.visible !== undefined;
  const showPreview = isControlled ? previewConfig.visible : visible;

  const handleVisibleChange = (vis: boolean) => {
    if (previewConfig !== false && previewConfig.onVisibleChange) {
      previewConfig.onVisibleChange(vis);
    }
    if (!isControlled) setVisible(vis);
  };

  const allItems = items ?? [];

  // Wrap children to intercept clicks
  const wrappedChildren = React.Children.map(children, (child, idx) => {
    if (React.isValidElement(child)) {
      const originalOnClick = (child.props as Record<string, unknown>).onClick as
        | (() => void)
        | undefined;
      return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
        onClick: () => {
          setCurrentIndex(idx);
          handleVisibleChange(true);
          originalOnClick?.();
        },
        preview: false,
      });
    }
    return child;
  });

  return (
    <div className={cn("inline-flex flex-wrap gap-2", className)}>
      {wrappedChildren}
      {previewConfig !== false && (
        <PreviewModal
          visible={!!showPreview}
          src={allItems[currentIndex] ?? ""}
          onClose={() => handleVisibleChange(false)}
          onPrev={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          onNext={() => setCurrentIndex(Math.min(allItems.length - 1, currentIndex + 1))}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < allItems.length - 1}
          scaleStep={previewConfig.scaleStep}
          minScale={previewConfig.minScale}
          maxScale={previewConfig.maxScale}
        />
      )}
    </div>
  );
};

PreviewGroup.displayName = "Image.PreviewGroup";

export { InternalImage, PreviewGroup };
