"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { BackTopProps } from "./types";

// ---------------------------------------------------------------------------
// BackTop
// ---------------------------------------------------------------------------

const BackTop: React.FC<BackTopProps> = ({
  visibilityHeight = 400,
  target,
  duration = 450,
  onClick,
  icon,
  className,
  style,
}) => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const scrollTarget = target ? target() : window;
    const getScrollTop = () => {
      if (scrollTarget instanceof Window) {
        return window.pageYOffset || document.documentElement.scrollTop;
      }
      return (scrollTarget as HTMLElement).scrollTop;
    };

    const handleScroll = () => {
      setVisible(getScrollTop() >= visibilityHeight);
    };

    // Check initial state
    handleScroll();

    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      scrollTarget.removeEventListener("scroll", handleScroll);
    };
  }, [visibilityHeight, target]);

  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      const scrollTarget = target ? target() : window;

      if (scrollTarget instanceof Window) {
        const startY = window.pageYOffset || document.documentElement.scrollTop;
        const startTime = performance.now();

        const step = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-in-out
          const eased = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

          window.scrollTo(0, startY * (1 - eased));

          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };

        requestAnimationFrame(step);
      } else {
        const element = scrollTarget as HTMLElement;
        const startY = element.scrollTop;
        const startTime = performance.now();

        const step = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

          element.scrollTop = startY * (1 - eased);

          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };

        requestAnimationFrame(step);
      }

      onClick?.(e);
    },
    [target, duration, onClick],
  );

  const defaultIcon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );

  return (
    <button
      type="button"
      className={cn(
        "fixed bottom-6 right-6 z-[999] inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg transition-all duration-300 hover:bg-accent hover:shadow-xl",
        "cursor-pointer select-none",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
        className,
      )}
      style={style}
      onClick={handleClick}
      aria-label="Back to top"
    >
      {icon ?? defaultIcon}
    </button>
  );
};

BackTop.displayName = "FloatButton.BackTop";

export { BackTop };
