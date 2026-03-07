"use client";

import * as React from "react";
import { Loader2, X } from "lucide-react";
import {
  Select as SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/primitives/select";
import { cn } from "@/lib/utils";
import { useComponentSize } from "@/hooks/useComponentSize";
import type { SelectProps, SelectOptionType, LabeledValue } from "./types";

const SIZE_MAP = {
  small: "sm" as const,
  middle: "default" as const,
  large: "default" as const,
};

function resolveOptions(
  options: SelectOptionType[] | undefined,
  fieldNames?: { label?: string; value?: string }
): SelectOptionType[] {
  if (!options) return [];
  const labelKey = fieldNames?.label ?? "label";
  const valueKey = fieldNames?.value ?? "value";
  return options.map((opt) => ({
    label: (opt as any)[labelKey],
    value: (opt as any)[valueKey],
    disabled: opt.disabled,
  }));
}

function extractValue(
  val: string | number | LabeledValue | undefined
): string | number | undefined {
  if (val == null) return undefined;
  if (typeof val === "object" && "value" in val) return val.value;
  return val;
}

// --- Single Select ---

interface SingleSelectInternalProps {
  resolvedOptions: SelectOptionType[];
  filteredOptions: SelectOptionType[];
  valueProp: SelectProps["value"];
  defaultValueProp: SelectProps["defaultValue"];
  onChange?: SelectProps["onChange"];
  labelInValue: boolean;
  placeholder: string;
  disabled: boolean;
  loading: boolean;
  allowClear: boolean;
  status?: "error" | "warning";
  variant: NonNullable<SelectProps["variant"]>;
  size: "small" | "middle" | "large";
  mappedSize: "sm" | "default";
  openProp?: boolean;
  onOpenChange?: (open: boolean) => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  popupMatchSelectWidth: boolean | number;
  notFoundContent: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const SingleSelect = React.forwardRef<HTMLButtonElement, SingleSelectInternalProps>(
  (props, ref) => {
    const {
      resolvedOptions,
      filteredOptions,
      valueProp,
      defaultValueProp,
      onChange,
      labelInValue,
      placeholder,
      disabled,
      loading,
      allowClear,
      status,
      variant,
      size,
      mappedSize,
      openProp,
      onOpenChange,
      setSearchValue,
      popupMatchSelectWidth,
      notFoundContent,
      className,
      style,
      id,
    } = props;

    const controlledValue = extractValue(
      valueProp as string | number | LabeledValue | undefined
    );
    const defaultVal = extractValue(
      defaultValueProp as string | number | LabeledValue | undefined
    );

    const handleValueChange = React.useCallback(
      (newValue: any) => {
        if (!onChange) return;
        const option = resolvedOptions.find(
          (o) => String(o.value) === String(newValue)
        );
        if (labelInValue) {
          onChange(
            { label: option?.label, value: newValue } as LabeledValue,
            option!
          );
        } else {
          onChange(newValue, option!);
        }
      },
      [onChange, resolvedOptions, labelInValue]
    );

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onChange?.(undefined as any, undefined as any);
      },
      [onChange]
    );

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        onOpenChange?.(nextOpen);
        if (!nextOpen) {
          setSearchValue("");
        }
      },
      [onOpenChange, setSearchValue]
    );

    return (
      <SelectRoot
        value={controlledValue != null ? String(controlledValue) : undefined}
        defaultValue={defaultVal != null ? String(defaultVal) : undefined}
        onValueChange={handleValueChange}
        open={openProp}
        onOpenChange={handleOpenChange}
        disabled={disabled}
      >
        <SelectTrigger
          ref={ref}
          size={mappedSize}
          id={id}
          style={style}
          className={cn(
            status === "error" &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
            status === "warning" &&
              "border-yellow-500 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/20",
            variant === "borderless" && "border-0 shadow-none",
            variant === "filled" && "border-0 bg-muted",
            variant === "underlined" &&
              "rounded-none border-0 border-b border-input shadow-none",
            size === "large" && "h-10 text-base",
            size === "small" && "h-7 text-xs",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
          {loading && (
            <Loader2 className="ml-1 size-3.5 animate-spin text-muted-foreground" />
          )}
          {allowClear && controlledValue != null && !disabled && (
            <span
              role="button"
              tabIndex={-1}
              className="ml-1 inline-flex size-3.5 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
              onClick={handleClear}
              onMouseDown={(e) => e.preventDefault()}
            >
              <X className="size-3" />
            </span>
          )}
        </SelectTrigger>
        <SelectContent
          className={cn(
            typeof popupMatchSelectWidth === "number" &&
              `w-[${popupMatchSelectWidth}px]`
          )}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <SelectItem
                key={String(opt.value)}
                value={String(opt.value)}
                disabled={opt.disabled}
              >
                {opt.label}
              </SelectItem>
            ))
          ) : (
            <div className="px-2 py-4 text-center text-sm text-muted-foreground">
              {notFoundContent}
            </div>
          )}
        </SelectContent>
      </SelectRoot>
    );
  }
);

