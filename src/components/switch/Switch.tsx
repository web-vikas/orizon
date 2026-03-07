"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { Switch as PrimitiveSwitch } from "@/primitives/switch";
import { cn } from "@/lib/utils";
import type { SwitchProps } from "./types";

const SIZE_MAP = {
  middle: "default" as const,
  small: "sm" as const,
};

const InternalSwitch = React.forwardRef<HTMLElement, SwitchProps>(
  (props, ref) => {
    const {
      checked: checkedProp,
      defaultChecked = false,
      disabled = false,
      loading = false,
      size = "middle",
      checkedChildren,
      unCheckedChildren,
      onChange,
      onClick,
      className,
      id,
    } = props;

    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isControlled = checkedProp !== undefined;
    const actualChecked = isControlled ? checkedProp : internalChecked;

    const mappedSize = SIZE_MAP[size];
    const isDisabled = disabled || loading;

    const handleCheckedChange = React.useCallback(
      (nextChecked: boolean) => {
        if (!isControlled) {
          setInternalChecked(nextChecked);
        }
        onChange?.(nextChecked);
      },
      [isControlled, onChange]
    );

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        onClick?.(e);
      },
      [onClick]
    );

    const hasInnerContent = checkedChildren || unCheckedChildren;

    return (
      <div className="relative inline-flex items-center">
        <PrimitiveSwitch
          ref={ref}
          id={id}
          size={mappedSize}
          checked={actualChecked}
          onCheckedChange={handleCheckedChange}
          disabled={isDisabled}
          onClick={handleClick}
          className={cn(
            hasInnerContent && [
              // Make the switch wider to accommodate text
              size === "middle" && "h-[22px] w-[44px]",
              size === "small" && "h-[18px] w-[34px]",
            ],
            className
          )}
        />

        {/* Loading spinner overlaid on the thumb */}
        {loading && (
          <span
            className={cn(
              "pointer-events-none absolute flex items-center justify-center",
              size === "middle" && "left-[2px] size-4",
              size === "small" && "left-[1px] size-3",
              actualChecked && [
                size === "middle" && "left-auto right-[2px]",
                size === "small" && "left-auto right-[1px]",
              ]
            )}
          >
            <Loader2
              className={cn(
                "animate-spin text-muted-foreground",
                size === "middle" && "size-3",
                size === "small" && "size-2.5"
              )}
            />
          </span>
        )}

        {/* Inner text content */}
        {hasInnerContent && (
          <span
            className={cn(
              "pointer-events-none absolute inset-0 flex items-center",
              size === "middle" && "text-[10px]",
              size === "small" && "text-[8px]",
              "text-primary-foreground font-medium leading-none"
            )}
          >
            {actualChecked ? (
              <span
                className={cn(
                  "truncate",
                  size === "middle" && "pl-[5px] pr-[20px]",
                  size === "small" && "pl-[4px] pr-[16px]"
                )}
              >
                {checkedChildren}
              </span>
            ) : (
              <span
                className={cn(
                  "truncate text-right w-full",
                  size === "middle" && "pl-[20px] pr-[5px]",
                  size === "small" && "pl-[16px] pr-[4px]"
                )}
              >
                {unCheckedChildren}
              </span>
            )}
          </span>
        )}
      </div>
    );
  }
);

InternalSwitch.displayName = "Switch";

export { InternalSwitch };
