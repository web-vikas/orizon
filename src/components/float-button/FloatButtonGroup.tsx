"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { FloatButtonGroupProps } from "./types";

// ---------------------------------------------------------------------------
// FloatButtonGroup
// ---------------------------------------------------------------------------

const FloatButtonGroup: React.FC<FloatButtonGroupProps> = ({
  shape = "circle",
  trigger,
  icon,
  closeIcon,
  open: controlledOpen,
  onOpenChange,
  children,
  className,
  style,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const handleToggle = React.useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  const handleMouseEnter = React.useCallback(() => {
    if (trigger !== "hover") return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setOpen(true);
  }, [trigger, setOpen]);

  const handleMouseLeave = React.useCallback(() => {
    if (trigger !== "hover") return;
    hoverTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  }, [trigger, setOpen]);

  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const isCircle = shape === "circle";

  // Default icons
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );

  const defaultCloseIcon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );

  const triggerIcon = isOpen ? (closeIcon ?? defaultCloseIcon) : (icon ?? defaultIcon);

  // If no trigger, just render children inline (always visible)
  if (!trigger) {
    return (
      <div
        className={cn("fixed bottom-6 right-6 z-[999] flex flex-col-reverse items-center gap-3", className)}
        style={style}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn("fixed bottom-6 right-6 z-[999] flex flex-col-reverse items-center gap-3", className)}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger button */}
      <button
        type="button"
        className={cn(
          "inline-flex size-10 items-center justify-center shadow-lg transition-all duration-200 hover:shadow-xl",
          isCircle ? "rounded-full" : "rounded-lg",
          "border border-border bg-background text-foreground hover:bg-accent",
          "cursor-pointer select-none",
        )}
        onClick={trigger === "click" ? handleToggle : undefined}
      >
        <span
          className={cn(
            "inline-flex items-center justify-center transition-transform duration-200",
            isOpen && "rotate-0",
          )}
        >
          {triggerIcon}
        </span>
      </button>

      {/* Expanded children */}
      <div
        className={cn(
          "flex flex-col-reverse items-center gap-3 transition-all duration-200",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  );
};

FloatButtonGroup.displayName = "FloatButton.Group";

export { FloatButtonGroup };
