/**
 * @file Cascader Component
 *
 * Hierarchical dropdown selector that drills into nested option
 * columns. Supports single and multiple selection, expand on
 * click or hover, search filtering, lazy loading via `loadData`,
 * allow-clear, and custom display rendering.
 *
 * Key props: `options`, `value`, `onChange`, `multiple`,
 * `expandTrigger`, `showSearch`, `changeOnSelect`, `placeholder`.
 *
 * @example
 * ```tsx
 * <Cascader
 *   options={[
 *     { value: "zhejiang", label: "Zhejiang", children: [
 *       { value: "hangzhou", label: "Hangzhou" },
 *     ]},
 *   ]}
 *   placeholder="Select location"
 * />
 * ```
 *
 * @see {@link ./types.ts} — prop definitions
 * @see {@link ./index.ts} — barrel export
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { CascaderProps, CascaderOption } from "./types";

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

function CheckIcon({ className }: { className?: string }) {
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
      <polyline points="20 6 9 17 4 12" />
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
    label: fieldNames?.label ?? "label",
    value: fieldNames?.value ?? "value",
    children: fieldNames?.children ?? "children",
  };
}

function getOptionValue(
  opt: CascaderOption,
  valueKey: string,
): string | number {
  return (opt as any)[valueKey] as string | number;
}

function getOptionLabel(
  opt: CascaderOption,
  labelKey: string,
): React.ReactNode {
  return (opt as any)[labelKey] as React.ReactNode;
}

function getOptionChildren(
  opt: CascaderOption,
  childrenKey: string,
): CascaderOption[] | undefined {
  return (opt as any)[childrenKey] as CascaderOption[] | undefined;
}

function findOptionPath(
  options: CascaderOption[],
  valuePath: (string | number)[],
  valueKey: string,
  childrenKey: string,
): CascaderOption[] {
  const result: CascaderOption[] = [];
  let current = options;
  for (const val of valuePath) {
    const found = current.find(
      (opt) => getOptionValue(opt, valueKey) === val,
    );
    if (!found) break;
    result.push(found);
    const children = getOptionChildren(found, childrenKey);
    if (children) {
      current = children;
    } else {
      break;
    }
  }
  return result;
}

/** Collect all paths for search */
function collectPaths(
  options: CascaderOption[],
  valueKey: string,
  labelKey: string,
  childrenKey: string,
  parentPath: CascaderOption[] = [],
): CascaderOption[][] {
  const paths: CascaderOption[][] = [];
  for (const opt of options) {
    const currentPath = [...parentPath, opt];
    const children = getOptionChildren(opt, childrenKey);
    if (children && children.length > 0) {
      paths.push(
        ...collectPaths(children, valueKey, labelKey, childrenKey, currentPath),
      );
    } else {
      paths.push(currentPath);
    }
  }
  return paths;
}

// ---------------------------------------------------------------------------
// CascaderColumn
// ---------------------------------------------------------------------------

interface CascaderColumnProps {
  options: CascaderOption[];
  activeValue: string | number | undefined;
  selectedValues: Set<string | number>;
  valueKey: string;
  labelKey: string;
  childrenKey: string;
  expandTrigger: "click" | "hover";
  onSelect: (opt: CascaderOption) => void;
  onExpand: (opt: CascaderOption) => void;
  multiple: boolean;
  onCheck?: (opt: CascaderOption, checked: boolean) => void;
}

