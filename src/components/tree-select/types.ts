import type { CSSProperties, ReactNode } from "react";

export interface TreeSelectDataNode {
  value: string | number;
  title?: ReactNode;
  key?: string | number;
  children?: TreeSelectDataNode[];
  disabled?: boolean;
  disableCheckbox?: boolean;
  selectable?: boolean;
  checkable?: boolean;
  isLeaf?: boolean;
}

export type TreeSelectSize = "small" | "middle" | "large";
export type TreeSelectStatus = "error" | "warning";
export type TreeSelectVariant = "outlined" | "borderless" | "filled";

export interface TreeSelectProps {
  treeData?: TreeSelectDataNode[];
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  onChange?: (
    value: string | number | (string | number)[],
    label: ReactNode | ReactNode[],
    extra: { triggerValue: string | number },
  ) => void;
  treeCheckable?: boolean;
  showSearch?: boolean;
  multiple?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  size?: TreeSelectSize;
  status?: TreeSelectStatus;
  variant?: TreeSelectVariant;
  fieldNames?: { label?: string; value?: string; children?: string };
  treeDefaultExpandAll?: boolean;
  treeDefaultExpandedKeys?: (string | number)[];
  treeExpandedKeys?: (string | number)[];
  onTreeExpand?: (keys: (string | number)[]) => void;
  showCheckedStrategy?: "SHOW_ALL" | "SHOW_PARENT" | "SHOW_CHILD";
  maxTagCount?: number | "responsive";
  dropdownStyle?: CSSProperties;
  treeLine?: boolean;
  loadData?: (node: TreeSelectDataNode) => Promise<void>;
  className?: string;
  style?: CSSProperties;
}
