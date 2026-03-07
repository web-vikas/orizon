/**
 * @file Calendar Component
 *
 * Full-featured calendar with two modes: a full-screen grid view
 * and a compact mini calendar using the shadcn primitive. Supports
 * month / year panel switching, custom cell rendering, disabled
 * dates, and controlled / uncontrolled selection.
 *
 * Key props: `fullscreen`, `mode`, `value`, `disabledDate`,
 * `cellRender`, `headerRender`, `onChange`, `onSelect`.
 *
 * @example
 * ```tsx
 * <Calendar />
 * <Calendar fullscreen={false} />
 * <Calendar mode="year" />
 * ```
 *
 * @see {@link ./types.ts} — prop definitions
 * @see {@link ./index.ts} — barrel export
 */

"use client";

import * as React from "react";
import { Calendar as ShadcnCalendar } from "@/primitives/calendar";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { CalendarProps, CalendarMode } from "./types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

// ---------------------------------------------------------------------------
// Full Calendar (custom full-screen mode)
// ---------------------------------------------------------------------------

const FullCalendar: React.FC<CalendarProps> = ({
  value: valueProp,
  defaultValue,
  mode: modeProp = "month",
  cellRender,
  headerRender,
  disabledDate,
  onChange,
  onPanelChange,
  onSelect,
  className,
  style,
}) => {
  const [currentDate, setCurrentDate] = React.useState<Date>(
    valueProp ?? defaultValue ?? new Date(),
  );
  const [mode, setMode] = React.useState<CalendarMode>(modeProp);

  const isControlled = valueProp !== undefined;
  const selectedDate = isControlled ? valueProp : currentDate;

  React.useEffect(() => {
    if (modeProp !== undefined) setMode(modeProp);
  }, [modeProp]);

  const handleDateChange = (date: Date) => {
    if (!isControlled) setCurrentDate(date);
    onChange?.(date);
  };

  const handleModeChange = (newMode: CalendarMode) => {
    setMode(newMode);
    onPanelChange?.(selectedDate, newMode);
  };

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const navigateMonth = (delta: number) => {
    const newDate = new Date(year, month + delta, 1);
    handleDateChange(newDate);
    onPanelChange?.(newDate, mode);
  };

  const navigateYear = (delta: number) => {
    const newDate = new Date(year + delta, month, 1);
    handleDateChange(newDate);
    onPanelChange?.(newDate, mode);
  };

  // Default header
  const defaultHeader = (
    <div className="flex items-center justify-between pb-4">
      <div className="flex items-center gap-2">
        <button
          className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background hover:bg-muted"
          onClick={() => (mode === "month" ? navigateMonth(-1) : navigateYear(-1))}
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <span className="min-w-[140px] text-center text-base font-semibold">
          {mode === "month"
            ? `${MONTHS[month]} ${year}`
            : `${year}`}
        </span>
        <button
          className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background hover:bg-muted"
          onClick={() => (mode === "month" ? navigateMonth(1) : navigateYear(1))}
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
      <div className="flex items-center rounded-md border border-input">
        <button
          className={cn(
            "px-3 py-1.5 text-sm transition-colors",
            mode === "month" && "bg-primary text-primary-foreground",
          )}
          onClick={() => handleModeChange("month")}
        >
          Month
        </button>
        <button
          className={cn(
            "px-3 py-1.5 text-sm transition-colors",
            mode === "year" && "bg-primary text-primary-foreground",
          )}
          onClick={() => handleModeChange("year")}
        >
          Year
        </button>
      </div>
    </div>
  );

  const header = headerRender
    ? headerRender({
        value: selectedDate,
        type: mode,
        onChange: handleDateChange,
        onTypeChange: handleModeChange,
      })
    : defaultHeader;

  // Render month view
  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfWeek(year, month);
    const days: (Date | null)[] = [];

    // Previous month padding
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d));
    }

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div>
        <div className="grid grid-cols-7">
          {weekDays.map((day) => (
            <div
              key={day}
              className="border-b py-2 text-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((date, idx) => {
            if (!date) {
              return <div key={`empty-${idx}`} className="min-h-[80px] border-b border-r p-2" />;
            }

            const isDisabled = disabledDate?.(date) ?? false;
            const isSelectedDay = isSameDay(date, selectedDate);
            const isTodayDate = isToday(date);

            const defaultNode = <span>{date.getDate()}</span>;
            const cellContent = cellRender
              ? cellRender(date, { originNode: defaultNode, type: "date" })
              : defaultNode;
            void cellContent;

            return (
              <div
                key={date.toISOString()}
                className={cn(
                  "min-h-[80px] cursor-pointer border-b border-r p-2 transition-colors hover:bg-muted/50",
                  isDisabled && "pointer-events-none opacity-40",
                  isSelectedDay && "bg-primary/5",
                )}
                onClick={() => {
                  if (isDisabled) return;
                  handleDateChange(date);
                  onSelect?.(date, { source: "date" });
                }}
              >
                <div
                  className={cn(
                    "inline-flex size-6 items-center justify-center rounded-full text-sm",
                    isTodayDate && "bg-primary text-primary-foreground",
                    isSelectedDay && !isTodayDate && "bg-primary/20 font-medium",
                  )}
                >
                  {date.getDate()}
                </div>
                {cellRender && (
                  <div className="mt-1">
                    {cellRender(date, { originNode: defaultNode, type: "date" })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render year view
  const renderYearView = () => {
    return (
      <div className="grid grid-cols-3 gap-4 p-4">
        {MONTHS.map((monthName, idx) => {
          const date = new Date(year, idx, 1);
          const isCurrentMonth = idx === new Date().getMonth() && year === new Date().getFullYear();
          const isSelectedMonth = idx === selectedDate.getMonth();

          const defaultNode = <span>{monthName}</span>;

          return (
            <div
              key={idx}
              className={cn(
                "cursor-pointer rounded-lg p-4 text-center transition-colors hover:bg-muted/50",
                isSelectedMonth && "bg-primary/5 font-medium",
                isCurrentMonth && "ring-1 ring-primary",
              )}
              onClick={() => {
                handleDateChange(date);
                onSelect?.(date, { source: "month" });
              }}
            >
              <div className="text-sm font-medium">{monthName}</div>
              {cellRender && (
                <div className="mt-1">
                  {cellRender(date, { originNode: defaultNode, type: "month" })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("w-full", className)} style={style}>
      {header}
      {mode === "month" ? renderMonthView() : renderYearView()}
    </div>
  );
};

// ---------------------------------------------------------------------------
// InternalCalendar
// ---------------------------------------------------------------------------

const InternalCalendar: React.FC<CalendarProps> = ({
  value,
  defaultValue,
  mode = "month",
  fullscreen = true,
  cellRender,
  headerRender,
  disabledDate,
  onChange,
  onPanelChange,
  onSelect,
  className,
  style,
}) => {
  if (fullscreen) {
    return (
      <FullCalendar
        value={value}
        defaultValue={defaultValue}
        mode={mode}
        cellRender={cellRender}
        headerRender={headerRender}
        disabledDate={disabledDate}
        onChange={onChange}
        onPanelChange={onPanelChange}
        onSelect={onSelect}
        className={className}
        style={style}
      />
    );
  }

  // Mini calendar using shadcn primitive
  return (
    <div className={cn("w-fit", className)} style={style}>
      <ShadcnCalendar
        mode="single"
        selected={value ?? defaultValue}
        onSelect={(date) => {
          if (date) {
            onChange?.(date);
            onSelect?.(date, { source: "date" });
          }
        }}
        disabled={disabledDate}
      />
    </div>
  );
};

InternalCalendar.displayName = "Calendar";

export { InternalCalendar };
