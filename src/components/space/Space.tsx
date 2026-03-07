"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { SpaceProps, SpaceSize } from "./types";

const SIZE_MAP: Record<string, number> = {
  small: 8,
  middle: 16,
  large: 24,
};

function resolveSize(size: SpaceSize): number {
  if (typeof size === "number") return size;
  return SIZE_MAP[size] ?? 8;
}

const ALIGN_MAP: Record<string, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
};

const InternalSpace = React.forwardRef<HTMLDivElement, SpaceProps>(
  (props, ref) => {
    const {
      align,
      size = "small",
      direction = "horizontal",
      wrap = false,
      split,
      className,
      children,
      style,
      ...rest
    } = props;

    const [horizontalSize, verticalSize] = Array.isArray(size)
      ? [resolveSize(size[0]), resolveSize(size[1])]
      : [resolveSize(size), resolveSize(size)];

    const items = React.Children.toArray(children).filter(
      (child) => child !== null && child !== undefined
    );

    const mergedAlign = align ?? (direction === "horizontal" ? "center" : undefined);

    return (
      <div
        ref={ref}
        data-slot="space"
        className={cn(
          "inline-flex",
          direction === "vertical" ? "flex-col" : "flex-row",
          wrap && "flex-wrap",
          mergedAlign && ALIGN_MAP[mergedAlign],
          className
        )}
        style={{
          columnGap: horizontalSize,
          rowGap: verticalSize,
          ...style,
        }}
        {...rest}
      >
        {items.map((child, i) => (
          <React.Fragment key={i}>
            {split && i > 0 && (
              <span data-slot="space-split" className="inline-flex items-center">
                {split}
              </span>
            )}
            {child}
          </React.Fragment>
        ))}
      </div>
    );
  }
);

InternalSpace.displayName = "Space";

export { InternalSpace };
