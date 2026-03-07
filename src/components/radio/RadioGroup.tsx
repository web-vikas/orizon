"use client";

import * as React from "react";
import { RadioGroup as PrimitiveRadioGroup } from "@/primitives/radio-group";
import { cn } from "@/lib/utils";
import { useComponentSize } from "@/hooks/useComponentSize";
import { InternalRadio } from "./Radio";
import { RadioButton } from "./RadioButton";
import type {
  RadioGroupProps,
  RadioOptionType,
  RadioChangeEvent,
  ComponentSize,
} from "./types";

export interface RadioGroupContextValue {
  value: any;
  disabled: boolean;
  onChange: (value: any) => void;
  buttonStyle?: "outline" | "solid";
  size?: ComponentSize;
}

export const RadioGroupContext =
  React.createContext<RadioGroupContextValue | null>(null);

function normalizeOptions(
  options?: (string | number | RadioOptionType)[]
): RadioOptionType[] {
  if (!options) return [];
  return options.map((opt) => {
    if (typeof opt === "string" || typeof opt === "number") {
      return { label: String(opt), value: opt };
    }
    return opt;
  });
}

const InternalRadioGroup: React.FC<RadioGroupProps> = (props) => {
  const {
    options: rawOptions,
    value: valueProp,
    defaultValue,
    onChange,
    optionType = "default",
    buttonStyle = "outline",
    size: sizeProp,
    disabled = false,
    block = false,
    className,
    name,
    children,
  } = props;

  const size = useComponentSize(sizeProp);

  const [internalValue, setInternalValue] = React.useState<any>(
    defaultValue ?? null
  );

  const isControlled = valueProp !== undefined;
  const currentValue = isControlled ? valueProp : internalValue;

  const handleChange = React.useCallback(
    (val: any) => {
      if (!isControlled) {
        setInternalValue(val);
      }
      if (onChange) {
        const event: RadioChangeEvent = {
          target: {
            checked: true,
            value: val,
          },
          stopPropagation: () => {},
          preventDefault: () => {},
          nativeEvent: undefined,
        };
        onChange(event);
      }
    },
    [isControlled, onChange]
  );

  const contextValue = React.useMemo<RadioGroupContextValue>(
    () => ({
      value: currentValue,
      disabled,
      onChange: handleChange,
      buttonStyle,
      size,
    }),
    [currentValue, disabled, handleChange, buttonStyle, size]
  );

  const normalizedOptions = normalizeOptions(rawOptions);

  // Button-type rendering (no RadioGroup primitive, just buttons)
  if (optionType === "button") {
    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          data-slot="radio-group"
          role="radiogroup"
          className={cn(
            "inline-flex",
            block && "flex w-full",
            className
          )}
        >
          {normalizedOptions.length > 0
            ? normalizedOptions.map((opt) => (
                <RadioButton
                  key={String(opt.value)}
                  value={opt.value}
                  disabled={opt.disabled}
                  className={block ? "flex-1" : undefined}
                >
                  {opt.label}
                </RadioButton>
              ))
            : children}
        </div>
      </RadioGroupContext.Provider>
    );
  }

  // Default rendering with RadioGroup primitive
  const handlePrimitiveChange = React.useCallback(
    (val: any) => {
      // base-ui radio-group returns string values
      // Try to find original typed value
      const matchedOpt = normalizedOptions.find(
        (o) => String(o.value) === String(val)
      );
      const resolvedValue = matchedOpt ? matchedOpt.value : val;
      handleChange(resolvedValue);
    },
    [handleChange, normalizedOptions]
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <PrimitiveRadioGroup
        value={currentValue != null ? String(currentValue) : undefined}
        defaultValue={
          defaultValue != null ? String(defaultValue) : undefined
        }
        onValueChange={handlePrimitiveChange}
        disabled={disabled}
        name={name}
        className={cn(
          "flex flex-wrap gap-x-4 gap-y-2",
          block && "w-full",
          className
        )}
      >
        {normalizedOptions.length > 0
          ? normalizedOptions.map((opt) => (
              <InternalRadio
                key={String(opt.value)}
                value={opt.value}
                disabled={opt.disabled}
              >
                {opt.label}
              </InternalRadio>
            ))
          : children}
      </PrimitiveRadioGroup>
    </RadioGroupContext.Provider>
  );
};

InternalRadioGroup.displayName = "RadioGroup";

export { InternalRadioGroup };
