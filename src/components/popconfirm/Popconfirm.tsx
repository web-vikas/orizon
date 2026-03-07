"use client";

import * as React from "react";
import { CircleHelpIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/primitives/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import type { PopconfirmProps, PopconfirmPlacement } from "./types";

// Map our placement names to base-ui side/align
function mapPlacement(placement: PopconfirmPlacement): {
  side: "top" | "bottom" | "left" | "right";
  align: "start" | "center" | "end";
} {
  const map: Record<
    PopconfirmPlacement,
    { side: "top" | "bottom" | "left" | "right"; align: "start" | "center" | "end" }
  > = {
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
  return map[placement] ?? { side: "top", align: "center" };
}

const InternalPopconfirm = React.forwardRef<HTMLButtonElement, PopconfirmProps>(
  (props, ref) => {
    const {
      title,
      description,
      onConfirm,
      onCancel,
      okText = "OK",
      cancelText = "Cancel",
      okType = "primary",
      okButtonProps,
      cancelButtonProps,
      icon,
      disabled = false,
      placement = "top",
      open: controlledOpen,
      onOpenChange,
      showCancel = true,
      children,
      className,
    } = props;

    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (disabled && nextOpen) return;
        if (!isControlled) {
          setInternalOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
      },
      [disabled, isControlled, onOpenChange]
    );

    const handleConfirm = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onConfirm?.(e);
        handleOpenChange(false);
      },
      [onConfirm, handleOpenChange]
    );

    const handleCancel = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onCancel?.(e);
        handleOpenChange(false);
      },
      [onCancel, handleOpenChange]
    );

    const resolvedTitle = typeof title === "function" ? title() : title;
    const resolvedDescription =
      typeof description === "function" ? description() : description;

    const { side, align } = mapPlacement(placement);

    return (
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger ref={ref} render={<span />}>
          {children}
        </PopoverTrigger>
        <PopoverContent
          side={side}
          align={align}
          sideOffset={8}
          className={cn("w-auto min-w-[200px] max-w-[300px]", className)}
        >
          <div className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0">
              {icon ?? (
                <CircleHelpIcon className="size-4 text-yellow-500" />
              )}
            </span>
            <div className="flex-1 space-y-1">
              {resolvedTitle && (
                <div className="text-sm font-medium">{resolvedTitle}</div>
              )}
              {resolvedDescription && (
                <div className="text-xs text-muted-foreground">
                  {resolvedDescription}
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-end gap-2">
            {showCancel && (
              <Button
                type="default"
                size="small"
                onClick={handleCancel}
                {...cancelButtonProps}
              >
                {cancelText}
              </Button>
            )}
            <Button
              type={okType}
              size="small"
              onClick={handleConfirm}
              {...okButtonProps}
            >
              {okText}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

InternalPopconfirm.displayName = "Popconfirm";

export { InternalPopconfirm };