SingleSelect.displayName = "SingleSelect";

// --- Multiple Select ---

interface MultipleSelectProps {
  resolvedOptions: SelectOptionType[];
  filteredOptions: SelectOptionType[];
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  onSearch?: (value: string) => void;
  valueProp: SelectProps["value"];
  defaultValueProp: SelectProps["defaultValue"];
  onChange?: SelectProps["onChange"];
  mode: "multiple" | "tags";
  labelInValue: boolean;
  placeholder: string;
  disabled: boolean;
  loading: boolean;
  allowClear: boolean;
  status?: "error" | "warning";
  variant: NonNullable<SelectProps["variant"]>;
  size: "small" | "middle" | "large";
  notFoundContent: React.ReactNode;
  popupMatchSelectWidth: boolean | number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  openProp?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const MultipleSelect = React.forwardRef<HTMLButtonElement, MultipleSelectProps>(
  (props, ref) => {
    const {
      resolvedOptions,
      filteredOptions,
      searchValue,
      setSearchValue,
      showSearch,
      onSearch,
      valueProp,
      defaultValueProp,
      onChange,
      mode,
      labelInValue,
      placeholder,
      disabled,
      loading,
      allowClear,
      status,
      variant,
      size,
      notFoundContent,
      className,
      style,
      id,
      openProp,
      onOpenChange,
    } = props;

    const extractMultiValue = React.useCallback(
      (
        val:
          | string
          | number
          | (string | number)[]
          | LabeledValue
          | LabeledValue[]
          | undefined
      ): (string | number)[] => {
        if (val == null) return [];
        if (Array.isArray(val)) {
          return val.map((v) =>
            typeof v === "object" && "value" in v ? v.value : v
          );
        }
        if (typeof val === "object" && "value" in val) return [val.value];
        return [val as string | number];
      },
      []
    );

    const [internalValue, setInternalValue] = React.useState<
      (string | number)[]
    >(() => extractMultiValue(defaultValueProp));

    const isControlled = valueProp !== undefined;
    const selectedValues = isControlled
      ? extractMultiValue(valueProp)
      : internalValue;

    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownOpen = openProp ?? isOpen;

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (openProp === undefined) {
          setIsOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
        if (!nextOpen) {
          setSearchValue("");
        }
      },
      [openProp, onOpenChange, setSearchValue]
    );

    const toggleValue = React.useCallback(
      (val: string | number) => {
        const newValues = selectedValues.includes(val)
          ? selectedValues.filter((v) => v !== val)
          : [...selectedValues, val];

        if (!isControlled) {
          setInternalValue(newValues);
        }

        if (onChange) {
          const matchedOptions = newValues
            .map((v) =>
              resolvedOptions.find((o) => String(o.value) === String(v))
            )
            .filter(Boolean) as SelectOptionType[];

          if (labelInValue) {
            const labeledValues = matchedOptions.map((o) => ({
              label: o.label,
              value: o.value,
            }));
            onChange(labeledValues, matchedOptions);
          } else {
            onChange(newValues, matchedOptions);
          }
        }
      },
      [selectedValues, isControlled, onChange, resolvedOptions, labelInValue]
    );

    const removeValue = React.useCallback(
      (val: string | number, e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        toggleValue(val);
      },
      [toggleValue]
    );

    const handleClearAll = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (!isControlled) {
          setInternalValue([]);
        }
        onChange?.(labelInValue ? [] : [], []);
      },
      [isControlled, onChange, labelInValue]
    );

    const handleSearchInput = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchValue(val);
        onSearch?.(val);
      },
      [setSearchValue, onSearch]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (mode === "tags" && e.key === "Enter" && searchValue.trim()) {
          e.preventDefault();
          const tagValue = searchValue.trim();
          if (!selectedValues.includes(tagValue)) {
            toggleValue(tagValue);
          }
          setSearchValue("");
        }
        if (
          e.key === "Backspace" &&
          !searchValue &&
          selectedValues.length > 0
        ) {
          const lastVal = selectedValues[selectedValues.length - 1];
          toggleValue(lastVal);
        }
      },
      [mode, searchValue, selectedValues, toggleValue, setSearchValue]
    );

    const selectedLabels = selectedValues.map((val) => {
      const opt = resolvedOptions.find(
        (o) => String(o.value) === String(val)
      );
      return { value: val, label: opt?.label ?? String(val) };
    });

    return (
      <div
        className={cn("relative inline-block", className)}
        style={style}
        id={id}
      >
        <div
          ref={ref as any}
          role="combobox"
          aria-expanded={dropdownOpen}
          aria-haspopup="listbox"
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && handleOpenChange(!dropdownOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (!disabled) handleOpenChange(!dropdownOpen);
            }
          }}
          className={cn(
            "flex min-h-[32px] w-full flex-wrap items-center gap-1 rounded-lg border border-input bg-transparent px-2 py-1 text-sm transition-colors outline-none",
            "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
            disabled && "cursor-not-allowed opacity-50",
            status === "error" &&
              "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
            status === "warning" &&
              "border-yellow-500 focus-within:border-yellow-500 focus-within:ring-yellow-500/20",
            variant === "borderless" && "border-0 shadow-none",
            variant === "filled" && "border-0 bg-muted",
            variant === "underlined" &&
              "rounded-none border-0 border-b border-input shadow-none",
            size === "large" && "min-h-[40px] text-base",
            size === "small" && "min-h-[28px] text-xs"
          )}
        >
          {selectedLabels.map((item) => (
            <span
              key={String(item.value)}
              className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs"
            >
              <span className="max-w-[100px] truncate">
                {item.label as React.ReactNode}
              </span>
              {!disabled && (
                <X
                  className="size-3 cursor-pointer text-muted-foreground hover:text-foreground"
                  onClick={(e) => removeValue(item.value, e)}
                />
              )}
            </span>
          ))}

          {(showSearch || mode === "tags") && (
            <input
              className="min-w-[60px] flex-1 border-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              placeholder={
                selectedLabels.length === 0 ? placeholder : undefined
              }
              value={searchValue}
              onChange={handleSearchInput}
              onKeyDown={handleKeyDown}
              onClick={(e) => {
                e.stopPropagation();
                if (!dropdownOpen) handleOpenChange(true);
              }}
              disabled={disabled}
            />
          )}

          {!showSearch && mode !== "tags" && selectedLabels.length === 0 && (
            <span className="text-muted-foreground">{placeholder}</span>
          )}

          {loading && (
            <Loader2 className="ml-auto size-3.5 shrink-0 animate-spin text-muted-foreground" />
          )}
          {allowClear && selectedValues.length > 0 && !disabled && (
            <span
              role="button"
              tabIndex={-1}
              className="ml-auto inline-flex size-3.5 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
              onClick={handleClearAll}
              onMouseDown={(e) => e.preventDefault()}
            >
              <X className="size-3" />
            </span>
          )}
        </div>

        {/* Dropdown */}
        {dropdownOpen && !disabled && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => handleOpenChange(false)}
            />
            <div
              role="listbox"
              aria-multiselectable
              className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-popover shadow-md ring-1 ring-foreground/10"
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => {
                  const isSelected = selectedValues.includes(opt.value);
                  return (
                    <div
                      key={String(opt.value)}
                      role="option"
                      aria-selected={isSelected}
                      className={cn(
                        "relative flex cursor-default items-center px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground",
                        opt.disabled && "pointer-events-none opacity-50",
                        isSelected && "font-medium"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!opt.disabled) toggleValue(opt.value);
                      }}
                    >
                      <span className="flex-1">{opt.label}</span>
                      {isSelected && (
                        <svg
                          className="size-4 shrink-0 text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                  {notFoundContent}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
);

MultipleSelect.displayName = "MultipleSelect";

// --- Main Select Component ---

const InternalSelect = React.forwardRef<HTMLButtonElement, SelectProps>(
  (props, ref) => {
    const {
      options: rawOptions,
      value: valueProp,
      defaultValue: defaultValueProp,
      onChange,
      mode,
      size: sizeProp,
      placeholder = "Select...",
      disabled = false,
      loading = false,
      allowClear = false,
      status,
      variant = "outlined",
      showSearch = false,
      onSearch,
      filterOption,
      labelInValue = false,
      open: openProp,
      onOpenChange,
      fieldNames,
      notFoundContent = "No data",
      popupMatchSelectWidth = true,
      className,
      style,
      id,
    } = props;

    const size = useComponentSize(sizeProp);
    const mappedSize = SIZE_MAP[size];
    const resolvedOptions = resolveOptions(rawOptions, fieldNames);

    const [searchValue, setSearchValue] = React.useState("");

    const filteredOptions = React.useMemo(() => {
      if (!showSearch || !searchValue) return resolvedOptions;
      return resolvedOptions.filter((opt) => {
        if (filterOption === false) return true;
        if (typeof filterOption === "function") {
          return filterOption(searchValue, opt);
        }
        const label =
          typeof opt.label === "string" ? opt.label : String(opt.label);
        return label.toLowerCase().includes(searchValue.toLowerCase());
      });
    }, [resolvedOptions, searchValue, showSearch, filterOption]);

    if (!mode) {
      return (
        <SingleSelect
          ref={ref}
          resolvedOptions={resolvedOptions}
          filteredOptions={filteredOptions}
          valueProp={valueProp}
          defaultValueProp={defaultValueProp}
          onChange={onChange}
          labelInValue={labelInValue}
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          allowClear={allowClear}
          status={status}
          variant={variant}
          size={size}
          mappedSize={mappedSize}
          openProp={openProp}
          onOpenChange={onOpenChange}
          setSearchValue={setSearchValue}
          popupMatchSelectWidth={popupMatchSelectWidth}
          notFoundContent={notFoundContent}
          className={className}
          style={style}
          id={id}
        />
      );
    }

    return (
      <MultipleSelect
        ref={ref}
        resolvedOptions={resolvedOptions}
        filteredOptions={filteredOptions}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        showSearch={showSearch}
        onSearch={onSearch}
        valueProp={valueProp}
        defaultValueProp={defaultValueProp}
        onChange={onChange}
        mode={mode}
        labelInValue={labelInValue}
        placeholder={placeholder}
        disabled={disabled}
        loading={loading}
        allowClear={allowClear}
        status={status}
        variant={variant}
        size={size}
        notFoundContent={notFoundContent}
        popupMatchSelectWidth={popupMatchSelectWidth}
        className={className}
        style={style}
        id={id}
        openProp={openProp}
        onOpenChange={onOpenChange}
      />
    );
  }
);

InternalSelect.displayName = "Select";

export { InternalSelect };
