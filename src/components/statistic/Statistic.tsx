"use client";

import * as React from "react";
import { Skeleton } from "@/primitives/skeleton";
import { cn } from "@/lib/utils";
import type { StatisticProps, CountdownProps } from "./types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatNumber(
  value: number | string,
  precision?: number,
  groupSeparator = ",",
  decimalSeparator = ".",
): string {
  if (typeof value === "string") return value;

  let num = precision !== undefined ? value.toFixed(precision) : String(value);
  const parts = num.split(".");
  const intPart = parts[0];
  const decPart = parts[1];

  // Add group separators
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
  return decPart !== undefined
    ? `${formatted}${decimalSeparator}${decPart}`
    : formatted;
}

// ---------------------------------------------------------------------------
// Countdown helpers
// ---------------------------------------------------------------------------

function padZero(n: number, len = 2): string {
  return String(n).padStart(len, "0");
}

function formatCountdown(diff: number, format: string): string {
  if (diff <= 0) {
    // Zero out everything
    return format
      .replace(/D+/g, "0")
      .replace(/H+/g, "00")
      .replace(/m+/g, "00")
      .replace(/s+/g, "00");
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let result = format;
  if (/D/.test(result)) {
    result = result.replace(/D+/g, String(days));
  } else {
    // Roll days into hours if format doesn't include days
    const totalHours = days * 24 + hours;
    result = result.replace(/H+/g, padZero(totalHours));
    result = result.replace(/m+/g, padZero(minutes));
    result = result.replace(/s+/g, padZero(seconds));
    return result;
  }

  result = result.replace(/H+/g, padZero(hours));
  result = result.replace(/m+/g, padZero(minutes));
  result = result.replace(/s+/g, padZero(seconds));

  return result;
}

// ---------------------------------------------------------------------------
// InternalStatistic
// ---------------------------------------------------------------------------

const InternalStatistic: React.FC<StatisticProps> = ({
  title,
  value,
  precision,
  prefix,
  suffix,
  valueStyle,
  formatter,
  groupSeparator = ",",
  loading = false,
  decimalSeparator = ".",
  className,
  style,
}) => {
  const displayValue = React.useMemo(() => {
    if (value === undefined || value === null) return "-";
    if (formatter) return formatter(value);
    return formatNumber(value, precision, groupSeparator, decimalSeparator);
  }, [value, precision, formatter, groupSeparator, decimalSeparator]);

  if (loading) {
    return (
      <div className={cn("space-y-2", className)} style={style}>
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-32" />
      </div>
    );
  }

  return (
    <div className={cn("space-y-1", className)} style={style}>
      {title && (
        <div className="text-sm text-muted-foreground">{title}</div>
      )}
      <div className="flex items-baseline gap-1" style={valueStyle}>
        {prefix && <span className="text-2xl font-semibold">{prefix}</span>}
        <span className="text-2xl font-semibold tabular-nums">{displayValue}</span>
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
};

InternalStatistic.displayName = "Statistic";

// ---------------------------------------------------------------------------
// Statistic.Countdown
// ---------------------------------------------------------------------------

const Countdown: React.FC<CountdownProps> = ({
  value,
  format = "HH:mm:ss",
  onFinish,
  onChange,
  title,
  prefix,
  suffix,
  valueStyle,
  className,
  style,
}) => {
  const targetTime = value instanceof Date ? value.getTime() : value;

  const [diff, setDiff] = React.useState(() => Math.max(0, targetTime - Date.now()));

  React.useEffect(() => {
    const timer = setInterval(() => {
      const newDiff = Math.max(0, targetTime - Date.now());
      setDiff(newDiff);
      onChange?.(newDiff);

      if (newDiff <= 0) {
        clearInterval(timer);
        onFinish?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime, onChange, onFinish]);

  const displayValue = formatCountdown(diff, format);

  return (
    <div className={cn("space-y-1", className)} style={style}>
      {title && (
        <div className="text-sm text-muted-foreground">{title}</div>
      )}
      <div className="flex items-baseline gap-1" style={valueStyle}>
        {prefix && <span className="text-2xl font-semibold">{prefix}</span>}
        <span className="text-2xl font-semibold tabular-nums">{displayValue}</span>
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
};

Countdown.displayName = "Statistic.Countdown";

export { InternalStatistic, Countdown };
