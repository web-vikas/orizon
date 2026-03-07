"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { SpaceCompactProps } from "./types";

const SpaceCompact = React.forwardRef<HTMLDivElement, SpaceCompactProps>(
  (props, ref) => {
    const {
      direction = "horizontal",
      size,
      block = false,
      className,
      children,
      ...rest
    } = props;

    return (
      <div
        ref={ref}
        data-slot="space-compact"
        className={cn(
          "inline-flex",
          direction === "vertical" ? "flex-col" : "flex-row",
          block && "flex w-full",
          // Remove gaps and merge borders
          direction === "horizontal" &&
            "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:-ml-px",
          direction === "vertical" &&
            "[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>*:not(:first-child)]:-mt-px",
          className
        )}
        {...rest}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && size) {
            return React.cloneElement(
              child as React.ReactElement<{ size?: string }>,
              { size: size ?? (child.props as { size?: string }).size }
            );
          }
          return child;
        })}
      </div>
    );
  }
);

SpaceCompact.displayName = "Space.Compact";

export { SpaceCompact };
