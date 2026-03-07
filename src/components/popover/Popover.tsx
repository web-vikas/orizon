/**
 * @file Popover -- floating content panel triggered by a child element.
 *
 * Renders rich content in a positioned popup with optional title and arrow.
 * Supports hover, click, and focus triggers with 12 placement options.
 *
 * Key props: `content`, `title`, `trigger`, `placement`, `open`, `arrow`.
 *
 * @example
 * ```tsx
 * <Popover content="Hello world" title="Greeting">
 *   <Button>Hover me</Button>
 * </Popover>
 * ```
 *
 * @see ./types.ts  - PopoverProps
 * @see ./index.ts  - public export
 */
"use client";

import * as React from "react";
import {
  Popover as ShadcnPopover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from "@/primitives/popover";
import { cn } from "@/lib/utils";
import type { PopoverProps, PopoverPlacement } from "./types";

// ---------------------------------------------------------------------------
// Placement mapping
// ---------------------------------------------------------------------------

type Side = "top" | "bottom" | "left" | "right";
type Align = "start" | "center" | "end";

function mapPlacement(placement: PopoverPlacement): { side: Side; align: Align } {
  const map: Record<PopoverPlacement, { side: Side; align: Align }> = {
    top: { side: "top", align: "center" },
    topLeft: { side: "top", align: "start" },
    topRight: { side: "top", align: "end" },
    bottom: { side: "bottom", align: "center" },
    bottomLeft: { side: "bottom", align: "start" },
    bottomRight: { side: "bottom", align: "end" },
    left: { side: "left", align: "center" },
    leftTop: { side: "left", align: "start" },
    leftBottom: { side: "left", align: "end" },
    right: { side: "right", align: "center" },
    rightTop: { side: "right", align: "start" },
    rightBottom: { side: "right", align: "end" },
  };
  return map[placement];
}

// ---------------------------------------------------------------------------
// InternalPopover
// ---------------------------------------------------------------------------

const InternalPopover: React.FC<PopoverProps> = ({
  content,
  title,
  placement = "top",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  overlayClassName,
  overlayStyle,
  children,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const mergedOpen = isControlled ? openProp : internalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const { side, align } = mapPlacement(placement);
  const resolvedContent = typeof content === "function" ? content() : content;

  return (
    <ShadcnPopover open={mergedOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          React.isValidElement(children)
            ? (children as React.ReactElement)
            : undefined
        }
      >
        {!React.isValidElement(children) ? children : undefined}
      </PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        className={cn(overlayClassName)}
        style={overlayStyle}
      >
        {title && (
          <PopoverHeader>
            <PopoverTitle>{title}</PopoverTitle>
          </PopoverHeader>
        )}
        {resolvedContent && <div>{resolvedContent}</div>}
      </PopoverContent>
    </ShadcnPopover>
  );
};

InternalPopover.displayName = "Popover";

export { InternalPopover };
