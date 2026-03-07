/**
 * @file Progress -- bar and circle indicators for completion status.
 *
 * Renders line, circle, or dashboard progress indicators with automatic
 * status colouring, step segments, gradient strokes, and custom format
 * functions. Supports small and custom sizes.
 *
 * Key props: `percent`, `type`, `status`, `strokeColor`, `steps`,
 * `showInfo`, `size`, `format`, `success`.
 *
 * @example
 * ```tsx
 * <Progress percent={50} />
 * <Progress type="circle" percent={75} status="active" />
 * <Progress percent={100} /> // auto-success
 * ```
 *
 * @see ./types.ts  - ProgressProps
 * @see ./index.ts  - public export
 */
"use client";

import * as React from "react";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  ProgressProps,
  ProgressStatus,
} from "./types";

// ─── STATUS COLORS ──────────────────────────────────────────────────────────
const STATUS_COLOR: Record<ProgressStatus, string> = {
  normal: "var(--color-primary, #3b82f6)",
  active: "var(--color-primary, #3b82f6)",
  success: "#22c55e",
  exception: "#ef4444",
};

const STATUS_TEXT_CLASS: Record<ProgressStatus, string> = {
  normal: "text-muted-foreground",
  active: "text-muted-foreground",
  success: "text-green-500",
  exception: "text-red-500",
};

// ─── HELPERS ────────────────────────────────────────────────────────────────

function getStrokeColor(
  strokeColor: ProgressProps["strokeColor"],
  status: ProgressStatus
): string {
  if (typeof strokeColor === "string") return strokeColor;
  return STATUS_COLOR[status];
}

function getResolvedStatus(
  status: ProgressStatus | undefined,
  percent: number
): ProgressStatus {
  if (status) return status;
  if (percent >= 100) return "success";
  return "normal";
}

// ─── LINE PROGRESS ──────────────────────────────────────────────────────────

function LineProgress({
  percent = 0,
  status: statusProp,
  strokeColor,
  showInfo = true,
  size = "default",
  steps,
  format,
  strokeLinecap = "round",
  success,
  railColor,
  strokeWidth,
  className,
  style,
}: ProgressProps) {
  const resolvedStatus = getResolvedStatus(statusProp, percent);
  const color = getStrokeColor(strokeColor, resolvedStatus);

  const isSmall = size === "small";
  const height =
    strokeWidth ?? (Array.isArray(size) ? size[1] : isSmall ? 4 : 8);
  const barWidth = Array.isArray(size) ? size[0] : undefined;

  // Format text
  const infoNode = React.useMemo(() => {
    if (!showInfo) return null;
    if (format) return format(percent, success?.percent);
    if (resolvedStatus === "success") {
      return <CircleCheckIcon className="size-4 text-green-500" />;
    }
    if (resolvedStatus === "exception") {
      return <CircleXIcon className="size-4 text-red-500" />;
    }
    return `${Math.round(percent)}%`;
  }, [showInfo, format, percent, success?.percent, resolvedStatus]);

  // Steps mode
  if (steps && steps > 0) {
    const filledSteps = Math.round((percent / 100) * steps);

    return (
      <div
        className={cn("flex items-center gap-1", className)}
        style={{ width: barWidth, ...style }}
      >
        <div className="flex flex-1 gap-0.5">
          {Array.from({ length: steps }, (_, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height,
                backgroundColor:
                  i < filledSteps ? color : railColor ?? "var(--color-muted)",
                borderRadius:
                  strokeLinecap === "round" ? height / 2 : undefined,
              }}
            />
          ))}
        </div>
        {showInfo && (
          <span
            className={cn(
              "ml-2 text-sm tabular-nums",
              STATUS_TEXT_CLASS[resolvedStatus]
            )}
          >
            {infoNode}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      style={{ width: barWidth, ...style }}
    >
      <div
        className="relative flex-1 overflow-hidden"
        style={{
          height,
          backgroundColor: railColor ?? "var(--color-muted)",
          borderRadius: strokeLinecap === "round" ? height / 2 : undefined,
        }}
      >
        {/* Success segment */}
        {success?.percent !== undefined && success.percent > 0 && (
          <div
            className="absolute inset-y-0 left-0 transition-all duration-300"
            style={{
              width: `${Math.min(success.percent, 100)}%`,
              backgroundColor: success.strokeColor ?? "#22c55e",
              borderRadius:
                strokeLinecap === "round" ? height / 2 : undefined,
            }}
          />
        )}

        {/* Main bar */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 transition-all duration-300",
            resolvedStatus === "active" &&
              "after:absolute after:inset-0 after:animate-pulse after:bg-white/25"
          )}
          style={{
            width: `${Math.min(percent, 100)}%`,
            backgroundColor: color,
            borderRadius: strokeLinecap === "round" ? height / 2 : undefined,
          }}
        />
      </div>

      {showInfo && (
        <span
          className={cn(
            "flex-shrink-0 text-sm tabular-nums",
            STATUS_TEXT_CLASS[resolvedStatus]
          )}
        >
          {infoNode}
        </span>
      )}
    </div>
  );
}

