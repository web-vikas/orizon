/**
 * @file InputNumber component — numeric input with stepper controls.
 *
 * Renders a text input restricted to numeric values with increment/decrement
 * buttons, min/max clamping, precision control, custom formatting/parsing,
 * keyboard arrow support, and scroll-to-change. Supports prefix, suffix,
 * addons, size, variant, and status.
 *
 * Key props: `min`, `max`, `step`, `precision`, `controls`, `formatter`, `parser`.
 *
 * @example
 * ```tsx
 * <InputNumber min={0} max={100} defaultValue={50} />
 * <InputNumber prefix="$" step={0.01} precision={2} />
 * ```
 *
 * @see {@link ./types.ts} for prop type definitions
 * @see {@link ./index.ts} for the public export
 */
"use client";

import * as React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useComponentSize } from "@/hooks/useComponentSize";
import type { InputNumberProps } from "./types";

// ---------------------------------------------------------------------------
// Size -> class mapping
// ---------------------------------------------------------------------------

const SIZE_CLASSES = {
  small: "h-7 text-xs",
  middle: "h-9 text-sm",
  large: "h-11 text-base",
} as const;

const CONTROL_ICON_SIZE = {
  small: "size-3",
  middle: "size-3.5",
  large: "size-4",
} as const;

// ---------------------------------------------------------------------------
// Status -> class mapping
// ---------------------------------------------------------------------------

const STATUS_CLASSES: Record<string, string> = {
  error:
    "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
  warning:
    "border-yellow-500 focus-within:border-yellow-500 focus-within:ring-yellow-500/20",
};

// ---------------------------------------------------------------------------
// Variant -> class mapping
// ---------------------------------------------------------------------------

