"use client";

import * as React from "react";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DatePickerProps } from "./types";

// ---------------------------------------------------------------------------
// Helpers
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

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function startDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(d: Date): boolean {
  return isSameDay(d, new Date());
}

function padZero(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatDate(date: Date, fmt: string): string {
  let result = fmt;
  result = result.replace("YYYY", String(date.getFullYear()));
  result = result.replace("MM", padZero(date.getMonth() + 1));
  result = result.replace("DD", padZero(date.getDate()));
  result = result.replace("HH", padZero(date.getHours()));
  result = result.replace("mm", padZero(date.getMinutes()));
  result = result.replace("ss", padZero(date.getSeconds()));
  return result;
}

// ---------------------------------------------------------------------------
// Size / Status maps
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
// InternalDatePicker
// ---------------------------------------------------------------------------

const InternalDatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (props, ref) => {
    const {
      value,
      defaultValue,
      onChange,
      format = "YYYY-MM-DD",
      showToday = true,
      disabled = false,
      disabledDate,
      placeholder = "Select date",
      size = "middle",
      status,
      variant = "outlined",
      allowClear = true,
      presets,
      suffixIcon,
      className,
      style,
      open: openProp,
      onOpenChange,
      popupClassName,
      popupStyle,
    } = props;

    // Controlled / uncontrolled value
    const [internalValue, setInternalValue] = React.useState<Date | null>(
      defaultValue ?? null
    );
    const selectedDate = value !== undefined ? value ?? null : internalValue;

    // Panel open state
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isOpen = openProp !== undefined ? openProp : internalOpen;

    const setOpen = React.useCallback(
      (next: boolean) => {
        if (openProp === undefined) setInternalOpen(next);
        onOpenChange?.(next);
      },
      [openProp, onOpenChange]
    );

    // Viewed month
    const [viewYear, setViewYear] = React.useState(
      () => (selectedDate ?? new Date()).getFullYear()
    );
    const [viewMonth, setViewMonth] = React.useState(
      () => (selectedDate ?? new Date()).getMonth()
    );

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

    // Select a date
    const handleSelect = React.useCallback(
      (day: number) => {
        const d = new Date(viewYear, viewMonth, day);
        if (disabledDate?.(d)) return;
        if (value === undefined) setInternalValue(d);
        onChange?.(d, formatDate(d, format));
        setOpen(false);
      },
      [viewYear, viewMonth, disabledDate, value, onChange, format, setOpen]
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

    // Navigate months
    const prevMonth = React.useCallback(() => {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear((y) => y - 1);
      } else {
        setViewMonth((m) => m - 1);
      }
    }, [viewMonth]);

    const nextMonth = React.useCallback(() => {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear((y) => y + 1);
      } else {
        setViewMonth((m) => m + 1);
      }
    }, [viewMonth]);

    // Build calendar grid
    const totalDays = daysInMonth(viewYear, viewMonth);
    const startDay = startDayOfMonth(viewYear, viewMonth);
    const calendarCells: (number | null)[] = [];
    for (let i = 0; i < startDay; i++) calendarCells.push(null);
    for (let d = 1; d <= totalDays; d++) calendarCells.push(d);

    // Display value
    const displayText = selectedDate ? formatDate(selectedDate, format) : "";

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
        {/* Trigger input */}
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
          {allowClear && selectedDate && !disabled ? (
            <X
              className="size-4 shrink-0 text-muted-foreground hover:text-foreground"
              onClick={handleClear}
            />
          ) : null}
          {suffixIcon ?? (
            <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
          )}
        </div>

        {/* Dropdown panel */}
        {isOpen && !disabled && (
          <div
            className={cn(
              "absolute z-50 mt-1 w-[280px] rounded-lg border bg-popover p-3 shadow-md",
              popupClassName
            )}
            style={popupStyle}
          >
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
                      if (value === undefined) setInternalValue(d);
                      onChange?.(d, formatDate(d, format));
                      setOpen(false);
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}

            {/* Header: month/year navigation */}
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                className="inline-flex size-7 items-center justify-center rounded-md hover:bg-accent"
                onClick={prevMonth}
              >
                <ChevronLeft className="size-4" />
              </button>
              <span className="text-sm font-medium">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                className="inline-flex size-7 items-center justify-center rounded-md hover:bg-accent"
                onClick={nextMonth}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            {/* Day-of-week headers */}
            <div className="mb-1 grid grid-cols-7 text-center text-xs text-muted-foreground">
              {DAYS.map((d) => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 text-center text-sm">
              {calendarCells.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} />;
                }
                const cellDate = new Date(viewYear, viewMonth, day);
                const isDisabled = disabledDate?.(cellDate) ?? false;
                const isSelected =
                  selectedDate !== null && isSameDay(cellDate, selectedDate);
                const isTodayCell = isToday(cellDate);

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleSelect(day)}
                    className={cn(
                      "inline-flex size-8 items-center justify-center rounded-md text-sm transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isDisabled &&
                        "pointer-events-none text-muted-foreground opacity-50",
                      isSelected &&
                        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                      isTodayCell &&
                        !isSelected &&
                        "border border-primary text-primary"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Today button */}
            {showToday && (
              <div className="mt-2 border-t pt-2 text-center">
                <button
                  type="button"
                  className="text-xs text-primary hover:text-primary/80"
                  onClick={() => {
                    const today = new Date();
                    if (disabledDate?.(today)) return;
                    setViewYear(today.getFullYear());
                    setViewMonth(today.getMonth());
                    if (value === undefined) setInternalValue(today);
                    onChange?.(today, formatDate(today, format));
                    setOpen(false);
                  }}
                >
                  Today
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

InternalDatePicker.displayName = "DatePicker";

export { InternalDatePicker, formatDate, isSameDay, isToday, daysInMonth, startDayOfMonth };
