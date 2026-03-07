"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { RowContext } from "./RowContext";
import type { RowProps, Gutter, Breakpoint } from "./types";

const BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

const ALIGN_MAP: Record<string, string> = {
  top: "items-start",
  middle: "items-center",
  bottom: "items-end",
  stretch: "items-stretch",
};

const JUSTIFY_MAP: Record<string, string> = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  "space-around": "justify-around",
  "space-between": "justify-between",
  "space-evenly": "justify-evenly",
};

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = React.useState<Breakpoint>("xxl");

  React.useEffect(() => {
    function calc() {
      const w = window.innerWidth;
      if (w < BREAKPOINTS.sm) setBp("xs");
      else if (w < BREAKPOINTS.md) setBp("sm");
      else if (w < BREAKPOINTS.lg) setBp("md");
      else if (w < BREAKPOINTS.xl) setBp("lg");
      else if (w < BREAKPOINTS.xxl) setBp("xl");
      else setBp("xxl");
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return bp;
}

function resolveGutter(gutter: Gutter, breakpoint: Breakpoint): number {
  if (typeof gutter === "number") return gutter;
  // Responsive object: find the largest matching breakpoint value
  const bpOrder: Breakpoint[] = ["xxl", "xl", "lg", "md", "sm", "xs"];
  const bpIndex = bpOrder.indexOf(breakpoint);
  for (let i = bpIndex; i < bpOrder.length; i++) {
    const val = gutter[bpOrder[i]];
    if (val !== undefined) return val;
  }
  return 0;
}

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const {
    gutter = 0,
    align,
    justify,
    wrap = true,
    className,
    children,
    style,
    ...rest
  } = props;

  const breakpoint = useBreakpoint();

  const [horizontalGutter, verticalGutter] = React.useMemo(() => {
    if (Array.isArray(gutter)) {
      return [
        resolveGutter(gutter[0], breakpoint),
        resolveGutter(gutter[1], breakpoint),
      ];
    }
    return [resolveGutter(gutter, breakpoint), 0];
  }, [gutter, breakpoint]);

  const halfHorizontal = horizontalGutter / 2;

  const rowStyle: React.CSSProperties = {
    ...(horizontalGutter > 0
      ? { marginLeft: -halfHorizontal, marginRight: -halfHorizontal }
      : {}),
    ...(verticalGutter > 0 ? { rowGap: verticalGutter } : {}),
    ...style,
  };

  return (
    <RowContext.Provider value={{ gutter: [horizontalGutter, verticalGutter] }}>
      <div
        ref={ref}
        data-slot="row"
        className={cn(
          "flex",
          wrap ? "flex-wrap" : "flex-nowrap",
          align && ALIGN_MAP[align],
          justify && JUSTIFY_MAP[justify],
          className
        )}
        style={rowStyle}
        {...rest}
      >
        {children}
      </div>
    </RowContext.Provider>
  );
});

Row.displayName = "Row";

export { Row };
