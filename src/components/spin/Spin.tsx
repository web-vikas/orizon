/**
 * @file Spin -- loading spinner for indicating async operations.
 *
 * Renders a spinning indicator that can be used standalone, as a wrapper
 * overlay on content, or as a fullscreen loading screen. Supports delayed
 * appearance, custom indicators, tip text, and percent progress.
 *
 * Key props: `spinning`, `size`, `delay`, `indicator`, `tip`, `fullscreen`,
 * `percent`, `children`.
 *
 * @example
 * ```tsx
 * <Spin />
 * <Spin tip="Loading..." size="large">
 *   <div>Content behind spinner</div>
 * </Spin>
 * ```
 *
 * @see ./types.ts  - SpinProps
 * @see ./index.ts  - public export
 */
"use client";

import * as React from "react";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useComponentSize } from "@/hooks/useComponentSize";
import type { SpinProps, SpinSize } from "./types";

const SIZE_CLASS: Record<SpinSize, string> = {
  small: "size-4",
  middle: "size-6",
  large: "size-8",
};

const InternalSpin = React.forwardRef<HTMLDivElement, SpinProps>(
  (props, ref) => {
    const {
      spinning = true,
      size: sizeProp,
      delay,
      indicator,
      tip,
      description,
      fullscreen = false,
      percent,
      wrapperClassName,
      children,
      className,
      style,
    } = props;

    const resolvedSize = useComponentSize(sizeProp) as SpinSize;
    const resolvedTip = tip ?? description;

    // Delayed spinning
    const [shouldShow, setShouldShow] = React.useState(
      delay ? false : spinning
    );

    React.useEffect(() => {
      if (!delay) {
        setShouldShow(spinning);
        return;
      }

      if (spinning) {
        const timer = setTimeout(() => setShouldShow(true), delay);
        return () => clearTimeout(timer);
      } else {
        setShouldShow(false);
      }
    }, [spinning, delay]);

    // Spinner indicator
    const spinnerNode = React.useMemo(() => {
      if (indicator) return indicator;

      if (percent !== undefined && percent !== "auto") {
        // Show a circular progress indicator
        const pct = typeof percent === "number" ? percent : 0;
        const r = 10;
        const circumference = 2 * Math.PI * r;
        const offset = circumference - (circumference * pct) / 100;

        return (
          <svg
            className={cn("animate-spin", SIZE_CLASS[resolvedSize])}
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              opacity="0.2"
            />
            <circle
              cx="12"
              cy="12"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-200"
            />
          </svg>
        );
      }

      return (
        <Loader2Icon
          className={cn("animate-spin text-primary", SIZE_CLASS[resolvedSize])}
        />
      );
    }, [indicator, percent, resolvedSize]);

    const spinContent = (
      <div className={cn("flex flex-col items-center justify-center gap-2")}>
        {spinnerNode}
        {resolvedTip && shouldShow && (
          <span className="text-sm text-primary">{resolvedTip}</span>
        )}
      </div>
    );

    // Fullscreen mode
    if (fullscreen) {
      if (!shouldShow) return null;
      return (
        <div
          ref={ref}
          className={cn(
            "fixed inset-0 z-[1000] flex items-center justify-center bg-background/80 backdrop-blur-sm",
            className
          )}
          style={style}
        >
          {spinContent}
        </div>
      );
    }

    // Standalone (no children)
    if (!children) {
      if (!shouldShow) return null;
      return (
        <div
          ref={ref}
          className={cn("inline-flex", className)}
          style={style}
        >
          {spinContent}
        </div>
      );
    }

    // Wrapping mode
    return (
      <div
        ref={ref}
        className={cn("relative", wrapperClassName)}
        style={style}
      >
        {/* Children */}
        <div
          className={cn(
            "transition-opacity duration-200",
            shouldShow && "pointer-events-none select-none opacity-30"
          )}
        >
          {children}
        </div>

        {/* Overlay */}
        {shouldShow && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              className
            )}
          >
            {spinContent}
          </div>
        )}
      </div>
    );
  }
);

InternalSpin.displayName = "Spin";

export { InternalSpin };
