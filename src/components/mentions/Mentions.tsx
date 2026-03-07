"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MentionsProps, MentionOption } from "./types";

// ---------------------------------------------------------------------------
// Status -> class mapping
// ---------------------------------------------------------------------------

const STATUS_CLASSES: Record<string, string> = {
  error:
    "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
  warning:
    "border-yellow-500 focus-within:border-yellow-500 focus-within:ring-yellow-500/20",
};

// ---------------------------------------------------------------------------
// Variant -> class mapping
// ---------------------------------------------------------------------------

const VARIANT_CLASSES: Record<string, string> = {
  outlined: "",
  borderless: "border-transparent shadow-none focus-within:ring-0",
  filled: "border-transparent bg-muted focus-within:border-ring",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getTextareaHeight(
  autoSize: MentionsProps["autoSize"],
  rows: number | undefined
): React.CSSProperties {
  if (!autoSize) {
    return rows ? { rows } as unknown as React.CSSProperties : {};
  }
  if (typeof autoSize === "object") {
    const result: React.CSSProperties = { overflow: "hidden", resize: "none" };
    if (autoSize.minRows) {
      result.minHeight = `${autoSize.minRows * 1.5 + 0.75}em`;
    }
    if (autoSize.maxRows) {
      result.maxHeight = `${autoSize.maxRows * 1.5 + 0.75}em`;
    }
    return result;
  }
  return { overflow: "hidden", resize: "none" };
}

// ---------------------------------------------------------------------------
// InternalMentions
// ---------------------------------------------------------------------------

const InternalMentions = React.forwardRef<HTMLTextAreaElement, MentionsProps>(
  (props, ref) => {
    const {
      value: valueProp,
      defaultValue = "",
      onChange,
      onSelect,
      onSearch,
      options = [],
      prefix: prefixTrigger = "@",
      split = " ",
      placement = "bottom",
      status,
      variant = "outlined",
      disabled = false,
      readOnly = false,
      placeholder,
      allowClear = false,
      autoSize = false,
      rows,
      className,
      style,
    } = props;

    // ---- Controlled / uncontrolled ----
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = valueProp !== undefined;
    const mergedValue = isControlled ? valueProp! : internalValue;

    // ---- Dropdown state ----
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [filteredOptions, setFilteredOptions] =
      React.useState<MentionOption[]>(options);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [measureStart, setMeasureStart] = React.useState(-1);
    const [activePrefix, setActivePrefix] = React.useState("");

    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    // Merge refs
    const mergedRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
            node;
        }
      },
      [ref]
    );

    const prefixes = React.useMemo(
      () =>
        Array.isArray(prefixTrigger) ? prefixTrigger : [prefixTrigger],
      [prefixTrigger]
    );

    // ---- Auto-resize ----
    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea || !autoSize) return;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }, [autoSize]);

    React.useEffect(() => {
      adjustHeight();
    }, [mergedValue, adjustHeight]);

    // ---- Value update ----
    const updateValue = React.useCallback(
      (val: string) => {
        if (!isControlled) {
          setInternalValue(val);
        }
        onChange?.(val);
      },
      [isControlled, onChange]
    );

    // ---- Detect prefix trigger ----
    const detectPrefix = React.useCallback(
      (text: string, cursorPos: number) => {
        // Walk backward from cursor to find a prefix character
        const beforeCursor = text.slice(0, cursorPos);

        for (const p of prefixes) {
          const lastIdx = beforeCursor.lastIndexOf(p);
          if (lastIdx < 0) continue;

          // Check that the prefix is at the start or preceded by a space/split
          const charBefore = lastIdx > 0 ? beforeCursor[lastIdx - 1] : " ";
          if (
            lastIdx === 0 ||
            charBefore === " " ||
            charBefore === "\n" ||
            charBefore === split
          ) {
            const searchText = beforeCursor.slice(lastIdx + p.length);
            // If searchText has spaces, the mention is probably finished
            if (!searchText.includes(" ") && !searchText.includes("\n")) {
              return { prefix: p, start: lastIdx, search: searchText };
            }
          }
        }
        return null;
      },
      [prefixes, split]
    );

    // ---- Handle input change ----
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (disabled || readOnly) return;
        const newVal = e.target.value;
        updateValue(newVal);

        const cursorPos = e.target.selectionStart ?? newVal.length;
        const detected = detectPrefix(newVal, cursorPos);

        if (detected) {
          setActivePrefix(detected.prefix);
          setMeasureStart(detected.start);
          const search = detected.search.toLowerCase();
          onSearch?.(detected.search, detected.prefix);

          const filtered = options.filter((opt) => {
            const label =
              typeof opt.label === "string" ? opt.label : opt.value;
            return label.toLowerCase().includes(search);
          });
          setFilteredOptions(filtered);
          setActiveIndex(0);
          setDropdownOpen(filtered.length > 0);
        } else {
          setDropdownOpen(false);
        }
      },
      [disabled, readOnly, updateValue, detectPrefix, onSearch, options]
    );

    // ---- Select option ----
    const selectOption = React.useCallback(
      (option: MentionOption) => {
        if (option.disabled) return;
        const textarea = textareaRef.current;
        if (!textarea) return;

        const cursorPos = textarea.selectionStart ?? mergedValue.length;
        const before = mergedValue.slice(0, measureStart);
        const after = mergedValue.slice(cursorPos);

        const insertText = `${activePrefix}${option.value}${split}`;
        const newVal = `${before}${insertText}${after}`;
        updateValue(newVal);

        onSelect?.(option, activePrefix);
        setDropdownOpen(false);

        // Set cursor position after the inserted mention
        const newCursorPos = before.length + insertText.length;
        requestAnimationFrame(() => {
          textarea.focus();
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        });
      },
      [mergedValue, measureStart, activePrefix, split, updateValue, onSelect]
    );

    // ---- Keyboard navigation in dropdown ----
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!dropdownOpen) return;

        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredOptions[activeIndex]) {
            selectOption(filteredOptions[activeIndex]);
          }
        } else if (e.key === "Escape") {
          setDropdownOpen(false);
        }
      },
      [dropdownOpen, filteredOptions, activeIndex, selectOption]
    );

    // ---- Close dropdown on outside click ----
    React.useEffect(() => {
      if (!dropdownOpen) return;
      const handleClickOutside = (e: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(e.target as Node)
        ) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [dropdownOpen]);

    // ---- Clear handler ----
    const handleClear = React.useCallback(() => {
      updateValue("");
      setDropdownOpen(false);
      textareaRef.current?.focus();
    }, [updateValue]);

    const showClearButton =
      allowClear && !disabled && !readOnly && mergedValue.length > 0;

    // ---- Auto-size style ----
    const autoSizeStyle = getTextareaHeight(autoSize, rows);

    return (
      <div ref={wrapperRef} className={cn("relative inline-flex w-full", className)} style={style}>
        {/* Textarea wrapper */}
        <div
          className={cn(
            "relative flex w-full rounded-md border border-input bg-background ring-offset-background transition-colors",
            "focus-within:ring-2 focus-within:ring-ring/20 focus-within:border-ring",
            status && STATUS_CLASSES[status],
            VARIANT_CLASSES[variant],
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <textarea
            ref={mergedRef}
            value={mergedValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            rows={rows ?? (autoSize ? 1 : 3)}
            className={cn(
              "w-full flex-1 bg-transparent px-3 py-2 text-sm outline-none",
              "placeholder:text-muted-foreground",
              disabled && "cursor-not-allowed",
              "resize-none"
            )}
            style={autoSizeStyle}
          />

          {/* Clear button */}
          {showClearButton && (
            <button
              type="button"
              tabIndex={-1}
              onClick={handleClear}
              className="flex items-start px-2 pt-2.5 text-muted-foreground hover:text-foreground"
              aria-label="Clear"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {dropdownOpen && filteredOptions.length > 0 && (
          <div
            ref={dropdownRef}
            className={cn(
              "absolute z-50 min-w-[120px] max-h-[200px] overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-md",
              placement === "top" ? "bottom-full mb-1" : "top-full mt-1",
              "left-0"
            )}
          >
            {filteredOptions.map((option, idx) => (
              <div
                key={option.value}
                role="option"
                aria-selected={idx === activeIndex}
                className={cn(
                  "cursor-pointer rounded-sm px-2 py-1.5 text-sm",
                  idx === activeIndex && "bg-accent text-accent-foreground",
                  option.disabled &&
                    "cursor-not-allowed opacity-50 pointer-events-none"
                )}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent textarea blur
                  selectOption(option);
                }}
              >
                {option.label ?? option.value}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

InternalMentions.displayName = "Mentions";

export { InternalMentions };
