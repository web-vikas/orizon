"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { FlexProps } from "./types";

const GAP_MAP: Record<string, number> = {
  small: 8,
  middle: 16,
  large: 24,
};

function resolveGap(gap: FlexProps["gap"]): string | number | undefined {
  if (gap === undefined) return undefined;
  if (typeof gap === "number") return gap;
  if (gap in GAP_MAP) return GAP_MAP[gap];
  return gap; // CSS string like "1rem"
}

const Flex = React.forwardRef<HTMLElement, FlexProps>((props, ref) => {
  const {
    vertical = false,
    wrap,
    justify,
    align,
    gap,
    flex,
    component: Component = "div",
    className,
    style,
    children,
    ...rest
  } = props;

  const resolvedGap = resolveGap(gap);

  const wrapValue =
    wrap === true
      ? "wrap"
      : wrap === false
        ? "nowrap"
        : wrap;

  return (
    <Component
      ref={ref}
      data-slot="flex"
      className={cn("flex", className)}
      style={{
        flexDirection: vertical ? "column" : "row",
        flexWrap: wrapValue,
        justifyContent: justify,
        alignItems: align,
        gap: resolvedGap,
        flex,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
});

Flex.displayName = "Flex";

export { Flex };
