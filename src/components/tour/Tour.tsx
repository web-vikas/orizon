/**
 * @file Tour -- guided product walkthrough with mask and popover.
 *
 * Renders a step-by-step tour overlay that highlights DOM elements
 * with a spotlight cutout mask. Each step can show a title,
 * description, cover image, and prev/next navigation buttons.
 * Supports controlled and uncontrolled open state, custom
 * indicators, and "default" or "primary" styling.
 *
 * Key props: `steps`, `open`, `current`, `onChange`, `onClose`,
 * `onFinish`, `mask`, `type`.
 *
 * @example
 * ```tsx
 * <Tour
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   steps={[
 *     { target: ref1, title: "Step 1", description: "Welcome!" },
 *     { target: ref2, title: "Step 2", description: "Try this." },
 *   ]}
 * />
 * ```
 *
 * @see {@link ./types.ts} for prop definitions.
 * @see {@link ./index.ts} for the public export.
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import type { TourProps, TourStepConfig, TourPlacement } from "./types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getTargetElement(target: TourStepConfig["target"]): HTMLElement | null {
  if (!target) return null;
  if (typeof target === "function") return target();
  if ("current" in target) return target.current;
  return null;
}

function getPosition(
  targetRect: DOMRect | null,
  placement: TourPlacement = "bottom",
  popoverWidth = 320,
  popoverHeight = 200,
): React.CSSProperties {
  if (!targetRect || placement === "center") {
    return {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
  }

  const gap = 12;
  const style: React.CSSProperties = { position: "fixed" };

  switch (placement) {
    case "top":
    case "topLeft":
    case "topRight":
      style.bottom = window.innerHeight - targetRect.top + gap;
      if (placement === "topLeft") style.left = targetRect.left;
      else if (placement === "topRight") style.right = window.innerWidth - targetRect.right;
      else style.left = targetRect.left + targetRect.width / 2 - popoverWidth / 2;
      break;

    case "bottom":
    case "bottomLeft":
    case "bottomRight":
      style.top = targetRect.bottom + gap;
      if (placement === "bottomLeft") style.left = targetRect.left;
      else if (placement === "bottomRight") style.right = window.innerWidth - targetRect.right;
      else style.left = targetRect.left + targetRect.width / 2 - popoverWidth / 2;
      break;

    case "left":
    case "leftTop":
    case "leftBottom":
      style.right = window.innerWidth - targetRect.left + gap;
      if (placement === "leftTop") style.top = targetRect.top;
      else if (placement === "leftBottom") style.bottom = window.innerHeight - targetRect.bottom;
      else style.top = targetRect.top + targetRect.height / 2 - popoverHeight / 2;
      break;

    case "right":
    case "rightTop":
    case "rightBottom":
      style.left = targetRect.right + gap;
      if (placement === "rightTop") style.top = targetRect.top;
      else if (placement === "rightBottom") style.bottom = window.innerHeight - targetRect.bottom;
      else style.top = targetRect.top + targetRect.height / 2 - popoverHeight / 2;
      break;
  }

  return style;
}

// ---------------------------------------------------------------------------
// Mask with spotlight cutout
// ---------------------------------------------------------------------------

function TourMask({
  targetRect,
  zIndex,
  onClick,
}: {
  targetRect: DOMRect | null;
  zIndex: number;
  onClick: () => void;
}) {
  if (!targetRect) {
    return (
      <div
        className="fixed inset-0 bg-black/50"
        style={{ zIndex }}
        onClick={onClick}
      />
    );
  }

  const padding = 4;
  const borderRadius = 4;

  return (
    <div className="fixed inset-0" style={{ zIndex }} onClick={onClick}>
      <svg className="absolute inset-0 size-full">
        <defs>
          <mask id="tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect
              x={targetRect.left - padding}
              y={targetRect.top - padding}
              width={targetRect.width + padding * 2}
              height={targetRect.height + padding * 2}
              rx={borderRadius}
              ry={borderRadius}
              fill="black"
            />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.5)"
          mask="url(#tour-mask)"
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// InternalTour
// ---------------------------------------------------------------------------

const InternalTour: React.FC<TourProps> = ({
  steps,
  open: openProp,
  current: currentProp,
  onChange,
  onClose,
  onFinish,
  type: globalType = "default",
  mask = true,
  indicatorsRender,
  className,
  style,
  zIndex = 1070,
}) => {
  const [internalCurrent, setInternalCurrent] = React.useState(0);
  const [internalOpen, setInternalOpen] = React.useState(false);

  const isOpenControlled = openProp !== undefined;
  const isCurrentControlled = currentProp !== undefined;

  const isOpen = isOpenControlled ? openProp : internalOpen;
  const currentStep = isCurrentControlled ? currentProp! : internalCurrent;

  const [targetRect, setTargetRect] = React.useState<DOMRect | null>(null);

  // Update target rect
  React.useEffect(() => {
    if (!isOpen || !steps[currentStep]) {
      setTargetRect(null);
      return;
    }

    const el = getTargetElement(steps[currentStep].target);
    if (el) {
      setTargetRect(el.getBoundingClientRect());
      el.scrollIntoView({ behavior: "smooth", block: "center" });

      // Watch for resize/scroll
      const updateRect = () => setTargetRect(el.getBoundingClientRect());
      window.addEventListener("resize", updateRect);
      window.addEventListener("scroll", updateRect, true);
      return () => {
        window.removeEventListener("resize", updateRect);
        window.removeEventListener("scroll", updateRect, true);
      };
    } else {
      setTargetRect(null);
    }
  }, [isOpen, currentStep, steps]);

  // Lock body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  if (!isOpen || !steps.length) return null;

  const step = steps[currentStep];
  if (!step) return null;

  const stepType = step.type ?? globalType;
  const showMask = step.mask ?? mask;
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const goTo = (idx: number) => {
    if (!isCurrentControlled) setInternalCurrent(idx);
    onChange?.(idx);
  };

  const handleNext = () => {
    if (isLast) {
      handleClose();
      onFinish?.();
    } else {
      goTo(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      goTo(currentStep - 1);
    }
  };

  const handleClose = () => {
    if (!isOpenControlled) setInternalOpen(false);
    onClose?.();
    if (!isCurrentControlled) setInternalCurrent(0);
  };

  const positionStyle = getPosition(targetRect, step.placement);

  const defaultIndicators = (
    <div className="flex items-center gap-1">
      {steps.map((_, idx) => (
        <span
          key={idx}
          className={cn(
            "size-1.5 rounded-full",
            idx === currentStep ? "bg-current" : "bg-current/30",
          )}
        />
      ))}
    </div>
  );

  return (
    <>
      {/* Mask */}
      {showMask && (
        <TourMask
          targetRect={targetRect}
          zIndex={zIndex}
          onClick={handleClose}
        />
      )}

      {/* Popover */}
      <div
        className={cn(
          "z-[1071] w-80 rounded-lg border bg-background p-4 shadow-lg",
          stepType === "primary" && "border-primary bg-primary text-primary-foreground",
          step.className,
          className,
        )}
        style={{
          ...positionStyle,
          zIndex: zIndex + 1,
          ...style,
          ...step.style,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className={cn(
            "absolute right-2 top-2 rounded-sm p-1 transition-colors",
            stepType === "primary"
              ? "text-primary-foreground/70 hover:text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={handleClose}
        >
          <XIcon className="size-4" />
        </button>

        {/* Cover */}
        {step.cover && <div className="mb-3">{step.cover}</div>}

        {/* Title */}
        {step.title && (
          <div className="mb-1 pr-6 text-sm font-semibold">{step.title}</div>
        )}

        {/* Description */}
        {step.description && (
          <div
            className={cn(
              "mb-4 text-sm",
              stepType === "primary" ? "text-primary-foreground/80" : "text-muted-foreground",
            )}
          >
            {step.description}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-2">
          {/* Indicators */}
          {indicatorsRender
            ? indicatorsRender(currentStep, steps.length)
            : defaultIndicators}

          {/* Buttons */}
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                className={cn(
                  "rounded-md border px-3 py-1 text-xs font-medium transition-colors",
                  stepType === "primary"
                    ? "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                    : "border-border hover:bg-muted",
                )}
                onClick={() => {
                  step.prevButtonProps?.onClick?.();
                  handlePrev();
                }}
              >
                {step.prevButtonProps?.children ?? "Previous"}
              </button>
            )}
            <button
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                stepType === "primary"
                  ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  : "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
              onClick={() => {
                step.nextButtonProps?.onClick?.();
                handleNext();
              }}
            >
              {step.nextButtonProps?.children ?? (isLast ? "Finish" : "Next")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

InternalTour.displayName = "Tour";

export { InternalTour };
