"use client";

import * as React from "react";
import { Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimePickerProps } from "./types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function padZero(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatTime(date: Date, fmt: string, use12Hours: boolean): string {
  let h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  let result = fmt;

  if (use12Hours) {
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    result = result.replace("hh", padZero(h12));
    result = result.replace("HH", padZero(h12));
    result = result.replace("mm", padZero(m));
    result = result.replace("ss", padZero(s));
    result = result.replace("A", period);
    result = result.replace("a", period.toLowerCase());
  } else {
    result = result.replace("HH", padZero(h));
    result = result.replace("hh", padZero(h));
    result = result.replace("mm", padZero(m));
    result = result.replace("ss", padZero(s));
  }

  return result;
}

function generateSteps(max: number, step: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < max; i += step) result.push(i);
  return result;
}

// ---------------------------------------------------------------------------
// Size / Status / Variant maps
// ---------------------------------------------------------------------------

const SIZE_CLASSES: Record<string, string> = {
  small: "h-7 text-xs px-2",
  middle: "h-9 text-sm px-3",
  large: "h-11 text-base px-3",
};

const STATUS_CLASSES: Record<string, string> = {
  error:
    "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
  warning:
    "border-yellow-500 focus-within:border-yellow-500 focus-within:ring-yellow-500/20",
};

const VARIANT_CLASSES: Record<string, string> = {
  outlined: "border border-input",
  borderless: "border-0 shadow-none",
  filled: "border-0 bg-muted",
};

// ---------------------------------------------------------------------------
// ScrollColumn
// ---------------------------------------------------------------------------

interface ScrollColumnProps {
  items: number[];
  selectedValue: number;
  onSelect: (val: number) => void;
  disabledValues: number[];
  hideDisabled: boolean;
  renderItem?: (val: number) => React.ReactNode;
}

