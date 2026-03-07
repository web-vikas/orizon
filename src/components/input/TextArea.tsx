"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Textarea as TextareaPrimitive } from "@/primitives/textarea";
import { cn } from "@/lib/utils";
import { useComponentSize } from "@/hooks/useComponentSize";
import type { InputTextAreaProps, AutoSizeConfig } from "./types";

// ---------------------------------------------------------------------------
// Size classes
// ---------------------------------------------------------------------------

const SIZE_CLASSES = {
  small: "text-xs px-2 py-1",
  middle: "text-sm px-2.5 py-1.5",
  large: "text-base px-3 py-2",
} as const;

// ---------------------------------------------------------------------------
// Status classes
// ---------------------------------------------------------------------------

const STATUS_CLASSES: Record<string, string> = {
  error: "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
  warning: "border-warning focus-visible:border-warning focus-visible:ring-warning/20",
};

// ---------------------------------------------------------------------------
// Variant classes
// ---------------------------------------------------------------------------

const VARIANT_CLASSES: Record<string, string> = {
  outlined: "",
  borderless: "border-0 shadow-none focus-visible:ring-0",
  filled: "border-transparent bg-muted focus-visible:border-ring",
  underlined: "border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-ring",
};

// ---------------------------------------------------------------------------
// Helper: compute autoSize style
// ---------------------------------------------------------------------------

function getAutoSizeStyle(
  autoSize: boolean | AutoSizeConfig | undefined,
): React.CSSProperties {
  if (!autoSize) return {};
  if (autoSize === true) {
    // field-sizing-content is already set by the primitive; no extra style needed
    return {};
  }
  const style: React.CSSProperties = {};
  const lineHeight = 1.5715; // ~22px for 14px font; matches antd default
  const padding = 10; // top + bottom padding approximation
  if (autoSize.minRows) {
    style.minHeight = `${autoSize.minRows * 14 * lineHeight + padding}px`;
  }
  if (autoSize.maxRows) {
    style.maxHeight = `${autoSize.maxRows * 14 * lineHeight + padding}px`;
    style.overflowY = "auto";
  }
  return style;
}

// ---------------------------------------------------------------------------
// TextArea
// ---------------------------------------------------------------------------

const TextArea = React.forwardRef<HTMLTextAreaElement, InputTextAreaProps>(
  (props, ref) => {
    const {
      value: valueProp,
      defaultValue,
      onChange,
      autoSize,
      showCount = false,
      maxLength,
      size: sizeProp,
      status,
      variant = "outlined",
      onPressEnter,
      onClear,
      allowClear = false,
      disabled,
      readOnly,
      className,
      style,
      ...rest
    } = props;

    const size = useComponentSize(sizeProp);

    // ---- Controlled / uncontrolled value ----
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const isControlled = valueProp !== undefined;
    const mergedValue = isControlled ? valueProp : internalValue;

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    // ---- Key handler ----
    const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      if (e.key === "Enter") {
        onPressEnter?.(e);
      }
      (rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>).onKeyDown?.(e);
    };

    // ---- Clear ----
    const handleClear = () => {
      if (!isControlled) {
        setInternalValue("");
      }
      const nativeEvent = new Event("input", { bubbles: true });
      const syntheticEvent = {
        ...nativeEvent,
        target: { ...({} as EventTarget), value: "" },
        currentTarget: { ...({} as EventTarget), value: "" },
      } as unknown as React.ChangeEvent<HTMLTextAreaElement>;
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
          <span className="text-xs text-muted-foreground">
            {showCount({ value: String(mergedValue ?? ""), count, maxLength })}
          </span>
        );
      }
      return (
        <span className="text-xs text-muted-foreground">
          {maxLength !== undefined ? `${count} / ${maxLength}` : count}
        </span>
      );
    })();

    const autoSizeStyle = getAutoSizeStyle(autoSize);

    return (
      <div className="relative inline-flex w-full flex-col">
        <div className="relative">
          <TextareaPrimitive
            ref={ref}
            value={mergedValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            className={cn(
              SIZE_CLASSES[size],
              status && STATUS_CLASSES[status],
              VARIANT_CLASSES[variant],
              showClearButton && "pr-8",
              className,
            )}
            style={{ ...autoSizeStyle, ...style }}
            {...rest}
          />
          {showClearButton && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear input"
              tabIndex={-1}
              className="absolute right-2 top-2 inline-flex items-center justify-center rounded-sm p-0.5 hover:bg-muted"
            >
              {clearIcon}
            </button>
          )}
        </div>
        {(countNode || showCount) && (
          <div className="mt-1 flex justify-end">{countNode}</div>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export { TextArea };
