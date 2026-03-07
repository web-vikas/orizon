"use client";

import * as React from "react";
import { Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatTime } from "./TimePicker";
import type { TimeRangePickerProps } from "./types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function padZero(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function generateSteps(max: number, step: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < max; i += step) result.push(i);
  return result;
}

// ---------------------------------------------------------------------------
// Maps
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
}

function ScrollColumn({ items, selectedValue, onSelect }: ScrollColumnProps) {
  const colRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!colRef.current) return;
    const idx = items.indexOf(selectedValue);
    if (idx >= 0) {
      const el = colRef.current.children[idx] as HTMLElement | undefined;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedValue, items]);

  return (
    <div
      ref={colRef}
      className="flex h-[200px] w-14 flex-col overflow-y-auto border-r last:border-r-0"
    >
      {items.map((val) => (
        <button
          key={val}
          type="button"
          onClick={() => onSelect(val)}
          className={cn(
            "shrink-0 px-2 py-1 text-center text-sm transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            val === selectedValue && "bg-primary/10 font-medium text-primary"
          )}
        >
          {padZero(val)}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TimeRangePicker
// ---------------------------------------------------------------------------

const TimeRangePicker = React.forwardRef<HTMLDivElement, TimeRangePickerProps>(
  (props, ref) => {
    const {
      value,
      defaultValue,
      onChange,
      format: formatProp,
      use12Hours = false,
      disabled = false,
      placeholder = ["Start time", "End time"],
      size = "middle",
      status,
      variant = "outlined",
      allowClear = true,
      className,
      style,
      order = true,
    } = props;

    const fmt = formatProp ?? (use12Hours ? "hh:mm:ss A" : "HH:mm:ss");

    const isDisabledStart = Array.isArray(disabled) ? disabled[0] : disabled;
    const isDisabledEnd = Array.isArray(disabled) ? disabled[1] : disabled;
    const isFullyDisabled = isDisabledStart && isDisabledEnd;

    // Controlled / uncontrolled
    const [internalValue, setInternalValue] = React.useState<
      [Date | null, Date | null]
    >(defaultValue ?? [null, null]);
    const rangeValue = value !== undefined ? value : internalValue;

    // Panel
    const [isOpen, setIsOpen] = React.useState(false);
    const [activePanel, setActivePanel] = React.useState<"start" | "end">(
      "start"
    );

    // Temp values
    const initHour = (d: Date | null) => d?.getHours() ?? 0;
    const initMin = (d: Date | null) => d?.getMinutes() ?? 0;
    const initSec = (d: Date | null) => d?.getSeconds() ?? 0;

    const [startHour, setStartHour] = React.useState(() =>
      initHour(rangeValue[0])
    );
    const [startMinute, setStartMinute] = React.useState(() =>
      initMin(rangeValue[0])
    );
    const [startSecond, setStartSecond] = React.useState(() =>
      initSec(rangeValue[0])
    );
    const [endHour, setEndHour] = React.useState(() =>
      initHour(rangeValue[1])
    );
    const [endMinute, setEndMinute] = React.useState(() =>
      initMin(rangeValue[1])
    );
    const [endSecond, setEndSecond] = React.useState(() =>
      initSec(rangeValue[1])
    );

    // Sync when opening
    React.useEffect(() => {
      if (isOpen) {
        setStartHour(initHour(rangeValue[0]));
        setStartMinute(initMin(rangeValue[0]));
        setStartSecond(initSec(rangeValue[0]));
        setEndHour(initHour(rangeValue[1]));
        setEndMinute(initMin(rangeValue[1]));
        setEndSecond(initSec(rangeValue[1]));
      }
      // Only sync on open toggle
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    // Close on outside click
    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);

    const buildDate = React.useCallback(
      (h: number, m: number, s: number) => {
        const d = new Date();
        d.setHours(h, m, s, 0);
        return d;
      },
      []
    );

    const commitRange = React.useCallback(() => {
      let start = buildDate(startHour, startMinute, startSecond);
      let end = buildDate(endHour, endMinute, endSecond);
      if (order && start > end) {
        [start, end] = [end, start];
      }
      const newRange: [Date | null, Date | null] = [start, end];
      if (value === undefined) setInternalValue(newRange);
      onChange?.(newRange, [
        formatTime(start, fmt, use12Hours),
        formatTime(end, fmt, use12Hours),
      ]);
      setIsOpen(false);
    }, [
      startHour,
      startMinute,
      startSecond,
      endHour,
      endMinute,
      endSecond,
      order,
      value,
      onChange,
      fmt,
      use12Hours,
      buildDate,
    ]);

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        const empty: [Date | null, Date | null] = [null, null];
        if (value === undefined) setInternalValue(empty);
        onChange?.(empty, ["", ""]);
      },
      [value, onChange]
    );

    const displayStart = rangeValue[0]
      ? formatTime(rangeValue[0], fmt, use12Hours)
      : "";
    const displayEnd = rangeValue[1]
      ? formatTime(rangeValue[1], fmt, use12Hours)
      : "";
    const hasValue = rangeValue[0] !== null || rangeValue[1] !== null;

    const hours = generateSteps(24, 1);
    const minutes = generateSteps(60, 1);
    const seconds = generateSteps(60, 1);

    const currentHour = activePanel === "start" ? startHour : endHour;
    const currentMinute = activePanel === "start" ? startMinute : endMinute;
    const currentSecond = activePanel === "start" ? startSecond : endSecond;

    const setCurrentHour =
      activePanel === "start" ? setStartHour : setEndHour;
    const setCurrentMinute =
      activePanel === "start" ? setStartMinute : setEndMinute;
    const setCurrentSecond =
      activePanel === "start" ? setStartSecond : setEndSecond;

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
          tabIndex={isFullyDisabled ? -1 : 0}
          onClick={() => !isFullyDisabled && setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (
              (e.key === "Enter" || e.key === " ") &&
              !isFullyDisabled
            ) {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          className={cn(
            "inline-flex w-full items-center gap-1 rounded-lg bg-transparent transition-colors outline-none",
            "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
            isFullyDisabled && "cursor-not-allowed opacity-50",
            SIZE_CLASSES[size],
            VARIANT_CLASSES[variant],
            status && STATUS_CLASSES[status]
          )}
        >
          <span
            className={cn(
              "truncate",
              !displayStart && "text-muted-foreground"
            )}
          >
            {displayStart || placeholder[0]}
          </span>
          <span className="text-muted-foreground">~</span>
          <span
            className={cn(
              "truncate",
              !displayEnd && "text-muted-foreground"
            )}
          >
            {displayEnd || placeholder[1]}
          </span>
          <span className="ml-auto flex shrink-0 items-center gap-1">
            {allowClear && hasValue && !isFullyDisabled ? (
              <X
                className="size-4 text-muted-foreground hover:text-foreground"
                onClick={handleClear}
              />
            ) : null}
            <Clock className="size-4 text-muted-foreground" />
          </span>
        </div>

        {/* Panel */}
        {isOpen && !isFullyDisabled && (
          <div className="absolute z-50 mt-1 rounded-lg border bg-popover shadow-md">
            {/* Panel tabs */}
            <div className="flex border-b text-sm">
              <button
                type="button"
                className={cn(
                  "flex-1 px-3 py-1.5 text-center transition-colors",
                  activePanel === "start" &&
                    "border-b-2 border-primary font-medium text-primary"
                )}
                onClick={() => setActivePanel("start")}
              >
                Start
              </button>
              <button
                type="button"
                className={cn(
                  "flex-1 px-3 py-1.5 text-center transition-colors",
                  activePanel === "end" &&
                    "border-b-2 border-primary font-medium text-primary"
                )}
                onClick={() => setActivePanel("end")}
              >
                End
              </button>
            </div>

            {/* Columns */}
            <div className="flex">
              <ScrollColumn
                items={hours}
                selectedValue={currentHour}
                onSelect={setCurrentHour}
              />
              <ScrollColumn
                items={minutes}
                selectedValue={currentMinute}
                onSelect={setCurrentMinute}
              />
              <ScrollColumn
                items={seconds}
                selectedValue={currentSecond}
                onSelect={setCurrentSecond}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end border-t px-2 py-1.5">
              <button
                type="button"
                className="rounded-md bg-primary px-3 py-0.5 text-xs text-primary-foreground hover:bg-primary/90"
                onClick={commitRange}
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

TimeRangePicker.displayName = "TimeRangePicker";

export { TimeRangePicker };
