/**
 * @file TreeSelect -- dropdown selector with a hierarchical tree menu.
 *
 * Renders a combobox-style trigger that opens a dropdown containing
 * a tree of selectable nodes. Supports single and multiple selection,
 * checkable nodes, search filtering, async data loading, and
 * custom field name mapping.
 *
 * Key props: `treeData`, `value`, `onChange`, `treeCheckable`,
 * `showSearch`, `multiple`, `placeholder`, `allowClear`.
 *
 * @example
 * ```tsx
 * <TreeSelect
 *   treeData={[
 *     { value: "parent", title: "Parent", children: [
 *       { value: "child", title: "Child" },
 *     ]},
 *   ]}
 *   placeholder="Select node"
 * />
 * ```
 *
 * @see {@link ./types.ts} for prop definitions.
 * @see {@link ./index.ts} for the public export.
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { TreeSelectProps, TreeSelectDataNode } from "./types";

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function XIcon({
  className,
  onClick,
}: {
  className?: string;
  onClick?: React.MouseEventHandler;
}) {
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resolveFieldNames(fieldNames?: {
  label?: string;
  value?: string;
  children?: string;
}) {
  return {
    label: fieldNames?.label ?? "title",
    value: fieldNames?.value ?? "value",
    children: fieldNames?.children ?? "children",
  };
}

function getNodeValue(
  node: TreeSelectDataNode,
  valueKey: string,
): string | number {
  return (node as any)[valueKey] as string | number;
}

function getNodeLabel(
  node: TreeSelectDataNode,
  labelKey: string,
): React.ReactNode {
  return (node as any)[labelKey] as React.ReactNode;
}

function getNodeChildren(
  node: TreeSelectDataNode,
  childrenKey: string,
): TreeSelectDataNode[] | undefined {
  return (node as any)[childrenKey] as TreeSelectDataNode[] | undefined;
}

function getAllKeys(
  data: TreeSelectDataNode[],
  childrenKey: string,
): (string | number)[] {
  const keys: (string | number)[] = [];
  const traverse = (nodes: TreeSelectDataNode[]) => {
    for (const node of nodes) {
      keys.push(node.value);
      const children = getNodeChildren(node, childrenKey);
      if (children) traverse(children);
    }
  };
  traverse(data);
  return keys;
}

function findNode(
  data: TreeSelectDataNode[],
  value: string | number,
  valueKey: string,
  childrenKey: string,
): TreeSelectDataNode | undefined {
  for (const node of data) {
    if (getNodeValue(node, valueKey) === value) return node;
    const children = getNodeChildren(node, childrenKey);
    if (children) {
      const found = findNode(children, value, valueKey, childrenKey);
      if (found) return found;
    }
  }
  return undefined;
}

function filterTree(
  data: TreeSelectDataNode[],
  searchValue: string,
  labelKey: string,
  childrenKey: string,
): TreeSelectDataNode[] {
  const lower = searchValue.toLowerCase();
  return data.reduce<TreeSelectDataNode[]>((acc, node) => {
    const label = getNodeLabel(node, labelKey);
    const text = typeof label === "string" ? label : String(label ?? "");
    const children = getNodeChildren(node, childrenKey);
    const filteredChildren = children
      ? filterTree(children, searchValue, labelKey, childrenKey)
      : [];

    if (
      text.toLowerCase().includes(lower) ||
      filteredChildren.length > 0
    ) {
      acc.push({
        ...node,
        [childrenKey]: filteredChildren.length > 0 ? filteredChildren : children,
      });
    }
    return acc;
  }, []);
}

// ---------------------------------------------------------------------------
// TreeNode (dropdown)
// ---------------------------------------------------------------------------

interface TreeNodeItemProps {
  node: TreeSelectDataNode;
  level: number;
  expandedKeys: Set<string | number>;
  selectedValues: Set<string | number>;
  treeCheckable: boolean;
  treeLine: boolean;
  loadingKeys: Set<string | number>;
  valueKey: string;
  labelKey: string;
  childrenKey: string;
  onExpand: (value: string | number) => void;
  onSelect: (value: string | number) => void;
  onCheck: (value: string | number, checked: boolean) => void;
}

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
  node,
  level,
  expandedKeys,
  selectedValues,
  treeCheckable,
  treeLine,
  loadingKeys,
  valueKey,
  labelKey,
  childrenKey,
  onExpand,
  onSelect,
  onCheck,
}) => {
  const nodeValue = getNodeValue(node, valueKey);
  const nodeLabel = getNodeLabel(node, labelKey);
  const nodeChildren = getNodeChildren(node, childrenKey);
  const isLeaf = node.isLeaf ?? (!nodeChildren || nodeChildren.length === 0);
  const isExpanded = expandedKeys.has(nodeValue);
  const isSelected = selectedValues.has(nodeValue);
  const isLoading = loadingKeys.has(nodeValue);

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 rounded px-2 py-1 text-sm",
          !node.disabled && "cursor-pointer hover:bg-muted/50",
          isSelected && !treeCheckable && "bg-primary/10 font-medium text-primary",
          node.disabled && "cursor-not-allowed opacity-50",
        )}
        style={{ paddingLeft: level * 20 + 8 }}
        onClick={() => {
          if (node.disabled) return;
          if (!isLeaf) {
            onExpand(nodeValue);
          }
          if (!treeCheckable) {
            if (node.selectable !== false) {
              onSelect(nodeValue);
            }
          }
        }}
      >
        {/* Switcher */}
        {!isLeaf ? (
          <span
            className="inline-flex size-5 shrink-0 items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onExpand(nodeValue);
            }}
          >
            {isLoading ? (
              <LoaderIcon className="size-3.5 text-muted-foreground" />
            ) : isExpanded ? (
              <ChevronDownIcon className="size-3.5 text-muted-foreground" />
            ) : (
              <ChevronRightIcon className="size-3.5 text-muted-foreground" />
            )}
          </span>
        ) : (
          <span
            className={cn(
              "inline-flex size-5 shrink-0 items-center justify-center",
              treeLine && "text-muted-foreground",
            )}
          >
            {treeLine ? "-" : ""}
          </span>
        )}

        {/* Checkbox */}
        {treeCheckable && node.checkable !== false && (
          <input
            type="checkbox"
            className="size-4 shrink-0 rounded border-input accent-primary"
            checked={isSelected}
            disabled={node.disabled || node.disableCheckbox}
            onChange={(e) => {
              e.stopPropagation();
              onCheck(nodeValue, e.target.checked);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        )}

        {/* Label */}
        <span className="min-w-0 flex-1 truncate">{nodeLabel}</span>
      </div>

      {/* Children */}
      {!isLeaf && isExpanded && nodeChildren && (
        <div className={cn(treeLine && "ml-2.5 border-l border-border")}>
          {nodeChildren.map((child) => (
            <TreeNodeItem
              key={getNodeValue(child, valueKey)}
              node={child}
              level={level + 1}
              expandedKeys={expandedKeys}
              selectedValues={selectedValues}
              treeCheckable={treeCheckable}
              treeLine={treeLine}
              loadingKeys={loadingKeys}
              valueKey={valueKey}
              labelKey={labelKey}
              childrenKey={childrenKey}
              onExpand={onExpand}
              onSelect={onSelect}
              onCheck={onCheck}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// InternalTreeSelect
// ---------------------------------------------------------------------------

const InternalTreeSelect = React.forwardRef<HTMLDivElement, TreeSelectProps>(
  (props, ref) => {
    const {
      treeData = [],
      value: valueProp,
      defaultValue,
      onChange,
      treeCheckable = false,
      showSearch = false,
      multiple = false,
      placeholder = "Please select",
      allowClear = false,
      disabled = false,
      size = "middle",
      status,
      variant = "outlined",
      fieldNames: fieldNamesProp,
      treeDefaultExpandAll = false,
      treeDefaultExpandedKeys = [],
      treeExpandedKeys: treeExpandedKeysProp,
      onTreeExpand,
      maxTagCount,
      dropdownStyle,
      treeLine = false,
      loadData,
      className,
      style,
    } = props;

    const isMultiple = multiple || treeCheckable;
    const fields = resolveFieldNames(fieldNamesProp);

    // Open state
    const [isOpen, setIsOpen] = React.useState(false);

    // Search state
    const [searchValue, setSearchValue] = React.useState("");

    // Value state
    const normalizeValue = React.useCallback(
      (
        val: string | number | (string | number)[] | undefined,
      ): (string | number)[] => {
        if (val == null) return [];
        if (Array.isArray(val)) return val;
        return [val];
      },
      [],
    );

    const [internalValue, setInternalValue] = React.useState<
      (string | number)[]
    >(() => normalizeValue(defaultValue));

    const selectedValues =
      valueProp !== undefined ? normalizeValue(valueProp) : internalValue;
    const selectedSet = React.useMemo(
      () => new Set(selectedValues),
      [selectedValues],
    );

    // Expanded state
    const [internalExpanded, setInternalExpanded] = React.useState<
      (string | number)[]
    >(() =>
      treeDefaultExpandAll
        ? getAllKeys(treeData, fields.children)
        : treeDefaultExpandedKeys,
    );
    const expandedKeys = treeExpandedKeysProp ?? internalExpanded;
    const expandedSet = React.useMemo(
      () => new Set(expandedKeys),
      [expandedKeys],
    );

    // Loading state
    const [loadingKeys, setLoadingKeys] = React.useState<
      Set<string | number>
    >(new Set());

    // Filtered tree
    const displayTree = React.useMemo(() => {
      if (!searchValue) return treeData;
      return filterTree(treeData, searchValue, fields.label, fields.children);
    }, [treeData, searchValue, fields.label, fields.children]);

    // Close dropdown on outside click
    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!isOpen) return;
      const handleClick = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
          setSearchValue("");
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen]);

    // Handlers
    const handleExpand = React.useCallback(
      async (value: string | number) => {
        const newExpanded = expandedSet.has(value)
          ? expandedKeys.filter((k) => k !== value)
          : [...expandedKeys, value];

        if (treeExpandedKeysProp === undefined) {
          setInternalExpanded(newExpanded);
        }
        onTreeExpand?.(newExpanded);

        // Async load
        if (!expandedSet.has(value) && loadData) {
          const node = findNode(
            treeData,
            value,
            fields.value,
            fields.children,
          );
          if (
            node &&
            !node.isLeaf &&
            (!getNodeChildren(node, fields.children) ||
              getNodeChildren(node, fields.children)!.length === 0)
          ) {
            setLoadingKeys((prev) => new Set(prev).add(value));
            try {
              await loadData(node);
            } finally {
              setLoadingKeys((prev) => {
                const next = new Set(prev);
                next.delete(value);
                return next;
              });
            }
          }
        }
      },
      [
        expandedSet,
        expandedKeys,
        treeExpandedKeysProp,
        onTreeExpand,
        loadData,
        treeData,
        fields,
      ],
    );

    const triggerOnChange = React.useCallback(
      (
        newValues: (string | number)[],
        triggerValue: string | number,
      ) => {
        if (!onChange) return;
        const labels = newValues.map((v) => {
          const node = findNode(
            treeData,
            v,
            fields.value,
            fields.children,
          );
          return node ? getNodeLabel(node, fields.label) : String(v);
        });
        if (isMultiple) {
          onChange(newValues, labels, { triggerValue });
        } else {
          onChange(
            newValues[0] ?? (undefined as unknown as string),
            labels[0] ?? (undefined as unknown as React.ReactNode),
            { triggerValue },
          );
        }
      },
      [onChange, treeData, fields, isMultiple],
    );

    const handleSelect = React.useCallback(
      (value: string | number) => {
        let newValues: (string | number)[];
        if (isMultiple) {
          newValues = selectedSet.has(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];
        } else {
          newValues = [value];
          setIsOpen(false);
          setSearchValue("");
        }
        if (valueProp === undefined) {
          setInternalValue(newValues);
        }
        triggerOnChange(newValues, value);
      },
      [
        isMultiple,
        selectedSet,
        selectedValues,
        valueProp,
        triggerOnChange,
      ],
    );

    const handleCheck = React.useCallback(
      (value: string | number, checked: boolean) => {
        let newValues: (string | number)[];
        if (checked) {
          newValues = [...selectedValues, value];
        } else {
          newValues = selectedValues.filter((v) => v !== value);
        }
        if (valueProp === undefined) {
          setInternalValue(newValues);
        }
        triggerOnChange(newValues, value);
      },
      [selectedValues, valueProp, triggerOnChange],
    );

    const handleRemoveTag = React.useCallback(
      (value: string | number, e: React.MouseEvent) => {
        e.stopPropagation();
        const newValues = selectedValues.filter((v) => v !== value);
        if (valueProp === undefined) {
          setInternalValue(newValues);
        }
        triggerOnChange(newValues, value);
      },
      [selectedValues, valueProp, triggerOnChange],
    );

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (valueProp === undefined) {
          setInternalValue([]);
        }
        triggerOnChange([], selectedValues[0]);
      },
      [valueProp, triggerOnChange, selectedValues],
    );

    // Build display labels
    const selectedLabels = React.useMemo(() => {
      return selectedValues.map((v) => {
        const node = findNode(
          treeData,
          v,
          fields.value,
          fields.children,
        );
        return {
          value: v,
          label: node ? getNodeLabel(node, fields.label) : String(v),
        };
      });
    }, [selectedValues, treeData, fields]);

    const visibleTags =
      typeof maxTagCount === "number"
        ? selectedLabels.slice(0, maxTagCount)
        : selectedLabels;
    const hiddenCount =
      typeof maxTagCount === "number"
        ? Math.max(0, selectedLabels.length - maxTagCount)
        : 0;

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        className={cn("relative inline-block w-full", className)}
        style={style}
      >
        {/* Trigger */}
        <div
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="tree"
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled) {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          className={cn(
            "flex min-h-[32px] w-full flex-wrap items-center gap-1 rounded-lg border border-input bg-transparent px-2 py-1 text-sm transition-colors outline-none",
            "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
            disabled && "cursor-not-allowed opacity-50",
            status === "error" &&
              "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
            status === "warning" &&
              "border-yellow-500 focus-within:border-yellow-500 focus-within:ring-yellow-500/20",
            variant === "borderless" && "border-0 shadow-none",
            variant === "filled" && "border-0 bg-muted",
            size === "large" && "min-h-[40px] text-base",
            size === "small" && "min-h-[28px] text-xs",
          )}
        >
          {isMultiple ? (
            <>
              {visibleTags.map((item) => (
                <span
                  key={String(item.value)}
                  className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs"
                >
                  <span className="max-w-[100px] truncate">
                    {item.label as React.ReactNode}
                  </span>
                  {!disabled && (
                    <XIcon
                      className="size-3 cursor-pointer text-muted-foreground hover:text-foreground"
                      onClick={(e: React.MouseEvent) =>
                        handleRemoveTag(item.value, e)
                      }
                    />
                  )}
                </span>
              ))}
              {hiddenCount > 0 && (
                <span className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                  +{hiddenCount}
                </span>
              )}
              {showSearch && (
                <input
                  className="min-w-[60px] flex-1 border-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  placeholder={
                    selectedLabels.length === 0 ? placeholder : undefined
                  }
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isOpen) setIsOpen(true);
                  }}
                  disabled={disabled}
                />
              )}
              {!showSearch && selectedLabels.length === 0 && (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </>
          ) : (
            <>
              {showSearch && isOpen ? (
                <input
                  className="min-w-0 flex-1 border-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  placeholder={
                    selectedLabels.length > 0
                      ? String(selectedLabels[0].label)
                      : placeholder
                  }
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                  disabled={disabled}
                />
              ) : selectedLabels.length > 0 ? (
                <span className="min-w-0 flex-1 truncate text-sm">
                  {selectedLabels[0].label as React.ReactNode}
                </span>
              ) : (
                <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                  {placeholder}
                </span>
              )}
            </>
          )}

          {/* Clear / Arrow */}
          <span className="ml-auto flex shrink-0 items-center gap-1">
            {allowClear && selectedValues.length > 0 && !disabled && (
              <span
                role="button"
                tabIndex={-1}
                className="inline-flex size-3.5 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
                onClick={handleClear}
                onMouseDown={(e) => e.preventDefault()}
              >
                <XIcon className="size-3" />
              </span>
            )}
            <ChevronDownIcon
              className={cn(
                "size-4 text-muted-foreground transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </span>
        </div>

        {/* Dropdown */}
        {isOpen && !disabled && (
          <div
            role="tree"
            className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-lg bg-popover py-1 shadow-md ring-1 ring-foreground/10"
            style={dropdownStyle}
          >
            {showSearch && !isMultiple && (
              <div className="px-2 pb-1">
                <div className="flex items-center gap-1.5 rounded-md border border-input px-2 py-1">
                  <SearchIcon className="size-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="min-w-0 flex-1 border-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}
            {displayTree.length === 0 ? (
              <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                No data
              </div>
            ) : (
              displayTree.map((node) => (
                <TreeNodeItem
                  key={getNodeValue(node, fields.value)}
                  node={node}
                  level={0}
                  expandedKeys={expandedSet}
                  selectedValues={selectedSet}
                  treeCheckable={treeCheckable}
                  treeLine={treeLine}
                  loadingKeys={loadingKeys}
                  valueKey={fields.value}
                  labelKey={fields.label}
                  childrenKey={fields.children}
                  onExpand={handleExpand}
                  onSelect={handleSelect}
                  onCheck={handleCheck}
                />
              ))
            )}
          </div>
        )}
      </div>
    );
  },
);

InternalTreeSelect.displayName = "TreeSelect";

export { InternalTreeSelect };
