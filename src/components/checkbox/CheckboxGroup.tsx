/**
 * @file CheckboxGroup Component
 *
 * Provides group context for multiple `<Checkbox>` children.
 * Manages a shared list of selected values and can render
 * checkboxes from an `options` array or from child composition.
 *
 * @see {@link ./Checkbox.tsx} — individual checkbox
 * @see {@link ./types.ts} — prop definitions
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { InternalCheckbox } from "./Checkbox";
import type { CheckboxGroupProps, CheckboxOptionType } from "./types";

export interface CheckboxGroupContextValue {
  value: (string | number)[];
  disabled: boolean;
  toggleValue: (val: string | number) => void;
}

export const CheckboxGroupContext =
  React.createContext<CheckboxGroupContextValue | null>(null);

function normalizeOptions(
  options?: (string | number | CheckboxOptionType)[]
): CheckboxOptionType[] {
  if (!options) return [];
  return options.map((opt) => {
    if (typeof opt === "string" || typeof opt === "number") {
      return { label: String(opt), value: opt };
    }
    return opt;
  });
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const {
    options: rawOptions,
    value: valueProp,
    defaultValue = [],
    onChange,
    disabled = false,
    className,
    name,
    children,
  } = props;

  const [internalValue, setInternalValue] =
    React.useState<(string | number)[]>(defaultValue);

  const isControlled = valueProp !== undefined;
  const currentValue = isControlled ? valueProp! : internalValue;

  const toggleValue = React.useCallback(
    (val: string | number) => {
      const newValues = currentValue.includes(val)
        ? currentValue.filter((v) => v !== val)
        : [...currentValue, val];

      if (!isControlled) {
        setInternalValue(newValues);
      }
      onChange?.(newValues);
    },
    [currentValue, isControlled, onChange]
  );

  const contextValue = React.useMemo<CheckboxGroupContextValue>(
    () => ({
      value: currentValue,
      disabled,
      toggleValue,
    }),
    [currentValue, disabled, toggleValue]
  );

  const normalizedOptions = normalizeOptions(rawOptions);

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div
        data-slot="checkbox-group"
        className={cn("flex flex-wrap gap-x-4 gap-y-2", className)}
      >
        {normalizedOptions.length > 0
          ? normalizedOptions.map((opt) => (
              <InternalCheckbox
                key={String(opt.value)}
                value={opt.value}
                disabled={opt.disabled}
                name={name}
              >
                {opt.label}
              </InternalCheckbox>
            ))
          : children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

CheckboxGroup.displayName = "CheckboxGroup";

export { CheckboxGroup };
