/**
 * @file Divider component — horizontal or vertical visual separator.
 *
 * Renders a thin line to visually divide content. Supports embedded title
 * text with left / center / right alignment, dashed style, and vertical
 * orientation for inline separation.
 *
 * Key props: `type`, `dashed`, `orientation`, `orientationMargin`, `plain`.
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider dashed />
 * <Divider orientation="left">Section</Divider>
 * <Divider type="vertical" />
 * ```
 *
 * @see {@link ./types.ts} for prop type definitions
 * @see {@link ./index.ts} for the public export
 */
"use client";

import * as React from "react";
import { Separator } from "@/primitives/separator";
import { cn } from "@/lib/utils";
import type { DividerProps } from "./types";

const Divider = React.forwardRef<HTMLDivElement, DividerProps>((props, ref) => {
  const {
    type = "horizontal",
    dashed = false,
    orientation = "center",
    orientationMargin,
    children,
    plain = false,
    className,
    style,
    ...rest
  } = props;

  const hasChildren = children !== undefined && children !== null;

  // Vertical divider (no text support)
  if (type === "vertical") {
    return (
      <span
        ref={ref}
        data-slot="divider"
        role="separator"
        className={cn(
          "relative mx-2 inline-block h-[0.9em] w-px self-center align-middle",
          dashed ? "border-l border-dashed border-border" : "bg-border",
          className
        )}
        style={style}
        {...rest}
      />
    );
  }

  // Horizontal divider without text - use the shadcn Separator
  if (!hasChildren) {
    return (
      <div
        ref={ref}
        data-slot="divider"
        role="separator"
        className={cn("my-4", className)}
        style={style}
        {...rest}
      >
        <Separator
          orientation="horizontal"
          className={cn(dashed && "border-t border-dashed border-border bg-transparent")}
        />
      </div>
    );
  }

  // Horizontal divider with text
  const leftWidth =
    orientation === "left"
      ? orientationMargin !== undefined
        ? undefined
        : "5%"
      : orientation === "right"
        ? "95%"
        : "50%";

  const rightWidth =
    orientation === "right"
      ? orientationMargin !== undefined
        ? undefined
        : "5%"
      : orientation === "left"
        ? "95%"
        : "50%";

  const lineClasses = cn(
    "flex-1 self-center",
    dashed ? "border-t border-dashed border-border" : "h-px bg-border"
  );

  return (
    <div
      ref={ref}
      data-slot="divider"
      role="separator"
      className={cn("my-4 flex items-center text-sm", className)}
      style={style}
      {...rest}
    >
      <div
        className={lineClasses}
        style={{
          ...(leftWidth ? { width: leftWidth, flexGrow: 0, flexShrink: 0 } : {}),
          ...(orientation === "left" && orientationMargin !== undefined
            ? { width: orientationMargin, flexGrow: 0, flexShrink: 0 }
            : {}),
        }}
      />
      <span
        className={cn(
          "inline-block px-3 whitespace-nowrap",
          plain ? "font-normal text-foreground" : "font-medium text-foreground"
        )}
      >
        {children}
      </span>
      <div
        className={lineClasses}
        style={{
          ...(rightWidth
            ? orientation === "center"
              ? {}
              : { width: rightWidth, flexGrow: 0, flexShrink: 0 }
            : {}),
          ...(orientation === "right" && orientationMargin !== undefined
            ? { width: orientationMargin, flexGrow: 0, flexShrink: 0 }
            : {}),
          ...(orientation !== "right" ? { flexGrow: 1 } : {}),
        }}
      />
    </div>
  );
});

Divider.displayName = "Divider";

export { Divider };
