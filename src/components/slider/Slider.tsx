"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { SliderProps, SliderMarks } from "./types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function snapToStep(
  val: number,
  min: number,
  max: number,
  step: number | null
): number {
  if (step === null || step <= 0) return clamp(val, min, max);
  const snapped = Math.round((val - min) / step) * step + min;
  return clamp(snapped, min, max);
}

function getPercent(val: number, min: number, max: number): number {
  if (max === min) return 0;
  return ((val - min) / (max - min)) * 100;
}

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------

function SliderTooltip({
  value,
  visible,
  formatter,
  placement = "top",
  vertical,
}: {
  value: number;
  visible: boolean;
  formatter?: ((value?: number) => React.ReactNode) | null;
  placement?: "top" | "bottom" | "left" | "right";
  vertical?: boolean;
}) {
  if (!visible || formatter === null) return null;
  const content = formatter ? formatter(value) : value;

  const posClass = vertical
    ? placement === "left"
      ? "right-full mr-2 top-1/2 -translate-y-1/2"
      : "left-full ml-2 top-1/2 -translate-y-1/2"
    : placement === "bottom"
      ? "top-full mt-2 left-1/2 -translate-x-1/2"
      : "bottom-full mb-2 left-1/2 -translate-x-1/2";

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md border border-border",
        posClass
      )}
    >
      {content}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Marks rendering
// ---------------------------------------------------------------------------

