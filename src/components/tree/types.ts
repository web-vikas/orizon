/**
 * @file Tree component type definitions.
 *
 * Provides `TreeProps` for the hierarchical tree view, `TreeDataNode`
 * for individual nodes, and `DirectoryTreeProps` for the
 * file-system-style variant. Supports checkable, draggable,
 * async-loaded, and filterable trees.
 *
 * @see {@link ./Tree.tsx} for the implementation.
 * @see {@link ./index.ts} for the public export.
 */
import type { ReactNode, CSSProperties, Key } from "react";

export interface TreeDataNode {
  /** Unique key */
  key: Key;
  /** Display title */
  title?: ReactNode;
  /** Children nodes */
  children?: TreeDataNode[];
  /** Whether this node is disabled */
  disabled?: boolean;
  /** Whether the checkbox is disabled */
  disableCheckbox?: boolean;
  /** Whether this is a leaf node */
  isLeaf?: boolean;
  /** Whether this node is selectable */
  selectable?: boolean;
  /** Custom icon */
  icon?: ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: CSSProperties;
  /** Checkable override */
  checkable?: boolean;
  /** Whether the node is switcherIcon */
  switcherIcon?: ReactNode;
}

export interface TreeProps {
  /** Tree data */
  treeData?: TreeDataNode[];
  /** Whether to show checkboxes */
  checkable?: boolean;
  /** Selected keys (controlled) */
  selectedKeys?: Key[];
  /** Default selected keys */
  defaultSelectedKeys?: Key[];
  /** Checked keys (controlled) */
  checkedKeys?: Key[] | { checked: Key[]; halfChecked: Key[] };
  /** Default checked keys */
  defaultCheckedKeys?: Key[];
  /** Expanded keys (controlled) */
  expandedKeys?: Key[];
  /** Default expanded keys */
  defaultExpandedKeys?: Key[];
  /** Whether to expand all by default */
  defaultExpandAll?: boolean;
  /** Callback when node is selected */
  onSelect?: (selectedKeys: Key[], info: { node: TreeDataNode; selected: boolean }) => void;
  /** Callback when node is checked */
  onCheck?: (
    checkedKeys: Key[] | { checked: Key[]; halfChecked: Key[] },
    info: { node: TreeDataNode; checked: boolean; halfCheckedKeys: Key[] },
  ) => void;
  /** Callback when node is expanded */
  onExpand?: (expandedKeys: Key[], info: { node: TreeDataNode; expanded: boolean }) => void;
  /** Whether nodes are draggable */
  draggable?: boolean;
  /** Show connecting lines */
  showLine?: boolean;
  /** Show node icons */
  showIcon?: boolean;
  /** Async data loading */
  loadData?: (node: TreeDataNode) => Promise<void>;
  /** Whether multiple selection is allowed */
  multiple?: boolean;
  /** Whether to allow checkbox to cascade check */
  checkStrictly?: boolean;
  /** Switcher icon */
  switcherIcon?: ReactNode | ((props: { expanded: boolean }) => ReactNode);
  /** Block node: full width clickable */
  blockNode?: boolean;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  /** Height for virtual scroll */
  height?: number;
  /** Custom title render */
  titleRender?: (nodeData: TreeDataNode) => ReactNode;
  /** Filter tree node */
  filterTreeNode?: (node: TreeDataNode) => boolean;
  /** Custom icon */
  icon?: ReactNode | ((props: TreeDataNode) => ReactNode);
}

export interface DirectoryTreeProps extends TreeProps {
  /** Expand action */
  expandAction?: "click" | "doubleClick" | false;
}
