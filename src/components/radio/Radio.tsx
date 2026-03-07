/**
 * @file Radio -- single-choice input within a group.
 *
 * Renders a radio indicator with label. Works standalone or within a
 * `Radio.Group` context for managed single-selection. Supports controlled
 * and uncontrolled checked state, disabled mode, and custom IDs.
 *
 * Key props: `checked`, `value`, `onChange`, `disabled`, `children`.
 *
 * @example
 * ```tsx
 * <Radio value="a">Option A</Radio>
 * <Radio.Group value={val} onChange={handleChange}>
 *   <Radio value="a">A</Radio>
 *   <Radio value="b">B</Radio>
 * </Radio.Group>
 * ```
 *
 * @see ./types.ts       - RadioProps, RadioGroupProps
 * @see ./RadioGroup.tsx - group wrapper
 * @see ./index.ts       - public export
 */
"use client";

import * as React from "react";
import { RadioGroupItem } from "@/primitives/radio-group";
import { cn } from "@/lib/utils";
import type { RadioProps, RadioChangeEvent } from "./types";
import { RadioGroupContext } from "./RadioGroup";

const InternalRadio = React.forwardRef<HTMLElement, RadioProps>(
  (props, ref) => {
    const {
      checked: checkedProp,
      defaultChecked,
      disabled: disabledProp = false,
      value,
      onChange,
      children,
      className,
      id,
      name: _name,
    } = props;

    const groupContext = React.useContext(RadioGroupContext);
    const isDisabled = disabledProp || (groupContext?.disabled ?? false);

    // Hooks must be called unconditionally
    const [internalChecked, setInternalChecked] = React.useState(
      defaultChecked ?? false
    );

    const isControlled = checkedProp !== undefined;

    const handleStandaloneClick = React.useCallback(() => {
      if (isDisabled) return;

      if (!isControlled) {
        setInternalChecked(true);
      }

      if (onChange) {
        const event: RadioChangeEvent = {
          target: {
            checked: true,
            value,
          },
          stopPropagation: () => {},
          preventDefault: () => {},
          nativeEvent: undefined,
        };
        onChange(event);
      }
    }, [isDisabled, isControlled, onChange, value]);

    // When inside a RadioGroup (with primitive wrapper), use RadioGroupItem
    if (groupContext) {
      return (
        <label
          className={cn(
            "inline-flex items-center gap-2 cursor-pointer select-none text-sm",
            isDisabled && "cursor-not-allowed opacity-50",
            className
          )}
        >
          <RadioGroupItem
            ref={ref}
            id={id}
            value={value != null ? String(value) : ""}
            disabled={isDisabled}
          />
          {children && <span>{children}</span>}
        </label>
      );
    }

    // Standalone radio (no group context) -- render a custom radio indicator
    const isChecked = isControlled ? checkedProp : internalChecked;

    return (
      <label
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer select-none text-sm",
          isDisabled && "cursor-not-allowed opacity-50",
          className
        )}
        onClick={handleStandaloneClick}
      >
        <span
          ref={ref as any}
          role="radio"
          aria-checked={isChecked}
          tabIndex={isDisabled ? -1 : 0}
          id={id}
          className={cn(
            "relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none transition-colors",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            isDisabled && "cursor-not-allowed opacity-50",
            isChecked && "border-primary bg-primary text-primary-foreground"
          )}
        >
          {isChecked && (
            <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
          )}
        </span>
        {children && <span>{children}</span>}
      </label>
    );
  }
);

InternalRadio.displayName = "Radio";

export { InternalRadio };