function renderMarks(
  marks: SliderMarks,
  min: number,
  max: number,
  vertical: boolean,
  reverse: boolean
) {
  const entries = Object.entries(marks).map(([key, val]) => ({
    position: Number(key),
    mark: val,
  }));

  return (
    <>
      {/* Dots on the track */}
      {entries.map(({ position }) => {
        const pct = getPercent(position, min, max);
        const adjustedPct = reverse ? 100 - pct : pct;
        const posStyle = vertical
          ? { bottom: `${adjustedPct}%` }
          : { left: `${adjustedPct}%` };

        return (
          <div
            key={`dot-${position}`}
            className={cn(
              "absolute rounded-full border-2 border-primary bg-background",
              vertical
                ? "left-1/2 -translate-x-1/2 size-2"
                : "top-1/2 -translate-y-1/2 size-2"
            )}
            style={posStyle}
          />
        );
      })}

      {/* Labels */}
      <div
        className={cn(
          "absolute",
          vertical ? "left-full ml-2 top-0 bottom-0" : "top-full mt-2 left-0 right-0"
        )}
      >
        {entries.map(({ position, mark }) => {
          const pct = getPercent(position, min, max);
          const adjustedPct = reverse ? 100 - pct : pct;

          const isObj =
            mark !== null &&
            typeof mark === "object" &&
            "label" in (mark as { label?: unknown });
          const label = isObj
            ? (mark as { label: React.ReactNode }).label
            : (mark as React.ReactNode);
          const markStyle = isObj
            ? (mark as { style?: React.CSSProperties }).style
            : undefined;

          const posStyle = vertical
            ? { bottom: `${adjustedPct}%`, transform: "translateY(50%)" }
            : { left: `${adjustedPct}%`, transform: "translateX(-50%)" };

          return (
            <span
              key={`label-${position}`}
              className="absolute text-xs text-muted-foreground whitespace-nowrap"
              style={{ ...posStyle, ...markStyle }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// InternalSlider
// ---------------------------------------------------------------------------

const InternalSlider = React.forwardRef<HTMLDivElement, SliderProps>(
  (props, ref) => {
    const {
      value: valueProp,
      defaultValue,
      onChange,
      onChangeComplete,
      min = 0,
      max = 100,
      step = 1,
      range = false,
      marks,
      dots = false,
      disabled = false,
      vertical = false,
      tooltip: tooltipConfig,
      included = true,
      reverse = false,
      className,
      style,
    } = props;

    // ---- Controlled / uncontrolled ----
    const getInitialValue = (): number | [number, number] => {
      if (defaultValue !== undefined) return defaultValue;
      return range ? [min, min] : min;
    };

    const [internalValue, setInternalValue] = React.useState(getInitialValue);
    const isControlled = valueProp !== undefined;
    const mergedValue = isControlled ? valueProp! : internalValue;

    const val0 = Array.isArray(mergedValue) ? mergedValue[0] : mergedValue;
    const val1 = Array.isArray(mergedValue) ? mergedValue[1] : mergedValue;

    // ---- Dragging state ----
    const [draggingThumb, setDraggingThumb] = React.useState<
      null | 0 | 1
    >(null);
    const [hoveringThumb, setHoveringThumb] = React.useState<
      null | 0 | 1
    >(null);
    const railRef = React.useRef<HTMLDivElement>(null);
    const dragStartValue = React.useRef<number | [number, number]>(mergedValue);

    const updateValue = React.useCallback(
      (newVal: number | [number, number]) => {
        if (!isControlled) {
          setInternalValue(newVal);
        }
        onChange?.(newVal);
      },
      [isControlled, onChange]
    );

    // ---- Calculate value from position ----
    const getValueFromPosition = React.useCallback(
      (clientX: number, clientY: number): number => {
        const rail = railRef.current;
        if (!rail) return min;
        const rect = rail.getBoundingClientRect();

        let ratio: number;
        if (vertical) {
          ratio = (rect.bottom - clientY) / rect.height;
        } else {
          ratio = (clientX - rect.left) / rect.width;
        }

        if (reverse) ratio = 1 - ratio;
        ratio = clamp(ratio, 0, 1);

        const rawValue = min + ratio * (max - min);
        return snapToStep(rawValue, min, max, step);
      },
      [min, max, step, vertical, reverse]
    );

    // ---- Mouse / Touch handling ----
    const handleDrag = React.useCallback(
      (clientX: number, clientY: number) => {
        const newVal = getValueFromPosition(clientX, clientY);

        if (range) {
          const current = Array.isArray(mergedValue)
            ? mergedValue
            : [mergedValue, mergedValue];
          if (draggingThumb === 0) {
            const clamped = Math.min(newVal, current[1]);
            updateValue([clamped, current[1]]);
          } else if (draggingThumb === 1) {
            const clamped = Math.max(newVal, current[0]);
            updateValue([current[0], clamped]);
          }
        } else {
          updateValue(newVal);
        }
      },
      [
        getValueFromPosition,
        range,
        mergedValue,
        draggingThumb,
        updateValue,
      ]
    );

    React.useEffect(() => {
      if (draggingThumb === null) return;

      const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        handleDrag(e.clientX, e.clientY);
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          handleDrag(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      const handleEnd = () => {
        setDraggingThumb(null);
        onChangeComplete?.(mergedValue);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }, [draggingThumb, handleDrag, onChangeComplete, mergedValue]);

    const startDrag = (
      thumb: 0 | 1,
      e: React.MouseEvent | React.TouchEvent
    ) => {
      if (disabled) return;
      e.preventDefault();
      dragStartValue.current = mergedValue;
      setDraggingThumb(thumb);
    };

    // ---- Click on rail ----
    const handleRailClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      const newVal = getValueFromPosition(e.clientX, e.clientY);

      if (range) {
        const current = Array.isArray(mergedValue)
          ? mergedValue
          : [mergedValue, mergedValue];
        // Move the closest thumb
        const d0 = Math.abs(newVal - current[0]);
        const d1 = Math.abs(newVal - current[1]);
        if (d0 <= d1) {
          updateValue([Math.min(newVal, current[1]), current[1]]);
        } else {
          updateValue([current[0], Math.max(newVal, current[0])]);
        }
      } else {
        updateValue(newVal);
      }
      onChangeComplete?.(mergedValue);
    };

    // ---- Percentages for rendering ----
    const pct0 = getPercent(val0, min, max);
    const pct1 = range ? getPercent(val1, min, max) : pct0;

    const trackStart = range ? Math.min(pct0, pct1) : 0;
    const trackEnd = range ? Math.max(pct0, pct1) : pct0;

    const adjustedTrackStart = reverse ? 100 - trackEnd : trackStart;
    const adjustedTrackEnd = reverse ? 100 - trackStart : trackEnd;
    const adjustedPct0 = reverse ? 100 - pct0 : pct0;
    const adjustedPct1 = reverse ? 100 - pct1 : pct1;

    // ---- Tooltip visibility ----
    const tooltipAlwaysOpen = tooltipConfig?.open === true;
    const tooltipAlwaysHidden = tooltipConfig?.open === false;
    const tooltipPlacement = tooltipConfig?.placement;
    const tooltipFormatter = tooltipConfig?.formatter;

    const isThumb0Visible =
      !tooltipAlwaysHidden &&
      (tooltipAlwaysOpen || draggingThumb === 0 || hoveringThumb === 0);
    const isThumb1Visible =
      !tooltipAlwaysHidden &&
      (tooltipAlwaysOpen || draggingThumb === 1 || hoveringThumb === 1);

    // ---- Dots rendering ----
    const dotElements = React.useMemo(() => {
      if (!dots || step === null || step <= 0) return null;
      const count = Math.floor((max - min) / step);
      return Array.from({ length: count + 1 }, (_, i) => {
        const dotVal = min + i * step;
        const pct = getPercent(dotVal, min, max);
        const adjustedPct = reverse ? 100 - pct : pct;
        const isActive =
          included && dotVal >= trackStart && dotVal <= trackEnd;

        const posStyle = vertical
          ? { bottom: `${adjustedPct}%` }
          : { left: `${adjustedPct}%` };

        return (
          <div
            key={i}
            className={cn(
              "absolute rounded-full border-2 bg-background",
              vertical
                ? "left-1/2 -translate-x-1/2 size-2"
                : "top-1/2 -translate-y-1/2 size-2",
              isActive ? "border-primary" : "border-muted-foreground/30"
            )}
            style={posStyle}
          />
        );
      });
    }, [dots, step, min, max, vertical, reverse, included, trackStart, trackEnd]);

    // ---- Thumb component ----
    const renderThumb = (
      thumbIndex: 0 | 1,
      percentPos: number,
      thumbValue: number
    ) => {
      const posStyle = vertical
        ? { bottom: `${percentPos}%` }
        : { left: `${percentPos}%` };

      return (
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={thumbValue}
          aria-disabled={disabled}
          className={cn(
            "absolute z-10 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background shadow-sm transition-shadow",
            "hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            vertical && "translate-x-0 -translate-y-1/2 left-1/2",
            !vertical && "top-1/2",
            disabled && "cursor-not-allowed opacity-50",
            !disabled && "cursor-grab active:cursor-grabbing"
          )}
          style={posStyle}
          onMouseDown={(e) => startDrag(thumbIndex, e)}
          onTouchStart={(e) => startDrag(thumbIndex, e)}
          onMouseEnter={() => setHoveringThumb(thumbIndex)}
          onMouseLeave={() => setHoveringThumb(null)}
          onKeyDown={(e) => {
            if (disabled) return;
            const s = step ?? 1;
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              const next = snapToStep(
                thumbValue + s,
                min,
                max,
                step
              );
              if (range) {
                const arr = [val0, val1] as [number, number];
                arr[thumbIndex] = next;
                if (arr[0] <= arr[1]) updateValue(arr);
              } else {
                updateValue(next);
              }
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              const next = snapToStep(
                thumbValue - s,
                min,
                max,
                step
              );
              if (range) {
                const arr = [val0, val1] as [number, number];
                arr[thumbIndex] = next;
                if (arr[0] <= arr[1]) updateValue(arr);
              } else {
                updateValue(next);
              }
            }
          }}
        >
          <SliderTooltip
            value={thumbValue}
            visible={thumbIndex === 0 ? isThumb0Visible : isThumb1Visible}
            formatter={tooltipFormatter}
            placement={tooltipPlacement}
            vertical={vertical}
          />
        </div>
      );
    };

    const trackStyle = vertical
      ? {
          bottom: `${adjustedTrackStart}%`,
          height: `${adjustedTrackEnd - adjustedTrackStart}%`,
        }
      : {
          left: `${adjustedTrackStart}%`,
          width: `${adjustedTrackEnd - adjustedTrackStart}%`,
        };

    return (
      <div
        ref={ref}
        className={cn(
          "relative select-none",
          vertical ? "inline-flex h-full min-h-[100px] w-3 flex-col" : "w-full py-2",
          disabled && "opacity-50",
          marks && !vertical && "mb-6",
          marks && vertical && "mr-8",
          className
        )}
        style={style}
      >
        {/* Rail */}
        <div
          ref={railRef}
          className={cn(
            "relative rounded-full bg-muted",
            vertical ? "h-full w-1 mx-auto" : "h-1 w-full"
          )}
          onClick={handleRailClick}
        >
          {/* Active track */}
          {included && (
            <div
              className={cn(
                "absolute rounded-full bg-primary",
                vertical ? "w-full" : "h-full"
              )}
              style={trackStyle}
            />
          )}

          {/* Dots */}
          {dotElements}

          {/* Marks */}
          {marks && renderMarks(marks, min, max, vertical, reverse)}
        </div>

        {/* Thumbs - rendered outside rail for proper positioning relative to rail */}
        <div
          className={cn(
            "absolute",
            vertical ? "left-0 right-0 top-0 bottom-0" : "left-0 right-0 top-2 bottom-2"
          )}
        >
          {renderThumb(0, adjustedPct0, val0)}
          {range && renderThumb(1, adjustedPct1, val1)}
        </div>
      </div>
    );
  }
);

InternalSlider.displayName = "Slider";

export { InternalSlider };
