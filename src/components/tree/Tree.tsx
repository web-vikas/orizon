/**
 * @file Tree -- hierarchical tree view with checkboxes, expand/collapse,
 * drag, and async data loading.
 *
 * Renders a tree structure from `treeData` with per-node expand,
 * select, and check support. Includes a `Tree.DirectoryTree`
 * sub-component that defaults to full-width, icon-enabled display
 * suited for file-system navigation.
 *
 * Key props: `treeData`, `checkable`, `selectedKeys`, `checkedKeys`,
 * `expandedKeys`, `showLine`, `showIcon`, `loadData`.
 *
 * @example
 * ```tsx
 * <Tree
 *   treeData={[
 *     { key: "0-0", title: "Parent", children: [
 *       { key: "0-0-0", title: "Child" },
 *     ]},
 *   ]}
 *   checkable
 * />
 * ```
 *
 * @see {@link ./types.ts} for prop definitions.
 * @see {@link ./index.ts} for the public export.
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  Loader2Icon,
} from "lucide-react";
import type { TreeProps, DirectoryTreeProps, TreeDataNode } from "./types";
import type { Key } from "react";

// ---------------------------------------------------------------------------
// Helpers: collect all keys from tree
// ---------------------------------------------------------------------------

function getAllKeys(data: TreeDataNode[]): Key[] {
  const keys: Key[] = [];
  const traverse = (nodes: TreeDataNode[]) => {
    for (const node of nodes) {
      keys.push(node.key);
      if (node.children) traverse(node.children);
    }
  };
  traverse(data);
  return keys;
}

function getAllChildKeys(node: TreeDataNode): Key[] {
  const keys: Key[] = [];
  const traverse = (nodes: TreeDataNode[]) => {
    for (const n of nodes) {
      if (!n.disabled && !n.disableCheckbox) {
        keys.push(n.key);
      }
      if (n.children) traverse(n.children);
    }
  };
  if (node.children) traverse(node.children);
  return keys;
}

function getCheckedKeysFromNode(
  node: TreeDataNode,
  checked: boolean,
  currentChecked: Set<Key>,
): Set<Key> {
  const newSet = new Set(currentChecked);
  if (checked) {
    newSet.add(node.key);
    for (const childKey of getAllChildKeys(node)) {
      newSet.add(childKey);
    }
  } else {
    newSet.delete(node.key);
    for (const childKey of getAllChildKeys(node)) {
      newSet.delete(childKey);
    }
  }
  return newSet;
}

function computeHalfChecked(data: TreeDataNode[], checkedSet: Set<Key>): Key[] {
  const halfChecked: Key[] = [];
  const traverse = (nodes: TreeDataNode[]): boolean => {
    let allChecked = true;
    let someChecked = false;

    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        const childResult = traverse(node.children);
        if (checkedSet.has(node.key)) {
          someChecked = true;
        } else {
          allChecked = false;
        }
        if (childResult) someChecked = true;
      } else {
        if (checkedSet.has(node.key)) {
          someChecked = true;
        } else {
          allChecked = false;
        }
      }
    }

    if (someChecked && !allChecked) {
      // parent is half-checked
    }

    return someChecked;
  };

  const computeParent = (nodes: TreeDataNode[]) => {
    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        computeParent(node.children);
        const childKeys = getAllChildKeys(node);
        const allChecked = childKeys.length > 0 && childKeys.every((k) => checkedSet.has(k));
        const someChecked = childKeys.some((k) => checkedSet.has(k));

        if (allChecked) {
          checkedSet.add(node.key);
        } else if (someChecked) {
          halfChecked.push(node.key);
          checkedSet.delete(node.key);
        }
      }
    }
  };

  computeParent(data);
  return halfChecked;
}

// ---------------------------------------------------------------------------
// TreeNode
// ---------------------------------------------------------------------------

interface TreeNodeProps {
  node: TreeDataNode;
  level: number;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  halfChecked: boolean;
  checkable: boolean;
  showLine: boolean;
  showIcon: boolean;
  blockNode: boolean;
  loading: boolean;
  isDirectory: boolean;
  onExpand: (key: Key) => void;
  onSelect: (key: Key) => void;
  onCheck: (key: Key, checked: boolean) => void;
  onDoubleClick?: (key: Key) => void;
  switcherIcon?: TreeProps["switcherIcon"];
  titleRender?: TreeProps["titleRender"];
  globalIcon?: TreeProps["icon"];
  filterTreeNode?: TreeProps["filterTreeNode"];
  renderChildren: (nodes: TreeDataNode[], level: number) => React.ReactNode;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  node,
  level,
  expanded,
  selected,
  checked,
  halfChecked,
  checkable,
  showLine,
  showIcon,
  blockNode,
  loading,
  isDirectory,
  onExpand,
  onSelect,
  onCheck,
  onDoubleClick,
  switcherIcon,
  titleRender,
  globalIcon,
  filterTreeNode,
  renderChildren,
}) => {
  const isLeaf = node.isLeaf ?? (!node.children || node.children.length === 0);
  const hasChildren = !isLeaf;
  const isFiltered = filterTreeNode ? filterTreeNode(node) : false;

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren || loading) {
      onExpand(node.key);
    }
  };

  const handleSelect = () => {
    if (node.disabled) return;
    if (node.selectable === false) return;
    onSelect(node.key);
  };

  const handleCheck = () => {
    if (node.disabled || node.disableCheckbox) return;
    onCheck(node.key, !checked);
  };

  // Determine icon
  const renderIcon = () => {
    if (!showIcon) return null;
    if (node.icon) return <span className="mr-1 inline-flex items-center [&>svg]:size-4">{node.icon}</span>;
    if (globalIcon) {
      const iconContent = typeof globalIcon === "function" ? globalIcon(node) : globalIcon;
      return <span className="mr-1 inline-flex items-center [&>svg]:size-4">{iconContent}</span>;
    }
    if (isDirectory) {
      return (
        <span className="mr-1 inline-flex items-center text-muted-foreground">
          {expanded ? <FolderOpenIcon className="size-4" /> : <FolderIcon className="size-4" />}
        </span>
      );
    }
    if (isLeaf) {
      return (
        <span className="mr-1 inline-flex items-center text-muted-foreground">
          <FileIcon className="size-4" />
        </span>
      );
    }
    return null;
  };

  // Determine switcher icon
  const renderSwitcher = () => {
    if (isLeaf) {
      if (showLine) {
        return <span className="inline-flex size-6 items-center justify-center text-muted-foreground">-</span>;
      }
      return <span className="inline-block size-6" />;
    }

    if (loading) {
      return (
        <span className="inline-flex size-6 items-center justify-center">
          <Loader2Icon className="size-3.5 animate-spin text-muted-foreground" />
        </span>
      );
    }

    if (switcherIcon) {
      const iconContent =
        typeof switcherIcon === "function"
          ? switcherIcon({ expanded })
          : switcherIcon;
      return (
        <span
          className="inline-flex size-6 cursor-pointer items-center justify-center"
          onClick={handleExpandClick}
        >
          {iconContent}
        </span>
      );
    }

    return (
      <span
        className="inline-flex size-6 cursor-pointer items-center justify-center text-muted-foreground transition-transform hover:text-foreground"
        onClick={handleExpandClick}
      >
        {expanded ? (
          <ChevronDownIcon className="size-4" />
        ) : (
          <ChevronRightIcon className="size-4" />
        )}
      </span>
    );
  };

  return (
    <div className={cn(node.className)} style={node.style}>
      <div
        className={cn(
          "group flex items-center gap-0.5 rounded-md py-0.5",
          blockNode && "w-full",
          selected && "bg-primary/10",
          isFiltered && "bg-yellow-100 dark:bg-yellow-900/30",
          node.disabled && "pointer-events-none opacity-50",
          !node.disabled && "hover:bg-muted/50",
        )}
        style={{ paddingLeft: level * 24 }}
        onClick={handleSelect}
        onDoubleClick={onDoubleClick ? () => onDoubleClick(node.key) : undefined}
      >
        {/* Switcher */}
        {renderSwitcher()}

        {/* Checkbox */}
        {checkable && node.checkable !== false && (
          <span className="mr-1 inline-flex items-center">
            <input
              type="checkbox"
              className="size-4 rounded border-input accent-primary"
              checked={checked}
              ref={(el) => {
                if (el) el.indeterminate = halfChecked;
              }}
              onChange={handleCheck}
              disabled={node.disabled || node.disableCheckbox}
              onClick={(e) => e.stopPropagation()}
            />
          </span>
        )}

        {/* Icon */}
        {renderIcon()}

        {/* Title */}
        <span
          className={cn(
            "cursor-pointer select-none text-sm",
            selected && "font-medium text-primary",
          )}
        >
          {titleRender ? titleRender(node) : node.title}
        </span>
      </div>

      {/* Children */}
      {hasChildren && expanded && node.children && (
        <div className={cn(showLine && "border-l border-border ml-3")}>
          {renderChildren(node.children, level + 1)}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// InternalTree
// ---------------------------------------------------------------------------

const InternalTree: React.FC<TreeProps> = ({
  treeData = [],
  checkable = false,
  selectedKeys: selectedKeysProp,
  defaultSelectedKeys = [],
  checkedKeys: checkedKeysProp,
  defaultCheckedKeys = [],
  expandedKeys: expandedKeysProp,
  defaultExpandedKeys = [],
  defaultExpandAll = false,
  onSelect,
  onCheck,
  onExpand,
  showLine = false,
  showIcon = false,
  loadData,
  multiple = false,
  checkStrictly = false,
  switcherIcon,
  blockNode = false,
  className,
  style,
  titleRender,
  filterTreeNode,
  icon,
}) => {
  // ---- Expanded state ----
  const [internalExpanded, setInternalExpanded] = React.useState<Key[]>(() =>
    defaultExpandAll ? getAllKeys(treeData) : defaultExpandedKeys,
  );
  const expandedKeys = expandedKeysProp ?? internalExpanded;

  // ---- Selected state ----
  const [internalSelected, setInternalSelected] = React.useState<Key[]>(defaultSelectedKeys);
  const selectedKeys = selectedKeysProp ?? internalSelected;

  // ---- Checked state ----
  const [internalChecked, setInternalChecked] = React.useState<Key[]>(() => {
    if (checkedKeysProp) {
      return Array.isArray(checkedKeysProp) ? checkedKeysProp : checkedKeysProp.checked;
    }
    return defaultCheckedKeys;
  });
  const checkedKeysArray = checkedKeysProp
    ? Array.isArray(checkedKeysProp)
      ? checkedKeysProp
      : checkedKeysProp.checked
    : internalChecked;

  const checkedSet = React.useMemo(() => new Set(checkedKeysArray), [checkedKeysArray]);

  // Compute half-checked
  const halfCheckedKeys = React.useMemo(() => {
    if (checkStrictly) return [];
    const setClone = new Set(checkedSet);
    return computeHalfChecked(treeData, setClone);
  }, [checkedSet, treeData, checkStrictly]);

  const halfCheckedSet = React.useMemo(() => new Set(halfCheckedKeys), [halfCheckedKeys]);

  // ---- Loading state (for async loading) ----
  const [loadingKeys, setLoadingKeys] = React.useState<Set<Key>>(new Set());

  // ---- Handlers ----
  const handleExpand = async (key: Key) => {
    const isExpanded = expandedKeys.includes(key);
    const newKeys = isExpanded
      ? expandedKeys.filter((k) => k !== key)
      : [...expandedKeys, key];

    if (!expandedKeysProp) setInternalExpanded(newKeys);

    // Find node for callback
    const findNode = (nodes: TreeDataNode[]): TreeDataNode | undefined => {
      for (const n of nodes) {
        if (n.key === key) return n;
        if (n.children) {
          const found = findNode(n.children);
          if (found) return found;
        }
      }
      return undefined;
    };
    const node = findNode(treeData);

    onExpand?.(newKeys, { node: node!, expanded: !isExpanded });

    // Async load
    if (!isExpanded && loadData && node && !node.isLeaf && (!node.children || node.children.length === 0)) {
      setLoadingKeys((prev) => new Set(prev).add(key));
      try {
        await loadData(node);
      } finally {
        setLoadingKeys((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }
    }
  };

  const handleSelect = (key: Key) => {
    let newKeys: Key[];
    if (multiple) {
      newKeys = selectedKeys.includes(key)
        ? selectedKeys.filter((k) => k !== key)
        : [...selectedKeys, key];
    } else {
      newKeys = selectedKeys.includes(key) ? [] : [key];
    }

    if (!selectedKeysProp) setInternalSelected(newKeys);

    const findNode = (nodes: TreeDataNode[]): TreeDataNode | undefined => {
      for (const n of nodes) {
        if (n.key === key) return n;
        if (n.children) {
          const found = findNode(n.children);
          if (found) return found;
        }
      }
      return undefined;
    };
    const node = findNode(treeData);

    onSelect?.(newKeys, { node: node!, selected: newKeys.includes(key) });
  };

  const handleCheck = (key: Key, isChecked: boolean) => {
    const findNode = (nodes: TreeDataNode[]): TreeDataNode | undefined => {
      for (const n of nodes) {
        if (n.key === key) return n;
        if (n.children) {
          const found = findNode(n.children);
          if (found) return found;
        }
      }
      return undefined;
    };
    const node = findNode(treeData);
    if (!node) return;

    let newCheckedSet: Set<Key>;

    if (checkStrictly) {
      newCheckedSet = new Set(checkedSet);
      if (isChecked) {
        newCheckedSet.add(key);
      } else {
        newCheckedSet.delete(key);
      }
    } else {
      newCheckedSet = getCheckedKeysFromNode(node, isChecked, checkedSet);
      // Recompute parent states
      computeHalfChecked(treeData, newCheckedSet);
    }

    const newKeys = Array.from(newCheckedSet);

    if (!checkedKeysProp) setInternalChecked(newKeys);

    const newHalfChecked = checkStrictly ? [] : computeHalfChecked(treeData, new Set(newKeys));
    onCheck?.(
      checkStrictly ? { checked: newKeys, halfChecked: [] } : newKeys,
      { node, checked: isChecked, halfCheckedKeys: newHalfChecked },
    );
  };

  // ---- Render tree nodes recursively ----
  const renderNodes = (nodes: TreeDataNode[], level: number): React.ReactNode => {
    return nodes.map((node) => (
      <TreeNodeComponent
        key={node.key}
        node={node}
        level={level}
        expanded={expandedKeys.includes(node.key)}
        selected={selectedKeys.includes(node.key)}
        checked={checkedSet.has(node.key)}
        halfChecked={halfCheckedSet.has(node.key)}
        checkable={checkable}
        showLine={showLine}
        showIcon={showIcon}
        blockNode={blockNode}
        loading={loadingKeys.has(node.key)}
        isDirectory={false}
        onExpand={handleExpand}
        onSelect={handleSelect}
        onCheck={handleCheck}
        switcherIcon={switcherIcon}
        titleRender={titleRender}
        globalIcon={icon}
        filterTreeNode={filterTreeNode}
        renderChildren={renderNodes}
      />
    ));
  };

  return (
    <div
      className={cn("w-full py-1", className)}
      style={style}
      role="tree"
    >
      {renderNodes(treeData, 0)}
    </div>
  );
};

InternalTree.displayName = "Tree";

// ---------------------------------------------------------------------------
// DirectoryTree
// ---------------------------------------------------------------------------

const DirectoryTree: React.FC<DirectoryTreeProps> = ({
  expandAction = "click",
  showIcon = true,
  blockNode = true,
  ...rest
}) => {
  return (
    <InternalTree
      showIcon={showIcon}
      blockNode={blockNode}
      {...rest}
    />
  );
};

DirectoryTree.displayName = "Tree.DirectoryTree";

export { InternalTree, DirectoryTree };