const CascaderColumn: React.FC<CascaderColumnProps> = ({
  options,
  activeValue,
  selectedValues,
  valueKey,
  labelKey,
  childrenKey,
  expandTrigger,
  onSelect,
  onExpand,
  multiple,
  onCheck,
}) => {
  return (
    <div className="min-w-[120px] max-h-[280px] overflow-y-auto border-r border-border last:border-r-0">
      {options.map((opt) => {
        const val = getOptionValue(opt, valueKey);
        const label = getOptionLabel(opt, labelKey);
        const children = getOptionChildren(opt, childrenKey);
        const hasChildren = children && children.length > 0 && !opt.isLeaf;
        const isActive = activeValue === val;
        const isSelected = selectedValues.has(val);

        return (
          <div
            key={String(val)}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 px-3 py-1.5 text-sm",
              isActive && "bg-primary/10 font-medium text-primary",
              opt.disabled && "cursor-not-allowed opacity-50",
              !opt.disabled && !isActive && "hover:bg-muted/50",
            )}
            onClick={() => {
              if (opt.disabled) return;
              if (multiple && onCheck) {
                onCheck(opt, !isSelected);
              } else if (hasChildren) {
                onExpand(opt);
              } else {
                onSelect(opt);
              }
            }}
            onMouseEnter={() => {
              if (expandTrigger === "hover" && hasChildren && !opt.disabled) {
                onExpand(opt);
              }
            }}
          >
            {multiple && (
              <input
                type="checkbox"
                className="size-4 shrink-0 rounded border-input accent-primary"
                checked={isSelected}
                disabled={opt.disabled}
                onChange={(e) => {
                  e.stopPropagation();
                  if (onCheck) onCheck(opt, e.target.checked);
                }}
                onClick={(e) => e.stopPropagation()}
              />
            )}
            <span className="min-w-0 flex-1 truncate">{label}</span>
            {!multiple && isSelected && !hasChildren && (
              <CheckIcon className="size-3.5 shrink-0 text-primary" />
            )}
            {hasChildren && (
              <ChevronRightIcon className="size-3.5 shrink-0 text-muted-foreground" />
            )}
          </div>
        );
      })}
    </div>
  );
};

// ---------------------------------------------------------------------------
// SearchResult
// ---------------------------------------------------------------------------

interface SearchResultProps {
  paths: CascaderOption[][];
  labelKey: string;
  onSelect: (path: CascaderOption[]) => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  paths,
  labelKey,
  onSelect,
}) => {
  if (paths.length === 0) {
    return (
      <div className="px-2 py-4 text-center text-sm text-muted-foreground">
        No results
      </div>
    );
  }

  return (
    <div className="max-h-[280px] overflow-y-auto">
      {paths.map((path, idx) => {
        const labels = path.map((opt) =>
          String(getOptionLabel(opt, labelKey) ?? ""),
        );
        return (
          <div
            key={idx}
            className="cursor-pointer px-3 py-1.5 text-sm hover:bg-muted/50"
            onClick={() => onSelect(path)}
          >
            {labels.join(" / ")}
          </div>
        );
      })}
    </div>
  );
};

// ---------------------------------------------------------------------------
// InternalCascader
// ---------------------------------------------------------------------------

