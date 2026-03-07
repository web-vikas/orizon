"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { BadgeProps, BadgeRibbonProps, BadgeStatus, PresetColor } from "./types";

// ---------------------------------------------------------------------------
// Color helpers
// ---------------------------------------------------------------------------

const STATUS_BG_COLORS: Record<BadgeStatus, string> = {
  success: "bg-green-500",
  processing: "bg-blue-500",
  default: "bg-muted-foreground",
  error: "bg-destructive",
  warning: "bg-yellow-500",
};

const PRESET_COLORS: Record<PresetColor, string> = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  cyan: "bg-cyan-500",
  green: "bg-green-500",
  magenta: "bg-pink-600",
  pink: "bg-pink-500",
  red: "bg-red-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-500",
  volcano: "bg-orange-600",
  geekblue: "bg-blue-600",
  lime: "bg-lime-500",
  gold: "bg-amber-500",
};

function getColorClass(color?: PresetColor | string): string | undefined {
  if (!color) return undefined;
  return PRESET_COLORS[color as PresetColor];
}

function getColorStyle(color?: PresetColor | string): React.CSSProperties | undefined {
  if (!color) return undefined;
  if (PRESET_COLORS[color as PresetColor]) return undefined;
  return { backgroundColor: color };
}

// ---------------------------------------------------------------------------
// InternalBadge
// ---------------------------------------------------------------------------

const InternalBadge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      count,
      dot = false,
      status,
      color,
      size = "default",
      showZero = false,
      overflowCount = 99,
      offset,
      title,
      text,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    // Status badge (standalone dot with text)
    if (status && !children) {
      return (
        <span
          ref={ref}
          className={cn("inline-flex items-center gap-1.5", className)}
          style={style}
          {...rest}
        >
          <span
            className={cn(
              "inline-block size-1.5 rounded-full",
              color ? getColorClass(color) : STATUS_BG_COLORS[status],
            )}
            style={color ? getColorStyle(color) : undefined}
          />
          {text && <span className="text-sm">{text}</span>}
        </span>
      );
    }

    // Determine display count
    const displayCount = React.useMemo(() => {
      if (dot) return null;
      if (count === undefined || count === null) return null;
      if (typeof count === "number") {
        if (count === 0 && !showZero) return null;
        if (count > overflowCount) return `${overflowCount}+`;
        return count;
      }
      return count;
    }, [count, dot, showZero, overflowCount]);

    const hasCount = displayCount !== null;
    const showBadge = hasCount || dot || status;

    if (!showBadge) {
      return (
        <span ref={ref} className={cn("relative inline-flex", className)} style={style} {...rest}>
          {children}
        </span>
      );
    }

    const offsetStyle: React.CSSProperties = offset
      ? { right: -offset[0], top: offset[1] }
      : {};

    const isSmall = size === "small";

    return (
      <span
        ref={ref}
        className={cn("relative inline-flex", className)}
        style={style}
        {...rest}
      >
        {children}

        {dot ? (
          <span
            className={cn(
              "absolute -right-1 -top-1 z-10 rounded-full ring-2 ring-background",
              isSmall ? "size-1.5" : "size-2",
              status ? STATUS_BG_COLORS[status] : color ? getColorClass(color) : "bg-destructive",
            )}
            style={{
              ...offsetStyle,
              ...(color ? getColorStyle(color) : {}),
            }}
            title={title}
          />
        ) : (
          <span
            className={cn(
              "absolute -right-2 -top-2 z-10 inline-flex items-center justify-center rounded-full font-medium text-white ring-2 ring-background",
              isSmall ? "min-w-4 px-1 text-[10px] leading-4" : "min-w-5 px-1.5 text-xs leading-5",
              status
                ? STATUS_BG_COLORS[status]
                : color
                  ? getColorClass(color)
                  : "bg-destructive",
            )}
            style={{
              ...offsetStyle,
              ...(color ? getColorStyle(color) : {}),
            }}
            title={title ?? (typeof displayCount === "number" ? String(displayCount) : undefined)}
          >
            {displayCount}
          </span>
        )}
      </span>
    );
  },
);

InternalBadge.displayName = "Badge";

// ---------------------------------------------------------------------------
// Badge.Ribbon
// ---------------------------------------------------------------------------

const BadgeRibbon: React.FC<BadgeRibbonProps> = ({
  text,
  color,
  placement = "end",
  className,
  style,
  children,
}) => {
  const colorClass = color ? getColorClass(color) : "bg-primary";
  const colorStyle = color ? getColorStyle(color) : undefined;

  return (
    <div className={cn("relative", className)} style={style}>
      {children}
      <div
        className={cn(
          "absolute top-2 z-10 whitespace-nowrap rounded-sm px-2 py-0.5 text-xs font-medium text-white",
          colorClass,
          placement === "end" ? "-right-2" : "-left-2",
        )}
        style={colorStyle}
      >
        {text}
        {/* Ribbon corner */}
        <div
          className={cn(
            "absolute top-full h-0 w-0 border-t-4",
            placement === "end"
              ? "right-0 border-r-0 border-l-8 border-t-current border-l-transparent opacity-60"
              : "left-0 border-l-0 border-r-8 border-t-current border-r-transparent opacity-60",
          )}
        />
      </div>
    </div>
  );
};

BadgeRibbon.displayName = "Badge.Ribbon";

export { InternalBadge, BadgeRibbon };
