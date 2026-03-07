/**
 * @file Select component type definitions.
 *
 * Exports props for the `<Select>` dropdown including single/multiple/tags
 * modes, search filtering, variants, sizes, and label-in-value support.
 *
 * @see ./Select.tsx - component implementation
 * @see ./index.ts   - public export
 */
import type { ReactNode } from "react";
import type { ComponentSize } from "@/hooks/useComponentSize";

export interface SelectOptionType {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface LabeledValue {
  label: ReactNode;
  value: string | number;
}

export interface FieldNames {
  label?: string;
  value?: string;
}

export interface SelectProps {
  /** Array of select options */
  options?: SelectOptionType[];
  /** Current selected value (single mode) */
  value?: string | number | (string | number)[] | LabeledValue | LabeledValue[];
  /** Default selected value */
  defaultValue?: string | number | (string | number)[] | LabeledValue | LabeledValue[];
  /** Callback when value changes */
  onChange?: (value: any, option: SelectOptionType | SelectOptionType[]) => void;
  /** Mode of select: multiple or tags. Undefined means single select. */
  mode?: "multiple" | "tags";
  /** Size of select */
  size?: ComponentSize;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is loading */
  loading?: boolean;
  /** Show clear button */
  allowClear?: boolean;
  /** Validation status */
  status?: "error" | "warning";
  /** Visual variant */
  variant?: "outlined" | "borderless" | "filled" | "underlined";
  /** Enable search/filter */
  showSearch?: boolean;
  /** Callback when search input changes */
  onSearch?: (value: string) => void;
  /** Custom filter function. Return true to include option. */
  filterOption?: boolean | ((inputValue: string, option: SelectOptionType) => boolean);
  /** Whether to wrap value in { label, value } object */
  labelInValue?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when dropdown open/close */
  onOpenChange?: (open: boolean) => void;
  /** Custom field names mapping */
  fieldNames?: FieldNames;
  /** Content to show when no options match */
  notFoundContent?: ReactNode;
  /** Whether popup width matches trigger width, or a fixed number */
  popupMatchSelectWidth?: boolean | number;
  /** Additional class name */
  className?: string;
  /** Additional style */
  style?: React.CSSProperties;
  /** ID attribute */
  id?: string;
}
