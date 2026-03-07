"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useComponentSize } from "@/hooks/useComponentSize";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
  InputGroupText,
} from "@/primitives/input-group";
import type { InputPasswordProps } from "./types";

// ---------------------------------------------------------------------------
// Size classes (same as Input)
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

const STATUS_CLASSES: Record<string, string> = {
  error: "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
  warning: "border-warning focus-within:border-warning focus-within:ring-warning/20",
};

const VARIANT_CLASSES: Record<string, string> = {
  outlined: "",
  borderless: "border-0 shadow-none focus-within:ring-0",
  filled: "border-transparent bg-muted focus-within:border-ring",
  underlined: "border-0 border-b rounded-none focus-within:ring-0 focus-within:border-ring",
};

// ---------------------------------------------------------------------------
// Password
// ---------------------------------------------------------------------------

const Password = React.forwardRef<HTMLInputElement, InputPasswordProps>(
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
      disabled = false,
      readOnly = false,
      placeholder,
      onPressEnter,
      onClear,
      visibilityToggle = true,
      visible: visibleProp,
      onVisibleChange,
      iconRender,
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

    // ---- Visibility toggle ----
    const [internalVisible, setInternalVisible] = React.useState(false);
    const isVisibleControlled = visibleProp !== undefined;
    const visible = isVisibleControlled ? visibleProp : internalVisible;

    const toggleVisibility = () => {
      const next = !visible;
      if (!isVisibleControlled) {
        setInternalVisible(next);
      }
      onVisibleChange?.(next);
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

    // ---- Icons ----
    const eyeIcon = iconRender ? (
      iconRender(visible)
    ) : visible ? (
      <Eye className="size-4 text-muted-foreground" />
    ) : (
      <EyeOff className="size-4 text-muted-foreground" />
    );

    // ---- Addon styling ----
    const addonClasses =
      "inline-flex items-center justify-center border-input bg-muted px-3 text-sm text-muted-foreground";

    return (
      <div className="flex items-stretch">
        {addonBefore && (
          <span
            className={cn(
              addonClasses,
              "rounded-l-lg border border-r-0",
              WRAPPER_SIZE_CLASSES[size],
            )}
          >
            {addonBefore}
          </span>
        )}

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
          {prefix && (
            <InputGroupAddon align="inline-start">
              <InputGroupText>{prefix}</InputGroupText>
            </InputGroupAddon>
          )}

          <InputGroupInput
            ref={ref}
            type={visible ? "text" : "password"}
            value={mergedValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            className={cn(SIZE_CLASSES[size], "border-0 ring-0 focus-visible:ring-0")}
            {...rest}
          />

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
                <span className="size-3.5 text-muted-foreground hover:text-foreground">
                  &times;
                </span>
              </InputGroupButton>
            )}
            {suffix && <InputGroupText>{suffix}</InputGroupText>}
            {visibilityToggle && (
              <InputGroupButton
                size="icon-xs"
                variant="ghost"
                onClick={toggleVisibility}
                aria-label={visible ? "Hide password" : "Show password"}
                className="size-5 shrink-0"
                tabIndex={-1}
              >
                {eyeIcon}
              </InputGroupButton>
            )}
          </InputGroupAddon>
        </InputGroup>

        {addonAfter && (
          <span
            className={cn(
              addonClasses,
              "rounded-r-lg border border-l-0",
              WRAPPER_SIZE_CLASSES[size],
            )}
          >
            {addonAfter}
          </span>
        )}
      </div>
    );
  },
);

Password.displayName = "Password";

export { Password };
