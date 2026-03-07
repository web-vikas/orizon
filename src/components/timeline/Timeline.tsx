"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { TimelineProps } from "./types";

// ---------------------------------------------------------------------------
// Color helper
// ---------------------------------------------------------------------------

const PRESET_DOT_COLORS: Record<string, string> = {
  blue: "bg-blue-500 border-blue-500",
  red: "bg-red-500 border-red-500",
  green: "bg-green-500 border-green-500",
  gray: "bg-gray-400 border-gray-400",
};

function getDotColorClass(color?: string): { className?: string; style?: React.CSSProperties } {
  if (!color) return { className: "border-primary bg-primary" };
  if (PRESET_DOT_COLORS[color]) return { className: PRESET_DOT_COLORS[color] };
  return { style: { backgroundColor: color, borderColor: color } };
}

// ---------------------------------------------------------------------------
// InternalTimeline
// ---------------------------------------------------------------------------

const InternalTimeline: React.FC<TimelineProps> = ({
  items: itemsProp = [],
  mode = "left",
  pending,
  pendingDot,
  reverse = false,
  className,
  style,
}) => {
  const items = React.useMemo(() => {
    let list = [...itemsProp];

    if (pending !== undefined) {
      list.push({
        children: pending === true ? "Loading..." : pending,
        dot: pendingDot ?? (
          <span className="inline-block size-2.5 animate-pulse rounded-full bg-primary" />
        ),
      });
    }

    if (reverse) list = list.reverse();
    return list;
  }, [itemsProp, pending, pendingDot, reverse]);

  const isAlternate = mode === "alternate";

  return (
    <div className={cn("relative", className)} style={style}>
      {items.map((item, index) => {
        const position = isAlternate
          ? item.position ?? (index % 2 === 0 ? "left" : "right")
          : mode === "right"
            ? "right"
            : "left";

        const isRight = position === "right";
        const dotColor = getDotColorClass(item.color);
        const isLast = index === items.length - 1;

        if (isAlternate) {
          return (
            <div
              key={index}
              className={cn(
                "relative flex",
                item.className,
              )}
              style={item.style}
            >
              {/* Left side */}
              <div className={cn("w-1/2 pr-6 text-right", isRight && "text-left pl-6 pr-0")}>
                {!isRight ? (
                  <div className="pb-6">{item.children}</div>
                ) : (
                  item.label && (
                    <div className="pb-6 text-sm text-muted-foreground">
                      {item.label}
                    </div>
                  )
                )}
              </div>

              {/* Center line + dot */}
              <div className="relative flex flex-col items-center">
                {/* Dot */}
                {item.dot ? (
                  <div className="z-10 flex items-center justify-center">{item.dot}</div>
                ) : (
                  <div
                    className={cn(
                      "z-10 size-2.5 rounded-full border-2",
                      dotColor.className,
                    )}
                    style={dotColor.style}
                  />
                )}
                {/* Line */}
                {!isLast && (
                  <div className="w-px flex-1 bg-border" />
                )}
              </div>

              {/* Right side */}
              <div className={cn("w-1/2 pl-6", isRight && "pr-6 pl-0 text-right")}>
                {isRight ? (
                  <div className="pb-6">{item.children}</div>
                ) : (
                  item.label && (
                    <div className="pb-6 text-sm text-muted-foreground">
                      {item.label}
                    </div>
                  )
                )}
              </div>
            </div>
          );
        }

        // Left or right mode
        return (
          <div
            key={index}
            className={cn(
              "relative flex",
              isRight && "flex-row-reverse",
              item.className,
            )}
            style={item.style}
          >
            {/* Label */}
            {item.label && (
              <div
                className={cn(
                  "shrink-0 text-sm text-muted-foreground",
                  isRight ? "pl-4 text-left" : "pr-4 text-right",
                  "w-24",
                )}
              >
                {item.label}
              </div>
            )}

            {/* Line + dot */}
            <div className="relative flex flex-col items-center">
              {/* Dot */}
              {item.dot ? (
                <div className="z-10 flex items-center justify-center">{item.dot}</div>
              ) : (
                <div
                  className={cn(
                    "z-10 size-2.5 rounded-full border-2",
                    dotColor.className,
                  )}
                  style={dotColor.style}
                />
              )}
              {/* Line */}
              {!isLast && (
                <div className="w-px flex-1 bg-border" />
              )}
            </div>

            {/* Content */}
            <div
              className={cn(
                "flex-1 pb-6",
                isRight ? "pr-4 text-right" : "pl-4",
              )}
            >
              {item.children}
            </div>
          </div>
        );
      })}
    </div>
  );
};

InternalTimeline.displayName = "Timeline";

export { InternalTimeline };
