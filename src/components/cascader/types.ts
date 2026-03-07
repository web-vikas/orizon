/**
 * @file Cascader Type Definitions
 *
 * Props and option interfaces for the `<Cascader>` hierarchical
 * selection component. Supports single / multiple selection,
 * expand on click or hover, search filtering, lazy loading,
 * and various size / status / variant styles.
 *
 * @see {@link ./Cascader.tsx} — component implementation
 */

import type { CSSProperties, ReactNode } from "react";

export interface CascaderOption {
  value: string | number;
  label?: ReactNode;
  children?: CascaderOption[];
  disabled?: boolean;
  isLeaf?: boolean;
}

export type CascaderSize = "small" | "middle" | "large";
export type CascaderStatus = "error" | "warning";
export type CascaderVariant = "outlined" | "borderless" | "filled";
export type CascaderExpandTrigger = "click" | "hover";
export type CascaderPlacement = "bottomLeft" | "bottomRight" | "topLeft" | "topRight";

export interface CascaderProps {
  options?: CascaderOption[];
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange?: (
    value: (string | number)[],
    selectedOptions: CascaderOption[],
  ) => void;
  multiple?: boolean;
  expandTrigger?: CascaderExpandTrigger;
  fieldNames?: { label?: string; value?: string; children?: string };
  showSearch?:
    | boolean
    | { filter?: (inputValue: string, path: CascaderOption[]) => boolean };
  changeOnSelect?: boolean;
  displayRender?: (
    labels: string[],
    selectedOptions?: CascaderOption[],
  ) => ReactNode;
  loadData?: (selectedOptions: CascaderOption[]) => void;
  placeholder?: string;
  size?: CascaderSize;
  status?: CascaderStatus;
  variant?: CascaderVariant;
  placement?: CascaderPlacement;
  allowClear?: boolean;
  disabled?: boolean;
  maxTagCount?: number | "responsive";
  className?: string;
  style?: CSSProperties;
}