// ─── CIRCLE/DASHBOARD PROGRESS ──────────────────────────────────────────────

function CircleProgress({
  percent = 0,
  type = "circle",
  status: statusProp,
  strokeColor,
  showInfo = true,
  size = "default",
  format,
  strokeLinecap = "round",
  success,
  railColor,
  strokeWidth,
  className,
  style,
}: ProgressProps) {
  const resolvedStatus = getResolvedStatus(statusProp, percent);
  const color = getStrokeColor(strokeColor, resolvedStatus);

  const diameter = Array.isArray(size) ? size[0] : size === "small" ? 60 : 120;
  const sw = strokeWidth ?? (size === "small" ? 4 : 6);
  const radius = (diameter - sw) / 2;
  const circumference = 2 * Math.PI * radius;

  // Dashboard mode: 75% of the circle
  const isDashboard = type === "dashboard";
  const gapAngle = isDashboard ? 75 : 0; // gap in degrees
  const gapPercent = isDashboard ? gapAngle / 360 : 0;
  const totalArc = circumference * (1 - gapPercent);

  const dashOffset = totalArc - (totalArc * Math.min(percent, 100)) / 100;
  const successOffset =
    success?.percent !== undefined
      ? totalArc - (totalArc * Math.min(success.percent, 100)) / 100
      : totalArc;

  // Rotation for dashboard
  const rotation = isDashboard ? 90 + (gapAngle / 2) : -90;

  const infoNode = React.useMemo(() => {
    if (!showInfo) return null;
    if (format) return format(percent, success?.percent);
    if (resolvedStatus === "success") {
      return <CircleCheckIcon className="size-6 text-green-500" />;
    }
    if (resolvedStatus === "exception") {
      return <CircleXIcon className="size-6 text-red-500" />;
    }
    return `${Math.round(percent)}%`;
  }, [showInfo, format, percent, success?.percent, resolvedStatus]);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: diameter, height: diameter, ...style }}
    >
      <svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
      >
        {/* Rail */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={railColor ?? "var(--color-muted)"}
          strokeWidth={sw}
          strokeDasharray={`${totalArc} ${circumference - totalArc}`}
          strokeLinecap={strokeLinecap}
          transform={`rotate(${rotation} ${diameter / 2} ${diameter / 2})`}
        />

        {/* Success arc */}
        {success?.percent !== undefined && success.percent > 0 && (
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke={success.strokeColor ?? "#22c55e"}
            strokeWidth={sw}
            strokeDasharray={`${totalArc} ${circumference - totalArc}`}
            strokeDashoffset={successOffset}
            strokeLinecap={strokeLinecap}
            transform={`rotate(${rotation} ${diameter / 2} ${diameter / 2})`}
            className="transition-all duration-300"
          />
        )}

        {/* Main arc */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={sw}
          strokeDasharray={`${totalArc} ${circumference - totalArc}`}
          strokeDashoffset={dashOffset}
          strokeLinecap={strokeLinecap}
          transform={`rotate(${rotation} ${diameter / 2} ${diameter / 2})`}
          className="transition-all duration-300"
        />
      </svg>

      {/* Info text in center */}
      {showInfo && (
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center text-sm font-medium tabular-nums",
            STATUS_TEXT_CLASS[resolvedStatus]
          )}
        >
          {infoNode}
        </span>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

const InternalProgress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (props, ref) => {
    const { type = "line", ...rest } = props;

    if (type === "circle" || type === "dashboard") {
      return (
        <div ref={ref}>
          <CircleProgress type={type} {...rest} />
        </div>
      );
    }

    return (
      <div ref={ref}>
        <LineProgress {...rest} />
      </div>
    );
  }
);

InternalProgress.displayName = "Progress";

export { InternalProgress };
