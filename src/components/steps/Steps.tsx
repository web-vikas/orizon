/**
 * @file Steps -- guided navigation / progress indicator.
 *
 * Displays a list of step items with status indicators (wait, process,
 * finish, error). Supports horizontal / vertical direction, navigation,
 * dot, and inline display types, plus small and default sizes.
 *
 * Key props: `current`, `items`, `direction`, `type`, `status`, `size`.
 *
 * @example
 * ```tsx
 * <Steps
 *   current={1}
 *   items={[
 *     { title: "Login" },
 *     { title: "Verification" },
 *     { title: "Done" },
 *   ]}
 * />
 * ```
 *
 * @see {@link ./types.ts} for prop definitions.
 * @see {@link ./index.ts} for the public export.
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { StepsProps, StepItem, StepStatus } from "./types";

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// ---------------------------------------------------------------------------
// Step indicator circle
// ---------------------------------------------------------------------------

const STATUS_ICON_CLASSES: Record<StepStatus, string> = {
  wait: "border-border bg-background text-muted-foreground",
  process: "border-primary bg-primary text-primary-foreground",
  finish: "border-primary bg-background text-primary",
  error: "border-destructive bg-background text-destructive",
};

const STATUS_CONNECTOR_CLASSES: Record<StepStatus, string> = {
  wait: "bg-border",
  process: "bg-border",
  finish: "bg-primary",
  error: "bg-destructive",
};

const STATUS_TITLE_CLASSES: Record<StepStatus, string> = {
  wait: "text-muted-foreground",
  process: "text-foreground font-medium",
  finish: "text-foreground",
  error: "text-destructive",
};

const STATUS_DESC_CLASSES: Record<StepStatus, string> = {
  wait: "text-muted-foreground",
  process: "text-muted-foreground",
  finish: "text-muted-foreground",
  error: "text-destructive/80",
};

function StepIndicator({
  status,
  index,
  icon,
  isSmall,
  isDot,
}: {
  status: StepStatus;
  index: number;
  icon?: React.ReactNode;
  isSmall: boolean;
  isDot: boolean;
}) {
  if (isDot) {
    return (
      <span
        data-slot="step-dot"
        className={cn(
          "block rounded-full",
          isSmall ? "h-2 w-2" : "h-2.5 w-2.5",
          status === "process" && "bg-primary",
          status === "finish" && "bg-primary",
          status === "error" && "bg-destructive",
          status === "wait" && "bg-border"
        )}
      />
    );
  }

  const sizeClasses = isSmall
    ? "h-6 w-6 text-xs"
    : "h-8 w-8 text-sm";

  if (icon) {
    return (
      <span
        data-slot="step-icon"
        className={cn(
          "inline-flex items-center justify-center rounded-full",
          sizeClasses,
          STATUS_ICON_CLASSES[status]
        )}
      >
        <span className="[&_svg]:size-4">{icon}</span>
      </span>
    );
  }

  return (
    <span
      data-slot="step-icon"
      className={cn(
        "inline-flex items-center justify-center rounded-full border-2 font-medium",
        sizeClasses,
        STATUS_ICON_CLASSES[status]
      )}
    >
      {status === "finish" ? (
        <CheckIcon />
      ) : status === "error" ? (
        <CloseIcon />
      ) : (
        <span>{index + 1}</span>
      )}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------

const Steps = React.forwardRef<HTMLDivElement, StepsProps>((props, ref) => {
  const {
    current = 0,
    items = [],
    direction = "horizontal",
    type = "default",
    status = "process",
    size = "default",
    onChange,
    initial = 0,
    className,
    style,
  } = props;

  const isSmall = size === "small";
  const isDot = type === "dot";
  const isNavigation = type === "navigation";
  const isInline = type === "inline";
  const isVertical = direction === "vertical" && !isInline;

  function getStepStatus(index: number, item: StepItem): StepStatus {
    if (item.status) return item.status;
    const adjustedIndex = index + initial;
    if (adjustedIndex < current) return "finish";
    if (adjustedIndex === current) return status;
    return "wait";
  }

  // Inline type renders as a compact row
  if (isInline) {
    return (
      <div
        ref={ref}
        data-slot="steps"
        data-type="inline"
        className={cn("flex items-center gap-1 text-xs", className)}
        style={style}
      >
        {items.map((item, index) => {
          const stepStatus = getStepStatus(index, item);
          return (
            <React.Fragment key={index}>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5",
                  stepStatus === "process" && "bg-primary/10 text-primary font-medium",
                  stepStatus === "finish" && "text-primary",
                  stepStatus === "wait" && "text-muted-foreground",
                  stepStatus === "error" && "text-destructive",
                  onChange && !item.disabled && "cursor-pointer hover:bg-accent"
                )}
                onClick={() => {
                  if (onChange && !item.disabled) onChange(index);
                }}
              >
                {stepStatus === "finish" ? (
                  <CheckIcon />
                ) : (
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border text-[10px]">
                    {index + 1}
                  </span>
                )}
                <span>{item.title}</span>
              </span>
              {index < items.length - 1 && (
                <span className="text-border">/</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-slot="steps"
      data-direction={direction}
      data-type={type}
      className={cn(
        "flex",
        isVertical ? "flex-col gap-0" : "flex-row items-start",
        className
      )}
      style={style}
    >
      {items.map((item, index) => {
        const stepStatus = getStepStatus(index, item);
        const isLast = index === items.length - 1;
        const isClickable = !!onChange && !item.disabled;

        return (
          <div
            key={index}
            data-slot="step"
            data-status={stepStatus}
            className={cn(
              "flex",
              isVertical ? "flex-row" : "flex-1 flex-col items-center",
              isClickable && "cursor-pointer",
              isNavigation &&
                !isVertical &&
                cn(
                  "relative flex-1 px-4 py-3",
                  "after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:transition-all after:duration-200",
                  stepStatus === "process" && "after:w-full after:bg-primary",
                  stepStatus === "finish" && "after:w-full after:bg-primary"
                )
            )}
            onClick={() => isClickable && onChange(index)}
          >
            {/* Icon + connector row */}
            <div
              className={cn(
                "flex items-center",
                isVertical ? "flex-col" : "w-full"
              )}
            >
              {/* Step indicator */}
              {!isNavigation && (
                <div className={cn("shrink-0", isVertical && "flex flex-col items-center")}>
                  <StepIndicator
                    status={stepStatus}
                    index={index}
                    icon={item.icon}
                    isSmall={isSmall}
                    isDot={isDot}
                  />
                </div>
              )}

              {/* Connector */}
              {!isLast && !isNavigation && (
                <div
                  data-slot="step-connector"
                  className={cn(
                    isVertical
                      ? cn(
                          "ml-0 mt-1 mb-1 w-0.5 flex-1 min-h-[24px]",
                          STATUS_CONNECTOR_CLASSES[stepStatus === "finish" ? "finish" : "wait"]
                        )
                      : cn(
                          "mx-2 h-0.5 flex-1",
                          STATUS_CONNECTOR_CLASSES[stepStatus === "finish" ? "finish" : "wait"]
                        )
                  )}
                />
              )}
            </div>

            {/* Title + Description */}
            <div
              className={cn(
                isVertical ? "ml-3 pb-6" : "mt-2 text-center",
                isNavigation && "text-center"
              )}
            >
              <div
                className={cn(
                  "text-sm leading-tight",
                  isSmall && "text-xs",
                  STATUS_TITLE_CLASSES[stepStatus]
                )}
              >
                {item.title}
              </div>
              {item.description && (
                <div
                  className={cn(
                    "mt-0.5 text-xs leading-tight",
                    STATUS_DESC_CLASSES[stepStatus]
                  )}
                >
                  {item.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});

Steps.displayName = "Steps";

export { Steps };
