/**
 * @file AutoComplete Component
 *
 * An input field with a filterable dropdown suggestion list.
 * Supports keyboard navigation, controlled / uncontrolled value,
 * custom filter functions, backfill, allow-clear, and three
 * visual variants (outlined, borderless, filled).
 *
 * Key props: `options`, `value`, `onChange`, `onSelect`, `onSearch`,
 * `filterOption`, `size`, `status`, `variant`, `allowClear`.
 *
 * @example
 * ```tsx
 * <AutoComplete
 *   options={[{ value: "React" }, { value: "Vue" }, { value: "Angular" }]}
 *   placeholder="Search frameworks"
 * />
 * ```
 *
 * @see {@link ./types.ts} — prop definitions
 * @see {@link ./index.ts} — barrel export
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { AutoCompleteProps, AutoCompleteOption } from "./types";

// ---------------------------------------------------------------------------
// Size mapping
// ---------------------------------------------------------------------------

const SIZE_CLASSES = {
  small: "h-7 text-xs",
  middle: "h-9 text-sm",
  large: "h-11 text-base",
} as const;

// ---------------------------------------------------------------------------
// AutoComplete
// ---------------------------------------------------------------------------

const InternalAutoComplete = React.forwardRef<HTMLDivElement, AutoCompleteProps>(
  (props, ref) => {
    const {
      options = [],
      value: valueProp,
      defaultValue,
      onChange,
      onSelect,
      onSearch,
      onClear,
      allowClear = false,
      placeholder,
      disabled = false,
      defaultOpen = false,
      open: openProp,
      onDropdownVisibleChange,
      filterOption = true,
      defaultActiveFirstOption = true,
      backfill = false,
      size = "middle",
      status,
      variant = "outlined",
      notFoundContent,
      popupClassName,
      popupMatchSelectWidth = true,
      className,
      style,
    } = props;

    // ---- Controlled / uncontrolled value ----
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? "",
    );
    const isControlled = valueProp !== undefined;
    const mergedValue = isControlled ? valueProp : internalValue;

    // ---- Open state ----
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isOpenControlled = openProp !== undefined;
    const mergedOpen = isOpenControlled ? openProp : internalOpen;

    // ---- Active index for keyboard nav ----
    const [activeIndex, setActiveIndex] = React.useState(-1);

    const inputRef = React.useRef<HTMLInputElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // ---- Filtered options ----
    const filteredOptions = React.useMemo(() => {
      if (filterOption === false) return options;
      return options.filter((opt) => {
        if (typeof filterOption === "function") {
          return filterOption(mergedValue, opt);
        }
        const label =
          opt.label != null ? String(opt.label) : opt.value;
        return label.toLowerCase().includes(mergedValue.toLowerCase());
      });
    }, [options, mergedValue, filterOption]);

    // ---- Update open state ----
    const updateOpen = React.useCallback(
      (nextOpen: boolean) => {
        if (!isOpenControlled) {
          setInternalOpen(nextOpen);
        }
        onDropdownVisibleChange?.(nextOpen);
      },
      [isOpenControlled, onDropdownVisibleChange],
    );

    // ---- Update value ----
    const updateValue = React.useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange],
    );

    // ---- Reset active index when options change ----
    React.useEffect(() => {
      if (defaultActiveFirstOption && filteredOptions.length > 0) {
        setActiveIndex(0);
      } else {
        setActiveIndex(-1);
      }
    }, [filteredOptions, defaultActiveFirstOption]);

    // ---- Handle input change ----
    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        updateValue(val);
        onSearch?.(val);
        if (!mergedOpen) {
          updateOpen(true);
        }
      },
      [updateValue, onSearch, mergedOpen, updateOpen],
    );

    // ---- Handle option select ----
    const handleSelect = React.useCallback(
      (option: AutoCompleteOption) => {
        if (option.disabled) return;
        updateValue(option.value);
        onSelect?.(option.value, option);
        updateOpen(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
      },
      [updateValue, onSelect, updateOpen],
    );

    // ---- Handle clear ----
    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        updateValue("");
        onClear?.();
        inputRef.current?.focus();
      },
      [updateValue, onClear],
    );

    // ---- Keyboard navigation ----
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!mergedOpen) {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            updateOpen(true);
            return;
          }
          return;
        }

        const enabledOptions = filteredOptions.filter((o) => !o.disabled);
        const enabledIndices = filteredOptions
          .map((o, i) => (o.disabled ? -1 : i))
          .filter((i) => i !== -1);

        if (e.key === "ArrowDown") {
          e.preventDefault();
          const currentEnabledIdx = enabledIndices.indexOf(activeIndex);
          const nextEnabledIdx =
            currentEnabledIdx < enabledIndices.length - 1
              ? enabledIndices[currentEnabledIdx + 1]
              : enabledIndices[0];
          setActiveIndex(nextEnabledIdx);
          if (backfill && enabledOptions.length > 0) {
            const opt = filteredOptions[nextEnabledIdx];
            if (opt) {
              updateValue(opt.value);
            }
          }
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          const currentEnabledIdx = enabledIndices.indexOf(activeIndex);
          const prevEnabledIdx =
            currentEnabledIdx > 0
              ? enabledIndices[currentEnabledIdx - 1]
              : enabledIndices[enabledIndices.length - 1];
          setActiveIndex(prevEnabledIdx);
          if (backfill && enabledOptions.length > 0) {
            const opt = filteredOptions[prevEnabledIdx];
            if (opt) {
              updateValue(opt.value);
            }
          }
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
            const opt = filteredOptions[activeIndex];
            if (opt && !opt.disabled) {
              handleSelect(opt);
            }
          }
        } else if (e.key === "Escape") {
          updateOpen(false);
          setActiveIndex(-1);
        }
      },
      [
        mergedOpen,
        filteredOptions,
        activeIndex,
        backfill,
        updateValue,
        updateOpen,
        handleSelect,
      ],
    );

    // ---- Focus / blur ----
    const handleFocus = React.useCallback(() => {
      if (!disabled) {
        updateOpen(true);
      }
    }, [disabled, updateOpen]);

    const handleBlur = React.useCallback(
      (e: React.FocusEvent) => {
        // Don't close if clicking within the dropdown
        const relatedTarget = e.relatedTarget as Node | null;
        if (dropdownRef.current?.contains(relatedTarget)) {
          return;
        }
        updateOpen(false);
        setActiveIndex(-1);
      },
      [updateOpen],
    );

    // ---- Scroll active item into view ----
    React.useEffect(() => {
      if (activeIndex >= 0 && dropdownRef.current) {
        const activeItem = dropdownRef.current.querySelector(
          `[data-index="${activeIndex}"]`,
        );
        if (activeItem) {
          activeItem.scrollIntoView({ block: "nearest" });
        }
      }
    }, [activeIndex]);

    const showClear =
      allowClear && !disabled && mergedValue && mergedValue.length > 0;

    const showDropdown =
      mergedOpen &&
      !disabled &&
      (filteredOptions.length > 0 || notFoundContent != null);

    return (
      <div
        ref={ref}
        className={cn("relative inline-block w-full", className)}
        style={style}
        onBlur={handleBlur}
      >
        {/* Input */}
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={mergedOpen}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            value={mergedValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "w-full rounded-lg border border-input bg-transparent px-3 text-foreground outline-none transition-colors",
              "placeholder:text-muted-foreground",
              "focus:border-ring focus:ring-3 focus:ring-ring/50",
              disabled && "cursor-not-allowed opacity-50",
              SIZE_CLASSES[size],
              status === "error" &&
                "border-destructive focus:border-destructive focus:ring-destructive/20",
              status === "warning" &&
                "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500/20",
              variant === "borderless" && "border-0 shadow-none focus:ring-0",
              variant === "filled" &&
                "border-transparent bg-muted focus:border-ring",
              showClear && "pr-8",
            )}
          />
          {showClear && (
            <span
              role="button"
              tabIndex={-1}
              className="absolute right-2 inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
              onClick={handleClear}
              onMouseDown={(e) => e.preventDefault()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </span>
          )}
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            role="listbox"
            tabIndex={-1}
            className={cn(
              "absolute z-50 mt-1 max-h-60 overflow-auto rounded-lg bg-popover shadow-md ring-1 ring-foreground/10",
              popupMatchSelectWidth === true && "w-full",
              typeof popupMatchSelectWidth === "number" &&
                `w-[${popupMatchSelectWidth}px]`,
              popupMatchSelectWidth === false && "w-auto min-w-[120px]",
              popupClassName,
            )}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => (
                <div
                  key={opt.value}
                  data-index={idx}
                  role="option"
                  aria-selected={idx === activeIndex}
                  className={cn(
                    "relative flex cursor-default items-center px-3 py-1.5 text-sm outline-hidden select-none",
                    "hover:bg-accent hover:text-accent-foreground",
                    opt.disabled && "pointer-events-none opacity-50",
                    idx === activeIndex &&
                      "bg-accent text-accent-foreground",
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(opt);
                  }}
                  onMouseEnter={() => {
                    if (!opt.disabled) {
                      setActiveIndex(idx);
                    }
                  }}
                >
                  {opt.label ?? opt.value}
                </div>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                {notFoundContent}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

InternalAutoComplete.displayName = "AutoComplete";

export { InternalAutoComplete };
