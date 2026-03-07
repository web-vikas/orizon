/**
 * @file RangePicker Component
 *
 * A date range input with two side-by-side calendar panels.
 * Used via `DatePicker.RangePicker`. Supports hover-preview of
 * the range, disabled dates, presets, clearable value, and all
 * DatePicker sizing / variant / status options.
 *
 * @see {@link ./DatePicker.tsx} — single date picker
 * @see {@link ./types.ts} — prop definitions
 * @see {@link ./index.ts} — barrel export
 */

"use client";

import * as React from "react";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  formatDate,
  isSameDay,
  isToday,
  daysInMonth,
  startDayOfMonth,
} from "./DatePicker";
import type { RangePickerProps } from "./types";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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
// Helpers
// ---------------------------------------------------------------------------

function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const t = date.getTime();
  return t > start.getTime() && t < end.getTime();
}

// ---------------------------------------------------------------------------
// CalendarPanel
// ---------------------------------------------------------------------------

interface CalendarPanelProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  hoverDate: Date | null;
  onSelect: (d: Date) => void;
  onHover: (d: Date | null) => void;
  disabledDate?: (d: Date) => boolean;
}

function CalendarPanel({
  year,
  month,
  onPrev,
  onNext,
  rangeStart,
  rangeEnd,
  hoverDate,
  onSelect,
  onHover,
  disabledDate,
}: CalendarPanelProps) {
  const totalDays = daysInMonth(year, month);
  const startDay = startDayOfMonth(year, month);
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  const effectiveEnd = rangeEnd ?? hoverDate;

  return (
    <div className="w-[250px]">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          className="inline-flex size-7 items-center justify-center rounded-md hover:bg-accent"
          onClick={onPrev}
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-sm font-medium">
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          className="inline-flex size-7 items-center justify-center rounded-md hover:bg-accent"
          onClick={onNext}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="mb-1 grid grid-cols-7 text-center text-xs text-muted-foreground">
        {DAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 text-center text-sm">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`empty-${idx}`} />;
          const cellDate = new Date(year, month, day);
          const isDisabled = disabledDate?.(cellDate) ?? false;
          const isStart =
            rangeStart !== null && isSameDay(cellDate, rangeStart);
          const isEnd =
            effectiveEnd !== null && isSameDay(cellDate, effectiveEnd);
          const inRange = isInRange(
            cellDate,
            rangeStart,
            effectiveEnd && rangeStart && effectiveEnd >= rangeStart
              ? effectiveEnd
              : null
          );
          const isTodayCell = isToday(cellDate);

          return (
            <button
              key={day}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect(cellDate)}
              onMouseEnter={() => onHover(cellDate)}
              onMouseLeave={() => onHover(null)}
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-md text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isDisabled &&
                  "pointer-events-none text-muted-foreground opacity-50",
                (isStart || isEnd) &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                inRange && "bg-primary/10",
                isTodayCell &&
                  !isStart &&
                  !isEnd &&
                  "border border-primary text-primary"
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// RangePicker
// ---------------------------------------------------------------------------

const RangePicker = React.forwardRef<HTMLDivElement, RangePickerProps>(
  (props, ref) => {
    const {
      value,
      defaultValue,
      onChange,
      format = "YYYY-MM-DD",
      disabled = false,
      disabledDate,
      placeholder = ["Start date", "End date"],
      size = "middle",
      status,
      variant = "outlined",
      allowClear = true,
      presets,
      separator,
      className,
      style,
    } = props;

    const isDisabledStart = Array.isArray(disabled) ? disabled[0] : disabled;
    const isDisabledEnd = Array.isArray(disabled) ? disabled[1] : disabled;
    const isFullyDisabled = isDisabledStart && isDisabledEnd;

    // Controlled / uncontrolled
    const [internalValue, setInternalValue] = React.useState<
      [Date | null, Date | null]
    >(defaultValue ?? [null, null]);
    const rangeValue = value !== undefined ? value : internalValue;

    // Panel state
    const [isOpen, setIsOpen] = React.useState(false);
    const [picking, setPicking] = React.useState<"start" | "end">("start");
    const [tempStart, setTempStart] = React.useState<Date | null>(
      rangeValue[0]
    );
    const [hoverDate, setHoverDate] = React.useState<Date | null>(null);

    // Calendar months
    const now = new Date();
    const [leftYear, setLeftYear] = React.useState(
      () => (rangeValue[0] ?? now).getFullYear()
    );
    const [leftMonth, setLeftMonth] = React.useState(
      () => (rangeValue[0] ?? now).getMonth()
    );

    const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;
    const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1;

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

    const handleSelect = React.useCallback(
      (d: Date) => {
        if (picking === "start") {
          setTempStart(d);
          setPicking("end");
        } else {
          let start = tempStart;
          let end: Date | null = d;
          if (start && end < start) {
            [start, end] = [end, start];
          }
          const newRange: [Date | null, Date | null] = [start, end];
          if (value === undefined) setInternalValue(newRange);
          onChange?.(newRange, [
            start ? formatDate(start, format) : "",
            end ? formatDate(end, format) : "",
          ]);
          setIsOpen(false);
          setPicking("start");
          setTempStart(null);
        }
      },
      [picking, tempStart, value, onChange, format]
    );

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        const empty: [Date | null, Date | null] = [null, null];
        if (value === undefined) setInternalValue(empty);
        onChange?.(empty, ["", ""]);
      },
      [value, onChange]
    );

    const prevMonth = React.useCallback(() => {
      if (leftMonth === 0) {
        setLeftMonth(11);
        setLeftYear((y) => y - 1);
      } else {
        setLeftMonth((m) => m - 1);
      }
    }, [leftMonth]);

    const nextMonth = React.useCallback(() => {
      if (leftMonth === 11) {
        setLeftMonth(0);
        setLeftYear((y) => y + 1);
      } else {
        setLeftMonth((m) => m + 1);
      }
    }, [leftMonth]);

    const displayStart = rangeValue[0] ? formatDate(rangeValue[0], format) : "";
    const displayEnd = rangeValue[1] ? formatDate(rangeValue[1], format) : "";
    const hasValue = rangeValue[0] !== null || rangeValue[1] !== null;

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
          onClick={() => {
            if (!isFullyDisabled) {
              setIsOpen(!isOpen);
              setPicking("start");
              setTempStart(rangeValue[0]);
            }
          }}
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
          <span className="text-muted-foreground">
            {separator ?? "~"}
          </span>
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
            <CalendarDays className="size-4 text-muted-foreground" />
          </span>
        </div>

        {/* Panel */}
        {isOpen && !isFullyDisabled && (
          <div className="absolute z-50 mt-1 rounded-lg border bg-popover p-3 shadow-md">
            {/* Presets */}
            {presets && presets.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1 border-b pb-2">
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="rounded-md bg-muted px-2 py-0.5 text-xs hover:bg-accent"
                    onClick={() => {
                      const d = preset.value;
                      const newRange: [Date | null, Date | null] = [
                        d,
                        rangeValue[1],
                      ];
                      if (value === undefined) setInternalValue(newRange);
                      onChange?.(newRange, [
                        formatDate(d, format),
                        rangeValue[1] ? formatDate(rangeValue[1], format) : "",
                      ]);
                      setIsOpen(false);
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}

            {/* Two calendars side by side */}
            <div className="flex gap-4">
              <CalendarPanel
                year={leftYear}
                month={leftMonth}
                onPrev={prevMonth}
                onNext={nextMonth}
                rangeStart={picking === "end" ? tempStart : rangeValue[0]}
                rangeEnd={picking === "end" ? null : rangeValue[1]}
                hoverDate={picking === "end" ? hoverDate : null}
                onSelect={handleSelect}
                onHover={setHoverDate}
                disabledDate={disabledDate}
              />
              <CalendarPanel
                year={rightYear}
                month={rightMonth}
                onPrev={prevMonth}
                onNext={nextMonth}
                rangeStart={picking === "end" ? tempStart : rangeValue[0]}
                rangeEnd={picking === "end" ? null : rangeValue[1]}
                hoverDate={picking === "end" ? hoverDate : null}
                onSelect={handleSelect}
                onHover={setHoverDate}
                disabledDate={disabledDate}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

RangePicker.displayName = "RangePicker";

export { RangePicker };
