"use client";

import * as React from "react";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { Button as ShadcnButton } from "@/primitives/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/primitives/input-group";
import { cn } from "@/lib/utils";
import { useComponentSize } from "@/hooks/useComponentSize";
import type { InputSearchProps } from "./types";

// ---------------------------------------------------------------------------
// Size classes
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

const BUTTON_SIZE_MAP = {
  small: "sm",
  middle: "default",
  large: "lg",
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
// Search
// ---------------------------------------------------------------------------

const Search = React.forwardRef<HTMLInputElement, InputSearchProps>(
  (props, ref) => {
    const {
      value: valueProp,
      defaultValue,
      onChange,
      size: sizeProp,
      prefix,
      suffix,
      status,
      variant = "outlined",
      disabled = false,
      readOnly = false,
      placeholder,
      onPressEnter,
      enterButton,
      loading = false,
      onSearch,
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

    // ---- Search trigger ----
    const triggerSearch = (e: React.SyntheticEvent) => {
      onSearch?.(String(mergedValue ?? ""), e);
    };

    // ---- Key handler ----
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === "Enter") {
        onPressEnter?.(e);
        triggerSearch(e);
      }
      (rest as React.InputHTMLAttributes<HTMLInputElement>).onKeyDown?.(e);
    };

    // ---- Enter button ----
    const hasEnterButton = enterButton !== undefined && enterButton !== false;

    const renderEnterButton = () => {
      if (!hasEnterButton) return null;

      const buttonContent = loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : enterButton === true ? (
        <SearchIcon className="size-4" />
      ) : (
        enterButton
      );

      return (
        <ShadcnButton
          type="button"
          size={BUTTON_SIZE_MAP[size]}
          disabled={disabled || loading}
          onClick={triggerSearch}
          className="rounded-l-none border-l-0"
        >
          {buttonContent}
        </ShadcnButton>
      );
    };

    // ---- Suffix: search icon when no enterButton ----
    const searchSuffix = !hasEnterButton ? (
      loading ? (
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      ) : (
        <button
          type="button"
          onClick={triggerSearch}
          disabled={disabled}
          tabIndex={-1}
          aria-label="Search"
          className="inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <SearchIcon className="size-4" />
        </button>
      )
    ) : null;

    return (
      <div className="flex items-stretch">
        <InputGroup
          className={cn(
            WRAPPER_SIZE_CLASSES[size],
            status && STATUS_CLASSES[status],
            VARIANT_CLASSES[variant],
            hasEnterButton && "rounded-r-none",
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
            value={mergedValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            className={cn(SIZE_CLASSES[size], "border-0 ring-0 focus-visible:ring-0")}
            {...rest}
          />

          {(searchSuffix || suffix) && (
            <InputGroupAddon align="inline-end">
              {suffix && <InputGroupText>{suffix}</InputGroupText>}
              {searchSuffix}
            </InputGroupAddon>
          )}
        </InputGroup>

        {renderEnterButton()}
      </div>
    );
  },
);

Search.displayName = "Search";

export { Search };