const InternalCascader = React.forwardRef<HTMLDivElement, CascaderProps>(
  (props, ref) => {
    const {
      options = [],
      value: valueProp,
      defaultValue,
      onChange,
      multiple = false,
      expandTrigger = "click",
      fieldNames: fieldNamesProp,
      showSearch = false,
      changeOnSelect = false,
      displayRender,
      loadData,
      placeholder = "Please select",
      size = "middle",
      status,
      variant = "outlined",
      allowClear = false,
      disabled = false,
      maxTagCount,
      className,
      style,
    } = props;

    const fields = resolveFieldNames(fieldNamesProp);

    // Open state
    const [isOpen, setIsOpen] = React.useState(false);

    // Search
    const [searchValue, setSearchValue] = React.useState("");
    const searchEnabled =
      showSearch === true || (typeof showSearch === "object" && showSearch !== null);

    // Value state: array of value paths
    // Single: one path e.g., ["zhejiang", "hangzhou", "xihu"]
    // Multiple: array of paths
    const [internalValue, setInternalValue] = React.useState<
      (string | number)[]
    >(() => defaultValue ?? []);

    const selectedValue =
      valueProp !== undefined ? valueProp : internalValue;

    // For multiple mode, we store selected leaf values in a flat set
    const [multipleValues, setMultipleValues] = React.useState<
      Set<string | number>
    >(new Set());

    // Active path for columns: the options currently expanded
    const [activePath, setActivePath] = React.useState<CascaderOption[]>([]);

    // Close on outside click
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
          setActivePath([]);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen]);

    // Build columns from active path
    const columns = React.useMemo(() => {
      const cols: CascaderOption[][] = [options];
      for (const opt of activePath) {
        const children = getOptionChildren(opt, fields.children);
        if (children && children.length > 0) {
          cols.push(children);
        }
      }
      return cols;
    }, [options, activePath, fields.children]);

    // Active values for highlighting
    const activeValues = React.useMemo(
      () => activePath.map((opt) => getOptionValue(opt, fields.value)),
      [activePath, fields.value],
    );

    // Selected values set (for non-multiple, mark the full path)
    const selectedValueSet = React.useMemo(() => {
      if (multiple) return multipleValues;
      return new Set(selectedValue);
    }, [multiple, multipleValues, selectedValue]);

    // Search paths
    const searchPaths = React.useMemo(() => {
      if (!searchValue) return [];
      const allPaths = collectPaths(
        options,
        fields.value,
        fields.label,
        fields.children,
      );

      if (typeof showSearch === "object" && showSearch.filter) {
        return allPaths.filter((path) => showSearch.filter!(searchValue, path));
      }

      const lower = searchValue.toLowerCase();
      return allPaths.filter((path) =>
        path.some((opt) => {
          const label = String(getOptionLabel(opt, fields.label) ?? "");
          return label.toLowerCase().includes(lower);
        }),
      );
    }, [searchValue, options, fields, showSearch]);

    // Handlers
    const handleExpand = React.useCallback(
      (opt: CascaderOption, columnIndex: number) => {
        const newPath = [...activePath.slice(0, columnIndex), opt];
        setActivePath(newPath);

        // Load data if needed
        const children = getOptionChildren(opt, fields.children);
        if (
          loadData &&
          !opt.isLeaf &&
          (!children || children.length === 0)
        ) {
          const pathOptions = findOptionPath(
            options,
            newPath.map((o) => getOptionValue(o, fields.value)),
            fields.value,
            fields.children,
          );
          loadData(pathOptions);
        }

        // changeOnSelect: trigger onChange for intermediate selections
        if (changeOnSelect && !multiple) {
          const newValue = newPath.map((o) =>
            getOptionValue(o, fields.value),
          );
          if (valueProp === undefined) {
            setInternalValue(newValue);
          }
          onChange?.(newValue, newPath);
        }
      },
      [
        activePath,
        fields,
        loadData,
        options,
        changeOnSelect,
        multiple,
        valueProp,
        onChange,
      ],
    );

    const handleSelect = React.useCallback(
      (opt: CascaderOption, columnIndex: number) => {
        const path = [...activePath.slice(0, columnIndex), opt];
        const newValue = path.map((o) => getOptionValue(o, fields.value));

        if (!multiple) {
          if (valueProp === undefined) {
            setInternalValue(newValue);
          }
          onChange?.(newValue, path);
          setIsOpen(false);
          setSearchValue("");
          setActivePath([]);
        }
      },
      [activePath, fields, multiple, valueProp, onChange],
    );

    const handleSearchSelect = React.useCallback(
      (path: CascaderOption[]) => {
        const newValue = path.map((o) => getOptionValue(o, fields.value));
        if (valueProp === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(newValue, path);
        setIsOpen(false);
        setSearchValue("");
        setActivePath([]);
      },
      [fields, valueProp, onChange],
    );

    const handleCheck = React.useCallback(
      (opt: CascaderOption, checked: boolean) => {
        const val = getOptionValue(opt, fields.value);
        setMultipleValues((prev) => {
          const next = new Set(prev);
          if (checked) {
            next.add(val);
          } else {
            next.delete(val);
          }
          return next;
        });
      },
      [fields],
    );

    const handleRemoveTag = React.useCallback(
      (val: string | number, e: React.MouseEvent) => {
        e.stopPropagation();
        setMultipleValues((prev) => {
          const next = new Set(prev);
          next.delete(val);
          return next;
        });
      },
      [],
    );

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (multiple) {
          setMultipleValues(new Set());
        } else {
          if (valueProp === undefined) {
            setInternalValue([]);
          }
          onChange?.([], []);
        }
      },
      [multiple, valueProp, onChange],
    );

    // Display label
    const displayLabel = React.useMemo(() => {
      if (multiple) return null; // multiple uses tags
      if (selectedValue.length === 0) return null;
      const path = findOptionPath(
        options,
        selectedValue,
        fields.value,
        fields.children,
      );
      const labels = path.map((opt) =>
        String(getOptionLabel(opt, fields.label) ?? ""),
      );
      if (displayRender) {
        return displayRender(labels, path);
      }
      return labels.join(" / ");
    }, [multiple, selectedValue, options, fields, displayRender]);

    // Multiple tags
    const multipleTags = React.useMemo(() => {
      if (!multiple) return [];
      return Array.from(multipleValues).map((val) => {
        const node = (function findInOptions(
          opts: CascaderOption[],
        ): CascaderOption | undefined {
          for (const opt of opts) {
            if (getOptionValue(opt, fields.value) === val) return opt;
            const children = getOptionChildren(opt, fields.children);
            if (children) {
              const found = findInOptions(children);
              if (found) return found;
            }
          }
          return undefined;
        })(options);
        return {
          value: val,
          label: node
            ? getOptionLabel(node, fields.label)
            : String(val),
        };
      });
    }, [multiple, multipleValues, options, fields]);

    const visibleTags =
      typeof maxTagCount === "number"
        ? multipleTags.slice(0, maxTagCount)
        : multipleTags;
    const hiddenCount =
      typeof maxTagCount === "number"
        ? Math.max(0, multipleTags.length - maxTagCount)
        : 0;

    const hasValue = multiple
      ? multipleValues.size > 0
      : selectedValue.length > 0;

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
          aria-haspopup="listbox"
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
          {multiple ? (
            <>
              {visibleTags.map((tag) => (
                <span
                  key={String(tag.value)}
                  className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs"
                >
                  <span className="max-w-[100px] truncate">
                    {tag.label as React.ReactNode}
                  </span>
                  {!disabled && (
                    <XIcon
                      className="size-3 cursor-pointer text-muted-foreground hover:text-foreground"
                      onClick={(e: React.MouseEvent) =>
                        handleRemoveTag(tag.value, e)
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
              {searchEnabled && (
                <input
                  className="min-w-[60px] flex-1 border-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  placeholder={
                    multipleTags.length === 0 ? placeholder : undefined
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
              {!searchEnabled && multipleTags.length === 0 && (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </>
          ) : (
            <>
              {searchEnabled && isOpen ? (
                <input
                  className="min-w-0 flex-1 border-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  placeholder={
                    displayLabel ? String(displayLabel) : placeholder
                  }
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                  disabled={disabled}
                />
              ) : displayLabel ? (
                <span className="min-w-0 flex-1 truncate text-sm">
                  {displayLabel}
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
            {allowClear && hasValue && !disabled && (
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
          <div className="absolute z-50 mt-1 rounded-lg bg-popover shadow-md ring-1 ring-foreground/10">
            {searchEnabled && searchValue ? (
              <SearchResult
                paths={searchPaths}
                labelKey={fields.label}
                onSelect={handleSearchSelect}
              />
            ) : (
              <div className="flex">
                {columns.map((colOptions, colIdx) => (
                  <CascaderColumn
                    key={colIdx}
                    options={colOptions}
                    activeValue={activeValues[colIdx]}
                    selectedValues={selectedValueSet}
                    valueKey={fields.value}
                    labelKey={fields.label}
                    childrenKey={fields.children}
                    expandTrigger={expandTrigger}
                    multiple={multiple}
                    onExpand={(opt) => handleExpand(opt, colIdx)}
                    onSelect={(opt) => handleSelect(opt, colIdx)}
                    onCheck={multiple ? handleCheck : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

InternalCascader.displayName = "Cascader";

export { InternalCascader };
