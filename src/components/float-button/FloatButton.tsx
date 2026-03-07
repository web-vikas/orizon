/**
 * @file FloatButton component — floating action button.
 *
 * Renders a fixed-position circular or square button with an icon, optional
 * description, tooltip, badge, and link support. Commonly placed at a screen
 * corner for primary or quick-access actions.
 *
 * Key props: `icon`, `type`, `shape`, `tooltip`, `badge`, `href`.
 *
 * @example
 * ```tsx
 * <FloatButton icon={<PlusIcon />} />
 * <FloatButton icon={<QuestionIcon />} type="primary" shape="square" />
 * ```
 *
 * @see {@link ./types.ts} for prop type definitions
 * @see {@link ./index.ts} for the public export
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { FloatButtonProps } from "./types";

// ---------------------------------------------------------------------------
// FloatButton
// ---------------------------------------------------------------------------

const InternalFloatButton = React.forwardRef<HTMLElement, FloatButtonProps>(
  (
    {
      icon,
      description,
      tooltip,
      type = "default",
      shape = "circle",
      badge,
      href,
      target,
      onClick,
      className,
      style,
    },
    ref,
  ) => {
    const [showTooltip, setShowTooltip] = React.useState(false);

    const isCircle = shape === "circle";
    const isPrimary = type === "primary";

    const classes = cn(
      "relative inline-flex items-center justify-center shadow-lg transition-all duration-200 hover:shadow-xl",
      isCircle
        ? description
          ? "h-auto min-h-10 w-auto min-w-10 rounded-full px-3 py-2"
          : "size-10 rounded-full"
        : description
          ? "h-auto min-h-10 w-auto min-w-10 rounded-lg px-3 py-2"
          : "size-10 rounded-lg",
      isPrimary
        ? "bg-primary text-primary-foreground hover:bg-primary/90"
        : "border border-border bg-background text-foreground hover:bg-accent",
      "cursor-pointer select-none",
      className,
    );

    const content = (
      <>
        {/* Badge */}
        {badge && (badge.dot || (badge.count !== undefined && badge.count > 0)) && (
          <span
            className={cn(
              "absolute z-10 rounded-full",
              badge.dot
                ? "-right-0.5 -top-0.5 size-2"
                : "-right-1.5 -top-1.5 min-w-4 px-1 text-center text-[10px] font-medium leading-4 text-white",
            )}
            style={{ backgroundColor: badge.color ?? "#ff4d4f" }}
          >
            {badge.dot ? null : badge.count}
          </span>
        )}

        {/* Icon & Description */}
        <span className="inline-flex flex-col items-center gap-0.5">
          {icon && <span className="inline-flex items-center justify-center text-lg">{icon}</span>}
          {description && <span className="text-xs leading-tight">{description}</span>}
        </span>

        {/* Tooltip */}
        {tooltip && showTooltip && (
          <span className="pointer-events-none absolute -left-2 top-1/2 -translate-x-full -translate-y-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-md">
            {tooltip}
          </span>
        )}
      </>
    );

    const eventHandlers = {
      onClick,
      onMouseEnter: () => setShowTooltip(true),
      onMouseLeave: () => setShowTooltip(false),
    };

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className={classes}
          style={style}
          {...eventHandlers}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={classes}
        style={style}
        {...eventHandlers}
      >
        {content}
      </button>
    );
  },
);

InternalFloatButton.displayName = "FloatButton";

export { InternalFloatButton };
