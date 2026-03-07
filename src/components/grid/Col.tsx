"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { RowContext } from "./RowContext";
import type { ColProps, ColSpanType, Breakpoint } from "./types";

function normalizeBreakpointValue(
  val: number | ColSpanType | undefined
): ColSpanType | undefined {
  if (val === undefined) return undefined;
  if (typeof val === "number") return { span: val };
  return val;
}

// Breakpoint-based media query classes (mobile-first)
const BREAKPOINT_QUERIES: Record<Breakpoint, string> = {
  xs: "(max-width: 575px)",
  sm: "(min-width: 576px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
  xxl: "(min-width: 1600px)",
};

function useCurrentBreakpoints(): Set<Breakpoint> {
  const [active, setActive] = React.useState<Set<Breakpoint>>(new Set());

  React.useEffect(() => {
    const mediaQueryLists: { bp: Breakpoint; mql: MediaQueryList }[] = [];

    function update() {
      const newActive = new Set<Breakpoint>();
      for (const { bp, mql } of mediaQueryLists) {
        if (mql.matches) newActive.add(bp);
      }
      setActive(newActive);
    }

    for (const bp of Object.keys(BREAKPOINT_QUERIES) as Breakpoint[]) {
      const mql = window.matchMedia(BREAKPOINT_QUERIES[bp]);
      mediaQueryLists.push({ bp, mql });
      mql.addEventListener("change", update);
    }

    update();

    return () => {
      for (const { mql } of mediaQueryLists) {
        mql.removeEventListener("change", update);
      }
    };
  }, []);

  return active;
}

const Col = React.forwardRef<HTMLDivElement, ColProps>((props, ref) => {
  const {
    span,
    offset,
    push,
    pull,
    order,
    flex,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    className,
    children,
    style,
    ...rest
  } = props;

  const { gutter } = React.useContext(RowContext);
  const activeBps = useCurrentBreakpoints();

  // Determine effective span/offset/push/pull from breakpoints (largest active wins)
  const bpOrder: Breakpoint[] = ["xxl", "xl", "lg", "md", "sm", "xs"];
  const breakpointValues = { xs, sm, md, lg, xl, xxl };

  let effectiveConfig: ColSpanType = {
    span,
    offset,
    push,
    pull,
    order,
  };

  // Apply responsive breakpoints: go from smallest to largest active
  const activeSorted = bpOrder
    .reverse()
    .filter((bp) => activeBps.has(bp));

  for (const bp of activeSorted) {
    const bpVal = normalizeBreakpointValue(
      breakpointValues[bp as keyof typeof breakpointValues]
    );
    if (bpVal) {
      effectiveConfig = { ...effectiveConfig, ...bpVal };
    }
  }

  const {
    span: effectiveSpan,
    offset: effectiveOffset = 0,
    push: effectivePush = 0,
    pull: effectivePull = 0,
    order: effectiveOrder,
  } = effectiveConfig;

  const halfGutter = gutter[0] / 2;

  // Build styles
  const colStyle: React.CSSProperties = {
    ...(halfGutter > 0
      ? { paddingLeft: halfGutter, paddingRight: halfGutter }
      : {}),
    ...(effectiveSpan !== undefined && effectiveSpan > 0
      ? {
          flex: `0 0 ${(effectiveSpan / 24) * 100}%`,
          maxWidth: `${(effectiveSpan / 24) * 100}%`,
        }
      : effectiveSpan === 0
        ? { display: "none" }
        : {}),
    ...(flex !== undefined ? { flex: typeof flex === "number" ? `${flex} ${flex} auto` : flex } : {}),
    ...(effectiveOffset > 0
      ? { marginLeft: `${(effectiveOffset / 24) * 100}%` }
      : {}),
    ...(effectivePush > 0
      ? { left: `${(effectivePush / 24) * 100}%` }
      : {}),
    ...(effectivePull > 0
      ? { right: `${(effectivePull / 24) * 100}%` }
      : {}),
    ...(effectiveOrder !== undefined ? { order: effectiveOrder } : {}),
    ...style,
  };

  // If span is undefined and no flex is set, allow the column to grow
  if (effectiveSpan === undefined && flex === undefined) {
    colStyle.flex = "1";
  }

  return (
    <div
      ref={ref}
      data-slot="col"
      className={cn(
        "relative min-h-[1px]",
        (effectivePush > 0 || effectivePull > 0) && "relative",
        className
      )}
      style={colStyle}
      {...rest}
    >
      {children}
    </div>
  );
});

Col.displayName = "Col";

export { Col };
