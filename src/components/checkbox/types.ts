/**
 * @file Checkbox Type Definitions
 *
 * Props for `<Checkbox>` and `<Checkbox.Group>`. Supports
 * controlled / uncontrolled checked state, indeterminate visual,
 * and group selection with options array or child composition.
 *
 * @see {@link ./Checkbox.tsx} — component implementation
 * @see {@link ./CheckboxGroup.tsx} — group implementation
 */

import type { ReactNode } from "react";

export interface CheckboxChangeEvent {
  target: {
    checked: boolean;
    value?: any;
  };
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: Event | undefined;
}

export interface CheckboxProps {
  /** Whether the checkbox is checked (controlled) */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Whether to show indeterminate state */
  indeterminate?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Callback when state changes */
  onChange?: (e: CheckboxChangeEvent) => void;
  /** Label content rendered beside the checkbox */
  children?: ReactNode;
  /** Value used in CheckboxGroup */
  value?: any;
  /** Additional class name */
  className?: string;
  /** ID attribute */
  id?: string;
  /** Name attribute */
  name?: string;
}

export interface CheckboxOptionType {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** List of options or simple values */
  options?: (string | number | CheckboxOptionType)[];
  /** Controlled selected values */
  value?: (string | number)[];
  /** Default selected values */
  defaultValue?: (string | number)[];
  /** Callback when selected values change */
  onChange?: (checkedValues: (string | number)[]) => void;
  /** Disable all checkboxes in the group */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
  /** Name attribute for all checkboxes */
  name?: string;
  /** Child content (alternative to options prop) */
  children?: ReactNode;
}
