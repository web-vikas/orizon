/**
 * @file Segmented -- tab-like toggle control for switching between options.
 *
 * Renders a row of mutually exclusive options with an animated indicator
 * that slides to the active item. Options can be simple strings/numbers
 * or objects with labels, icons, and disabled state.
 *
 * Key props: `options`, `value`, `onChange`, `size`, `block`, `disabled`.
 *
 * @example
 * ```tsx
 * <Segmented options={["Daily", "Weekly", "Monthly"]} />
 * <Segmented options={[{ label: "List", value: "list", icon: <ListIcon /> }]} />
 * ```
 *
 * @see ./types.ts  - SegmentedProps, SegmentedOption
 * @see ./index.ts  - public export
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { SegmentedProps, SegmentedOption, SegmentedOptionType, SegmentedSize } from "./types";

// ---------------------------------------------------------------------------
// Normalize options
// ---------------------------------------------------------------------------

function normalizeOption(opt: SegmentedOptionType): SegmentedOption {
  if (typeof opt === "string" || typeof opt === "number") {
    return { label: String(opt), value: opt };
  }
  return opt;
}

// ---------------------------------------------------------------------------
// Size mapping
// ---------------------------------------------------------------------------

const SIZE_CLASSES: Record<SegmentedSize, { container: string; item: string }> = {
  large: { container: "h-10 p-1", item: "px-3 text-sm" },
  middle: { container: "h-8 p-1", item: "px-2.5 text-sm" },
  small: { container: "h-7 p-0.5", item: "px-2 text-xs" },
};

// ---------------------------------------------------------------------------
// InternalSegmented
// ---------------------------------------------------------------------------

const InternalSegmented: React.FC<SegmentedProps> = ({
  options,
  value: valueProp,
  defaultValue,
  onChange,
  block = false,
  disabled = false,
  size = "middle",
  className,
  style,
}) => {
  const normalizedOptions = React.useMemo(
    () => options.map(normalizeOption),
    [options],
  );

  const [internalValue, setInternalValue] = React.useState<string | number>(
    () => defaultValue ?? normalizedOptions[0]?.value ?? "",
  );
  const isControlled = valueProp !== undefined;
  const activeValue = isControlled ? valueProp : internalValue;

  const handleSelect = (val: string | number) => {
    if (disabled) return;
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  const sizeClasses = SIZE_CLASSES[size];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg bg-muted",
        sizeClasses.container,
        block && "w-full",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      style={style}
      role="radiogroup"
    >
      {normalizedOptions.map((opt) => {
        const isActive = opt.value === activeValue;
        const isDisabled = disabled || opt.disabled;

        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={isDisabled}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md font-medium transition-all",
              sizeClasses.item,
              block && "flex-1",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
              isDisabled && "pointer-events-none opacity-50",
              opt.className,
            )}
            onClick={() => handleSelect(opt.value)}
          >
            {opt.icon && (
              <span className="inline-flex items-center [&>svg]:size-4">{opt.icon}</span>
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

InternalSegmented.displayName = "Segmented";

export { InternalSegmented };
