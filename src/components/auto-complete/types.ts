/**
 * @file AutoComplete Type Definitions
 *
 * Props and option interfaces for the `<AutoComplete>` input component.
 * Supports controlled / uncontrolled value, custom filtering, size,
 * status validation, and variant styling.
 *
 * @see {@link ./AutoComplete.tsx} — component implementation
 */

import type { CSSProperties, ReactNode } from "react";

export type AutoCompleteSize = "small" | "middle" | "large";

export type AutoCompleteStatus = "error" | "warning";

export type AutoCompleteVariant = "outlined" | "borderless" | "filled";

export interface AutoCompleteOption {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
}

export interface AutoCompleteProps {
  options?: AutoCompleteOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSelect?: (value: string, option: AutoCompleteOption) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  allowClear?: boolean;
  placeholder?: string;
  disabled?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onDropdownVisibleChange?: (open: boolean) => void;
  filterOption?:
    | boolean
    | ((inputValue: string, option: AutoCompleteOption) => boolean);
  defaultActiveFirstOption?: boolean;
  backfill?: boolean;
  size?: AutoCompleteSize;
  status?: AutoCompleteStatus;
  variant?: AutoCompleteVariant;
  notFoundContent?: ReactNode;
  popupClassName?: string;
  popupMatchSelectWidth?: boolean | number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
