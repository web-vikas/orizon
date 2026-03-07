"use client";

import * as React from "react";
import {
  Tooltip as ShadcnTooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/primitives/tooltip";
import { cn } from "@/lib/utils";
import type { TooltipProps, TooltipPlacement } from "./types";

// ---------------------------------------------------------------------------
// Placement mapping
// ---------------------------------------------------------------------------

type Side = "top" | "bottom" | "left" | "right";
type Align = "start" | "center" | "end";

function mapPlacement(placement: TooltipPlacement): { side: Side; align: Align } {
  const map: Record<TooltipPlacement, { side: Side; align: Align }> = {
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
// InternalTooltip
// ---------------------------------------------------------------------------

const InternalTooltip: React.FC<TooltipProps> = ({
  title,
  placement = "top",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  color,
  overlayClassName,
  overlayStyle,
  mouseEnterDelay = 0.1,
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

  const titleContent = typeof title === "function" ? title() : title;

  if (!titleContent && titleContent !== 0) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delay={mouseEnterDelay * 1000}>
      <ShadcnTooltip open={mergedOpen} onOpenChange={handleOpenChange}>
        <TooltipTrigger
          render={
            React.isValidElement(children)
              ? (children as React.ReactElement)
              : undefined
          }
        >
          {!React.isValidElement(children) ? children : undefined}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className={cn(overlayClassName)}
          style={{
            ...overlayStyle,
            ...(color ? { backgroundColor: color } : {}),
          }}
        >
          {titleContent}
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
};

InternalTooltip.displayName = "Tooltip";

export { InternalTooltip };
