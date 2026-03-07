/**
 * @file Checkbox Component
 *
 * A styled checkbox with label support. Works standalone or inside
 * a `Checkbox.Group` context. Supports controlled / uncontrolled
 * `checked`, `indeterminate` visual state, and `disabled`.
 *
 * Key props: `checked`, `defaultChecked`, `indeterminate`,
 * `disabled`, `onChange`, `children` (label).
 *
 * @example
 * ```tsx
 * <Checkbox onChange={(e) => console.log(e.target.checked)}>
 *   Accept terms
 * </Checkbox>
 * ```
 *
 * @see {@link ./types.ts} — prop definitions
 * @see {@link ./CheckboxGroup.tsx} — group component
 * @see {@link ./index.ts} — barrel export
 */

"use client";

import * as React from "react";
import { Checkbox as PrimitiveCheckbox } from "@/primitives/checkbox";
import { cn } from "@/lib/utils";
import type { CheckboxProps, CheckboxChangeEvent } from "./types";
import { CheckboxGroupContext } from "./CheckboxGroup";

const InternalCheckbox = React.forwardRef<HTMLElement, CheckboxProps>(
  (props, ref) => {
    const {
      checked: checkedProp,
      defaultChecked = false,
      indeterminate = false,
      disabled: disabledProp = false,
      onChange,
      children,
      value,
      className,
      id,
      name,
    } = props;

    const groupContext = React.useContext(CheckboxGroupContext);

    // Determine checked state from group or from props
    let isChecked: boolean | undefined;
    let isDisabled = disabledProp;

    if (groupContext) {
      isChecked = groupContext.value.includes(value);
      isDisabled = disabledProp || groupContext.disabled;
    } else {
      isChecked = checkedProp;
    }

    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const controlled = checkedProp !== undefined || groupContext != null;
    const actualChecked = controlled ? (isChecked ?? false) : internalChecked;

    const handleCheckedChange = React.useCallback(
      (nextChecked: boolean) => {
        if (!controlled) {
          setInternalChecked(nextChecked);
        }

        if (groupContext) {
          groupContext.toggleValue(value);
          return;
        }

        if (onChange) {
          const event: CheckboxChangeEvent = {
            target: {
              checked: nextChecked,
              value,
            },
            stopPropagation: () => {},
            preventDefault: () => {},
            nativeEvent: undefined,
          };
          onChange(event);
        }
      },
      [controlled, groupContext, onChange, value]
    );

    return (
      <label
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer select-none text-sm",
          isDisabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <PrimitiveCheckbox
          ref={ref}
          id={id}
          name={name}
          checked={actualChecked}
          indeterminate={indeterminate}
          disabled={isDisabled}
          onCheckedChange={handleCheckedChange}
        />
        {children && <span>{children}</span>}
      </label>
    );
  }
);

InternalCheckbox.displayName = "Checkbox";

export { InternalCheckbox };
