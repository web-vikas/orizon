"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Input as InputPrimitive } from "@/primitives/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
  InputGroupText,
} from "@/primitives/input-group";
import { cn } from "@/lib/utils";
import { useComponentSize } from "@/hooks/useComponentSize";
import type { InputProps } from "./types";

// ---------------------------------------------------------------------------
// Size → class mapping
// ---------------------------------------------------------------------------

const SIZE_CLASSES = {
  small: "h-7 text-xs",
  middle: "h-8 text-sm",
  large: "h-10 text-base",
} as const;

const WRAPPER_SIZE_CLASSES = {
  small: "h-7",
  middle: "h-8",
  large: "h-10",
} as const;

// ---------------------------------------------------------------------------
// Status → class mapping
// ---------------------------------------------------------------------------

const STATUS_CLASSES: Record<string, string> = {
  error: "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
  warning: "border-warning focus-within:border-warning focus-within:ring-warning/20",
};

// ---------------------------------------------------------------------------
// Variant → class mapping (applied to the wrapper / standalone input)
// ---------------------------------------------------------------------------

const VARIANT_CLASSES: Record<string, string> = {
  outlined: "",
  borderless: "border-0 shadow-none focus-within:ring-0",
  filled: "border-transparent bg-muted focus-within:border-ring",
  underlined: "border-0 border-b rounded-none focus-within:ring-0 focus-within:border-ring",
};

// ---------------------------------------------------------------------------
// InternalInput
// ---------------------------------------------------------------------------

const InternalInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      value: valueProp,
      defaultValue,
      onChange,
      size: sizeProp,
      prefix,
      suffix,
      addonBefore,
      addonAfter,
      allowClear = false,
      status,
      variant = "outlined",
      showCount = false,
      maxLength,
      disabled = false,
      readOnly = false,
      placeholder,
      onPressEnter,
      onClear,
      className,
      ...rest
    } = props;

    const size = useComponentSize(sizeProp);

    // ---- Controlled / uncontrolled value ----
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const isControlled = valueProp !== undefined;
    const mergedValue = isControlled ? valueProp : internalValue;

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    // ---- Key handler ----
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === "Enter") {
        onPressEnter?.(e);
      }
      (rest as React.InputHTMLAttributes<HTMLInputElement>).onKeyDown?.(e);
    };

    // ---- Clear ----
    const handleClear = () => {
      if (!isControlled) {
        setInternalValue("");
      }
      // Build a synthetic change event so consumers stay in sync
      const nativeEvent = new Event("input", { bubbles: true });
      const syntheticEvent = {
        ...nativeEvent,
        target: { ...({} as EventTarget), value: "" },
        currentTarget: { ...({} as EventTarget), value: "" },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
      onClear?.();
    };

    const showClearButton =
      allowClear && !disabled && !readOnly && mergedValue && String(mergedValue).length > 0;

    const clearIcon =
      typeof allowClear === "object" && allowClear.clearIcon ? (
        allowClear.clearIcon
      ) : (
        <X className="size-3.5 text-muted-foreground hover:text-foreground" />
      );

    // ---- Show count ----
    const countNode = (() => {
      if (!showCount) return null;
      const count = String(mergedValue ?? "").length;
      if (typeof showCount === "function") {
        return (
          <span className="ml-1 text-xs text-muted-foreground">
            {showCount({ value: String(mergedValue ?? ""), count, maxLength })}
          </span>
        );
      }
      return (
        <span className="ml-1 text-xs text-muted-foreground">
          {maxLength !== undefined ? `${count} / ${maxLength}` : count}
        </span>
      );
    })();

    // ---- Shared input props ----
    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
      ...rest,
      // ref is handled by forwardRef separately
      value: mergedValue,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      disabled,
      readOnly,
      placeholder,
      maxLength,
    };

    // ---- Determine whether we need a wrapper ----
    const needsWrapper = prefix || suffix || showClearButton || addonBefore || addonAfter;

    // ---- Addon styling ----
    const addonClasses =
      "inline-flex items-center justify-center border-input bg-muted px-3 text-sm text-muted-foreground";

    if (!needsWrapper) {
      // Simple standalone input
      return (
        <div className="inline-flex w-full flex-col">
          <InputPrimitive
            ref={ref}
            className={cn(
              SIZE_CLASSES[size],
              status && STATUS_CLASSES[status],
              VARIANT_CLASSES[variant],
              className,
            )}
            {...inputProps}
          />
          {countNode && (
            <div className="mt-1 flex justify-end">{countNode}</div>
          )}
        </div>
      );
    }

    // ---- Wrapped input (prefix / suffix / addons) ----
    return (
      <div className="inline-flex w-full flex-col">
        <div className="flex items-stretch">
          {/* Addon Before */}
          {addonBefore && (
            <span
              className={cn(
                addonClasses,
                "rounded-l-lg border border-r-0",
                WRAPPER_SIZE_CLASSES[size],
                status && STATUS_CLASSES[status]?.split(" ")[0],
              )}
            >
              {addonBefore}
            </span>
          )}

          {/* Main input group */}
          <InputGroup
            className={cn(
              WRAPPER_SIZE_CLASSES[size],
              status && STATUS_CLASSES[status],
              VARIANT_CLASSES[variant],
              addonBefore && "rounded-l-none",
              addonAfter && "rounded-r-none",
              className,
            )}
          >
            {/* Prefix */}
            {prefix && (
              <InputGroupAddon align="inline-start">
                <InputGroupText>{prefix}</InputGroupText>
              </InputGroupAddon>
            )}

            {/* Input */}
            <InputGroupInput
              ref={ref}
              className={cn(SIZE_CLASSES[size], "border-0 ring-0 focus-visible:ring-0")}
              {...inputProps}
            />

            {/* Suffix area: clear button + custom suffix */}
            {(showClearButton || suffix) && (
              <InputGroupAddon align="inline-end">
                {showClearButton && (
                  <InputGroupButton
                    size="icon-xs"
                    variant="ghost"
                    onClick={handleClear}
                    aria-label="Clear input"
                    className="size-5 shrink-0"
                    tabIndex={-1}
                  >
                    {clearIcon}
                  </InputGroupButton>
                )}
                {suffix && <InputGroupText>{suffix}</InputGroupText>}
              </InputGroupAddon>
            )}
          </InputGroup>

          {/* Addon After */}
          {addonAfter && (
            <span
              className={cn(
                addonClasses,
                "rounded-r-lg border border-l-0",
                WRAPPER_SIZE_CLASSES[size],
                status && STATUS_CLASSES[status]?.split(" ")[0],
              )}
            >
              {addonAfter}
            </span>
          )}
        </div>
        {countNode && (
          <div className="mt-1 flex justify-end">{countNode}</div>
        )}
      </div>
    );
  },
);

InternalInput.displayName = "Input";

export { InternalInput };