const VARIANT_CLASSES: Record<string, string> = {
  outlined: "",
  borderless: "border-transparent shadow-none focus-within:ring-0",
  filled: "border-transparent bg-muted focus-within:border-ring",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toNumber(val: unknown): number {
  const n = Number(val);
  return Number.isNaN(n) ? 0 : n;
}

function clampValue(
  val: number,
  min: number | undefined,
  max: number | undefined
): number {
  let result = val;
  if (min !== undefined && result < min) result = min;
  if (max !== undefined && result > max) result = max;
  return result;
}

function toPrecision(val: number, precision: number | undefined): number {
  if (precision === undefined) return val;
  return Number(val.toFixed(precision));
}

// ---------------------------------------------------------------------------
// InternalInputNumber
// ---------------------------------------------------------------------------

const InternalInputNumber = React.forwardRef<
  HTMLInputElement,
  InputNumberProps
>((props, ref) => {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    min,
    max,
    step = 1,
    precision,
    formatter,
    parser,
    controls = true,
    addonBefore,
    addonAfter,
    prefix,
    suffix,
    size: sizeProp,
    status,
    variant = "outlined",
    disabled = false,
    readOnly = false,
    placeholder,
    keyboard = true,
    changeOnWheel = false,
    className,
    style,
    onStep,
    onPressEnter,
  } = props;

  const size = useComponentSize(sizeProp);

  // ---- Controlled / uncontrolled ----
  const [internalValue, setInternalValue] = React.useState<number | null>(
    defaultValue ?? null
  );
  const isControlled = valueProp !== undefined;
  const mergedValue = isControlled ? valueProp ?? null : internalValue;

  // ---- Track whether user is actively typing ----
  const [userTyping, setUserTyping] = React.useState(false);
  const [displayValue, setDisplayValue] = React.useState<string>("");

  // Sync display value with the actual value
  React.useEffect(() => {
    if (!userTyping) {
      if (mergedValue === null || mergedValue === undefined) {
        setDisplayValue("");
      } else {
        const numVal =
          precision !== undefined
            ? toPrecision(toNumber(mergedValue), precision)
            : toNumber(mergedValue);
        const formatted = formatter
          ? formatter(numVal as typeof mergedValue, {
              userTyping: false,
              input: String(numVal),
            })
          : String(numVal);
        setDisplayValue(formatted);
      }
    }
  }, [mergedValue, precision, formatter, userTyping]);

  // ---- Update value ----
  const updateValue = React.useCallback(
    (newVal: number | null) => {
      let finalVal = newVal;
      if (finalVal !== null) {
        finalVal = clampValue(finalVal, min as number | undefined, max as number | undefined);
        finalVal = toPrecision(finalVal, precision);
      }
      if (!isControlled) {
        setInternalValue(finalVal);
      }
      onChange?.(finalVal as number | null);
    },
    [isControlled, onChange, min, max, precision]
  );

  // ---- Step handler ----
  const handleStep = React.useCallback(
    (type: "up" | "down") => {
      if (disabled || readOnly) return;
      const current = mergedValue === null ? 0 : toNumber(mergedValue);
      const stepNum = toNumber(step);
      const offset = type === "up" ? stepNum : -stepNum;
      const next = current + offset;
      updateValue(next);
      onStep?.(next, { offset: stepNum, type });
    },
    [disabled, readOnly, mergedValue, step, updateValue, onStep]
  );

  // ---- Input change handler ----
  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserTyping(true);
      const raw = e.target.value;
      setDisplayValue(raw);

      if (raw === "" || raw === "-") {
        if (raw === "") {
          updateValue(null);
        }
        return;
      }

      const parsed = parser ? parser(raw) : toNumber(raw);
      const numParsed = toNumber(parsed);
      if (!Number.isNaN(numParsed)) {
        updateValue(numParsed);
      }
    },
    [parser, updateValue]
  );

  // ---- Blur handler ----
  const handleBlur = React.useCallback(() => {
    setUserTyping(false);
    if (mergedValue !== null && mergedValue !== undefined) {
      const clamped = clampValue(
        toPrecision(toNumber(mergedValue), precision),
        min as number | undefined,
        max as number | undefined
      );
      if (clamped !== toNumber(mergedValue)) {
        updateValue(clamped);
      }
    }
  }, [mergedValue, min, max, precision, updateValue]);

  // ---- Keyboard handler ----
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onPressEnter?.(e);
      }
      if (keyboard) {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          handleStep("up");
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          handleStep("down");
        }
      }
    },
    [keyboard, handleStep, onPressEnter]
  );

  // ---- Wheel handler ----
  const handleWheel = React.useCallback(
    (e: React.WheelEvent<HTMLInputElement>) => {
      if (!changeOnWheel || disabled || readOnly) return;
      e.preventDefault();
      if (e.deltaY < 0) {
        handleStep("up");
      } else if (e.deltaY > 0) {
        handleStep("down");
      }
    },
    [changeOnWheel, disabled, readOnly, handleStep]
  );

  // ---- Resolve controls ----
  const showControls = controls !== false;
  const upIcon =
    typeof controls === "object" && controls.upIcon ? (
      controls.upIcon
    ) : (
      <ChevronUpIcon className={cn(CONTROL_ICON_SIZE[size])} />
    );
  const downIcon =
    typeof controls === "object" && controls.downIcon ? (
      controls.downIcon
    ) : (
      <ChevronDownIcon className={cn(CONTROL_ICON_SIZE[size])} />
    );

  const isAtMax =
    max !== undefined && mergedValue !== null && toNumber(mergedValue) >= toNumber(max);
  const isAtMin =
    min !== undefined && mergedValue !== null && toNumber(mergedValue) <= toNumber(min);

  // ---- Addon styling ----
  const addonClasses =
    "inline-flex items-center justify-center border border-input bg-muted px-3 text-sm text-muted-foreground";

  // ---- Render ----
  return (
    <div
      className={cn("inline-flex items-stretch", className)}
      style={style}
    >
      {/* Addon Before */}
      {addonBefore && (
        <span className={cn(addonClasses, "rounded-l-md border-r-0")}>
          {addonBefore}
        </span>
      )}

      {/* Main wrapper */}
      <div
        className={cn(
          "relative inline-flex w-full items-center rounded-md border border-input bg-background ring-offset-background transition-colors",
          "focus-within:ring-2 focus-within:ring-ring/20 focus-within:border-ring",
          SIZE_CLASSES[size],
          status && STATUS_CLASSES[status],
          VARIANT_CLASSES[variant],
          disabled && "cursor-not-allowed opacity-50",
          addonBefore && "rounded-l-none",
          addonAfter && "rounded-r-none"
        )}
      >
        {/* Prefix */}
        {prefix && (
          <span className="flex items-center pl-3 text-muted-foreground">
            {prefix}
          </span>
        )}

        {/* Input */}
        <input
          ref={ref}
          type="text"
          inputMode="decimal"
          role="spinbutton"
          aria-valuemin={min as number | undefined}
          aria-valuemax={max as number | undefined}
          aria-valuenow={
            mergedValue !== null ? toNumber(mergedValue) : undefined
          }
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          className={cn(
            "w-full flex-1 bg-transparent px-3 text-right outline-none",
            "placeholder:text-muted-foreground",
            disabled && "cursor-not-allowed",
            SIZE_CLASSES[size]
          )}
        />

        {/* Suffix */}
        {suffix && (
          <span className="flex items-center pr-3 text-muted-foreground">
            {suffix}
          </span>
        )}

        {/* Step controls */}
        {showControls && !disabled && !readOnly && (
          <div className="flex flex-col border-l border-input">
            <button
              type="button"
              tabIndex={-1}
              disabled={isAtMax}
              onClick={() => handleStep("up")}
              className={cn(
                "flex flex-1 items-center justify-center px-1 text-muted-foreground transition-colors",
                "hover:text-foreground hover:bg-muted",
                isAtMax && "cursor-not-allowed opacity-30"
              )}
              aria-label="Increase value"
            >
              {upIcon}
            </button>
            <div className="h-px bg-border" />
            <button
              type="button"
              tabIndex={-1}
              disabled={isAtMin}
              onClick={() => handleStep("down")}
              className={cn(
                "flex flex-1 items-center justify-center px-1 text-muted-foreground transition-colors",
                "hover:text-foreground hover:bg-muted",
                isAtMin && "cursor-not-allowed opacity-30"
              )}
              aria-label="Decrease value"
            >
              {downIcon}
            </button>
          </div>
        )}
      </div>

      {/* Addon After */}
      {addonAfter && (
        <span className={cn(addonClasses, "rounded-r-md border-l-0")}>
          {addonAfter}
        </span>
      )}
    </div>
  );
});

InternalInputNumber.displayName = "InputNumber";

export { InternalInputNumber };