function ScrollColumn({
  items,
  selectedValue,
  onSelect,
  disabledValues,
  hideDisabled,
  renderItem,
}: ScrollColumnProps) {
  const colRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!colRef.current) return;
    const idx = items.indexOf(selectedValue);
    if (idx >= 0) {
      const el = colRef.current.children[idx] as HTMLElement | undefined;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedValue, items]);

  const visibleItems = hideDisabled
    ? items.filter((i) => !disabledValues.includes(i))
    : items;

  return (
    <div
      ref={colRef}
      className="flex h-[200px] w-14 flex-col overflow-y-auto border-r last:border-r-0"
    >
      {visibleItems.map((val) => {
        const isDisabled = disabledValues.includes(val);
        const isSelected = val === selectedValue;
        return (
          <button
            key={val}
            type="button"
            disabled={isDisabled}
            onClick={() => onSelect(val)}
            className={cn(
              "shrink-0 px-2 py-1 text-center text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              isDisabled &&
                "pointer-events-none text-muted-foreground opacity-50",
              isSelected && "bg-primary/10 font-medium text-primary"
            )}
          >
            {renderItem ? renderItem(val) : padZero(val)}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// InternalTimePicker
// ---------------------------------------------------------------------------

const InternalTimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (props, ref) => {
    const {
      value,
      defaultValue,
      onChange,
      format: formatProp,
      use12Hours = false,
      hourStep = 1,
      minuteStep = 1,
      secondStep = 1,
      showNow = true,
      disabled = false,
      placeholder = "Select time",
      size = "middle",
      status,
      variant = "outlined",
      allowClear = true,
      suffixIcon,
      className,
      style,
      open: openProp,
      onOpenChange,
      hideDisabledOptions = false,
      disabledTime,
    } = props;

    const fmt = formatProp ?? (use12Hours ? "hh:mm:ss A" : "HH:mm:ss");

    // Controlled / uncontrolled
    const [internalValue, setInternalValue] = React.useState<Date | null>(
      defaultValue ?? null
    );
    const selectedTime = value !== undefined ? value ?? null : internalValue;

    // Panel open
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isOpen = openProp !== undefined ? openProp : internalOpen;
    const setOpen = React.useCallback(
      (next: boolean) => {
        if (openProp === undefined) setInternalOpen(next);
        onOpenChange?.(next);
      },
      [openProp, onOpenChange]
    );

    // Temp selection (not committed until OK / Now)
    const [tempHour, setTempHour] = React.useState(
      () => selectedTime?.getHours() ?? 0
    );
    const [tempMinute, setTempMinute] = React.useState(
      () => selectedTime?.getMinutes() ?? 0
    );
    const [tempSecond, setTempSecond] = React.useState(
      () => selectedTime?.getSeconds() ?? 0
    );
    const [tempPeriod, setTempPeriod] = React.useState<"AM" | "PM">(() =>
      (selectedTime?.getHours() ?? 0) >= 12 ? "PM" : "AM"
    );

    // Sync temp when panel opens
    React.useEffect(() => {
      if (isOpen && selectedTime) {
        setTempHour(selectedTime.getHours());
        setTempMinute(selectedTime.getMinutes());
        setTempSecond(selectedTime.getSeconds());
        setTempPeriod(selectedTime.getHours() >= 12 ? "PM" : "AM");
      }
    }, [isOpen, selectedTime]);

    // Close on outside click
    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen, setOpen]);

    // Disabled items
    const disabledConfig = disabledTime?.();
    const disabledHours = disabledConfig?.disabledHours?.() ?? [];
    const disabledMinutes = disabledConfig?.disabledMinutes?.(tempHour) ?? [];
    const disabledSeconds =
      disabledConfig?.disabledSeconds?.(tempHour, tempMinute) ?? [];

    // Commit the time
    const commitTime = React.useCallback(
      (h: number, m: number, s: number) => {
        let hour = h;
        if (use12Hours) {
          if (tempPeriod === "PM" && hour < 12) hour += 12;
          if (tempPeriod === "AM" && hour === 12) hour = 0;
        }
        const d = new Date();
        d.setHours(hour, m, s, 0);
        if (value === undefined) setInternalValue(d);
        onChange?.(d, formatTime(d, fmt, use12Hours));
        setOpen(false);
      },
      [use12Hours, tempPeriod, value, onChange, fmt, setOpen]
    );

    // Clear
    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (value === undefined) setInternalValue(null);
        onChange?.(null, "");
      },
      [value, onChange]
    );

    // Display
    const displayText = selectedTime
      ? formatTime(selectedTime, fmt, use12Hours)
      : "";

    // Hour items for 12-hour mode
    const hourItems = use12Hours
      ? generateSteps(12, hourStep).map((h) => h || 12)
      : generateSteps(24, hourStep);
    const minuteItems = generateSteps(60, minuteStep);
    const secondItems = generateSteps(60, secondStep);

    // Display hour for selection in 12-hour mode
    const displayHour = use12Hours
      ? tempHour % 12 || 12
      : tempHour;

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn("relative inline-block", className)}
        style={style}
      >
        {/* Trigger */}
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && setOpen(!isOpen)}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled) {
              e.preventDefault();
              setOpen(!isOpen);
            }
          }}
          className={cn(
            "inline-flex w-full items-center gap-2 rounded-lg bg-transparent transition-colors outline-none",
            "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
            disabled && "cursor-not-allowed opacity-50",
            SIZE_CLASSES[size],
            VARIANT_CLASSES[variant],
            status && STATUS_CLASSES[status]
          )}
        >
          <span
            className={cn(
              "flex-1 truncate text-left",
              !displayText && "text-muted-foreground"
            )}
          >
            {displayText || placeholder}
          </span>
          {allowClear && selectedTime && !disabled ? (
            <X
              className="size-4 shrink-0 text-muted-foreground hover:text-foreground"
              onClick={handleClear}
            />
          ) : null}
          {suffixIcon ?? (
            <Clock className="size-4 shrink-0 text-muted-foreground" />
          )}
        </div>

        {/* Panel */}
        {isOpen && !disabled && (
          <div className="absolute z-50 mt-1 rounded-lg border bg-popover shadow-md">
            <div className="flex">
              {/* Hours */}
              <ScrollColumn
                items={hourItems}
                selectedValue={displayHour}
                onSelect={(val) => {
                  if (use12Hours) {
                    const h24 =
                      tempPeriod === "PM"
                        ? val === 12
                          ? 12
                          : val + 12
                        : val === 12
                          ? 0
                          : val;
                    setTempHour(h24);
                  } else {
                    setTempHour(val);
                  }
                }}
                disabledValues={disabledHours}
                hideDisabled={hideDisabledOptions}
              />
              {/* Minutes */}
              <ScrollColumn
                items={minuteItems}
                selectedValue={tempMinute}
                onSelect={setTempMinute}
                disabledValues={disabledMinutes}
                hideDisabled={hideDisabledOptions}
              />
              {/* Seconds */}
              <ScrollColumn
                items={secondItems}
                selectedValue={tempSecond}
                onSelect={setTempSecond}
                disabledValues={disabledSeconds}
                hideDisabled={hideDisabledOptions}
              />
              {/* AM/PM */}
              {use12Hours && (
                <div className="flex h-[200px] w-14 flex-col overflow-y-auto">
                  {(["AM", "PM"] as const).map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => {
                        setTempPeriod(period);
                        // Adjust temp hour to reflect period change
                        if (period === "AM" && tempHour >= 12)
                          setTempHour(tempHour - 12);
                        if (period === "PM" && tempHour < 12)
                          setTempHour(tempHour + 12);
                      }}
                      className={cn(
                        "shrink-0 px-2 py-1 text-center text-sm transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        tempPeriod === period &&
                          "bg-primary/10 font-medium text-primary"
                      )}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t px-2 py-1.5">
              {showNow ? (
                <button
                  type="button"
                  className="text-xs text-primary hover:text-primary/80"
                  onClick={() => {
                    const now = new Date();
                    commitTime(now.getHours(), now.getMinutes(), now.getSeconds());
                  }}
                >
                  Now
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                className="rounded-md bg-primary px-3 py-0.5 text-xs text-primary-foreground hover:bg-primary/90"
                onClick={() => commitTime(tempHour, tempMinute, tempSecond)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

InternalTimePicker.displayName = "TimePicker";

export { InternalTimePicker, formatTime };
