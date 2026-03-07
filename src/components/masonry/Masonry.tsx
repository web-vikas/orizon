/**
 * @file Masonry layout component — CSS multi-column layout.
 *
 * Arranges children or an `items` array in a masonry (Pinterest-style)
 * layout using CSS `column-count`. Supports responsive column counts via
 * a breakpoint object, configurable column and row gutters, and a custom
 * `itemRender` function.
 *
 * Key props: `columns`, `gutter`, `items`, `itemRender`.
 *
 * @example
 * ```tsx
 * <Masonry columns={3} gutter={16}>
 *   <div>Card 1</div>
 *   <div>Card 2</div>
 *   <div>Card 3</div>
 * </Masonry>
 * <Masonry columns={{ sm: 1, md: 2, lg: 3 }} gutter={[16, 24]} items={cards} />
 * ```
 *
 * @see {@link ./types.ts} for prop type definitions
 * @see {@link ./index.ts} for the public export
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { MasonryProps } from "./types";

// ---------------------------------------------------------------------------
// Breakpoint mapping (min-width in pixels)
// ---------------------------------------------------------------------------

const BREAKPOINT_MAP: Record<string, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

function useResponsiveColumns(
  columns: number | Record<string, number> | undefined,
): number {
  const [resolved, setResolved] = React.useState(() => {
    if (columns == null) return 3;
    if (typeof columns === "number") return columns;
    // Pick the smallest breakpoint as initial (SSR-safe)
    const sorted = Object.entries(columns).sort(
      (a, b) => (BREAKPOINT_MAP[a[0]] ?? 0) - (BREAKPOINT_MAP[b[0]] ?? 0),
    );
    return sorted[0]?.[1] ?? 3;
  });

  React.useEffect(() => {
    if (typeof columns === "number" || columns == null) {
      setResolved(columns ?? 3);
      return;
    }

    const entries = Object.entries(columns)
      .map(([key, val]) => [BREAKPOINT_MAP[key] ?? parseInt(key, 10), val] as const)
      .sort((a, b) => a[0] - b[0]);

    const update = () => {
      const width = window.innerWidth;
      let matched = entries[0]?.[1] ?? 3;
      for (const [breakpoint, colCount] of entries) {
        if (width >= breakpoint) {
          matched = colCount;
        }
      }
      setResolved(matched);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [columns]);

  return resolved;
}

// ---------------------------------------------------------------------------
// Masonry
// ---------------------------------------------------------------------------

const InternalMasonry = React.forwardRef<HTMLDivElement, MasonryProps>(
  (props, ref) => {
    const {
      columns: columnsProp,
      gutter = 16,
      items,
      itemRender,
      className,
      style,
      children,
    } = props;

    const columnCount = useResponsiveColumns(columnsProp);

    // Resolve gutter values
    const [columnGap, rowGap] = Array.isArray(gutter)
      ? gutter
      : [gutter, gutter];

    // Determine what to render
    const content = React.useMemo(() => {
      if (items && items.length > 0) {
        return items.map((item, index) => {
          const rendered = itemRender ? itemRender(item, index) : item;
          return (
            <div
              key={index}
              style={{
                breakInside: "avoid",
                marginBottom: `${rowGap}px`,
              }}
            >
              {rendered}
            </div>
          );
        });
      }

      // Wrap each child in break-inside-avoid container
      const childArray = React.Children.toArray(children);
      return childArray.map((child, index) => (
        <div
          key={index}
          style={{
            breakInside: "avoid",
            marginBottom: `${rowGap}px`,
          }}
        >
          {child}
        </div>
      ));
    }, [items, itemRender, children, rowGap]);

    return (
      <div
        ref={ref}
        className={cn("w-full", className)}
        style={{
          columnCount,
          columnGap: `${columnGap}px`,
          ...style,
        }}
      >
        {content}
      </div>
    );
  },
);

InternalMasonry.displayName = "Masonry";

export { InternalMasonry };
