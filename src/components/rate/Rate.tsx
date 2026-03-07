"use client";

import * as React from "react";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RateProps } from "./types";

// ---------------------------------------------------------------------------
// DefaultStar
// ---------------------------------------------------------------------------

function DefaultStar({ filled }: { filled: "full" | "half" | "empty" }) {
  if (filled === "full") {
    return (
      <StarIcon className="size-5 fill-current text-yellow-400" />
    );
  }
  if (filled === "half") {
    return (
      <div className="relative size-5">
        {/* Empty background star */}
        <StarIcon className="absolute inset-0 size-5 text-muted-foreground/30" />
        {/* Half filled star using clip */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
          <StarIcon className="size-5 fill-current text-yellow-400" />
        </div>
      </div>
    );
  }
  return <StarIcon className="size-5 text-muted-foreground/30" />;
}

// ---------------------------------------------------------------------------
// InternalRate
// ---------------------------------------------------------------------------

const InternalRate = React.forwardRef<HTMLDivElement, RateProps>(
  (props, ref) => {
    const {
      value: valueProp,
      defaultValue = 0,
      onChange,
      count = 5,
      allowHalf = false,
      allowClear = true,
      character,
      disabled = false,
      tooltips,
      className,
      style,
      onHoverChange,
    } = props;

    // ---- Controlled / uncontrolled ----
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = valueProp !== undefined;
    const mergedValue = isControlled ? valueProp! : internalValue;

    // ---- Hover state ----
    const [hoverValue, setHoverValue] = React.useState<number>(0);

    const displayValue = hoverValue > 0 ? hoverValue : mergedValue;

    const updateValue = React.useCallback(
      (val: number) => {
        if (!isControlled) {
          setInternalValue(val);
        }
        onChange?.(val);
      },
      [isControlled, onChange]
    );

    // ---- Click handler ----
    const handleClick = React.useCallback(
      (starIndex: number, isLeftHalf: boolean) => {
        if (disabled) return;
        let newVal: number;
        if (allowHalf && isLeftHalf) {
          newVal = starIndex + 0.5;
        } else {
          newVal = starIndex + 1;
        }
        // Allow clear: clicking same value clears
        if (allowClear && newVal === mergedValue) {
          newVal = 0;
        }
        updateValue(newVal);
      },
      [disabled, allowHalf, allowClear, mergedValue, updateValue]
    );

    // ---- Hover handler ----
    const handleHover = React.useCallback(
      (starIndex: number, isLeftHalf: boolean) => {
        if (disabled) return;
        let val: number;
        if (allowHalf && isLeftHalf) {
          val = starIndex + 0.5;
        } else {
          val = starIndex + 1;
        }
        setHoverValue(val);
        onHoverChange?.(val);
      },
      [disabled, allowHalf, onHoverChange]
    );

    const handleMouseLeave = React.useCallback(() => {
      if (disabled) return;
      setHoverValue(0);
      onHoverChange?.(0);
    }, [disabled, onHoverChange]);

    // ---- Keyboard support ----
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        const stepSize = allowHalf ? 0.5 : 1;
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          e.preventDefault();
          const next = Math.min(mergedValue + stepSize, count);
          updateValue(next);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          e.preventDefault();
          const next = Math.max(mergedValue - stepSize, 0);
          updateValue(next);
        }
      },
      [disabled, allowHalf, mergedValue, count, updateValue]
    );

    // ---- Render stars ----
    const stars = React.useMemo(() => {
      return Array.from({ length: count }, (_, index) => {
        const starValue = index + 1;
        const filled: "full" | "half" | "empty" =
          displayValue >= starValue
            ? "full"
            : displayValue >= index + 0.5
              ? "half"
              : "empty";

        const renderCharacter = () => {
          if (character) {
            if (typeof character === "function") {
              return character({ index, value: displayValue });
            }
            // Wrap the custom character in a container that mimics fill state
            return (
              <span
                className={cn(
                  filled === "full" && "text-yellow-400",
                  filled === "half" && "text-yellow-400",
                  filled === "empty" && "text-muted-foreground/30"
                )}
              >
                {character}
              </span>
            );
          }
          return <DefaultStar filled={filled} />;
        };

        const tooltipText = tooltips?.[index];

        return (
          <div
            key={index}
            className={cn(
              "relative inline-flex cursor-pointer",
              disabled && "cursor-default"
            )}
            title={tooltipText}
          >
            {allowHalf ? (
              <>
                {/* Left half */}
                <div
                  className="absolute inset-y-0 left-0 z-10 w-1/2"
                  onMouseMove={() => handleHover(index, true)}
                  onClick={() => handleClick(index, true)}
                />
                {/* Right half */}
                <div
                  className="absolute inset-y-0 right-0 z-10 w-1/2"
                  onMouseMove={() => handleHover(index, false)}
                  onClick={() => handleClick(index, false)}
                />
              </>
            ) : (
              <div
                className="absolute inset-0 z-10"
                onMouseMove={() => handleHover(index, false)}
                onClick={() => handleClick(index, false)}
              />
            )}
            <span
              className={cn(
                "transition-transform",
                !disabled && hoverValue > 0 && "scale-110"
              )}
            >
              {renderCharacter()}
            </span>
          </div>
        );
      });
    }, [
      count,
      displayValue,
      character,
      tooltips,
      allowHalf,
      disabled,
      hoverValue,
      handleHover,
      handleClick,
    ]);

    return (
      <div
        ref={ref}
        role="radiogroup"
        tabIndex={disabled ? -1 : 0}
        aria-label="Rating"
        aria-valuenow={mergedValue}
        aria-valuemin={0}
        aria-valuemax={count}
        className={cn(
          "inline-flex items-center gap-1",
          disabled && "opacity-50 pointer-events-none",
          !disabled && "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
          className
        )}
        style={style}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
      >
        {stars}
      </div>
    );
  }
);

InternalRate.displayName = "Rate";

export { InternalRate };
