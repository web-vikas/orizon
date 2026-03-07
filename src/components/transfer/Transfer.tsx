"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { TransferProps, TransferItem } from "./types";

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ChevronLeftIcon({ className }: { className?: string }) {
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
      <path d="m15 18-6-6 6-6" />
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

// ---------------------------------------------------------------------------
// TransferPanel
// ---------------------------------------------------------------------------

interface TransferPanelProps {
  direction: "left" | "right";
  title: React.ReactNode;
  items: TransferItem[];
  selectedKeys: string[];
  onSelectAll: (checked: boolean) => void;
  onSelect: (key: string, checked: boolean) => void;
  showSearch: boolean;
  searchValue: string;
  onSearch: (value: string) => void;
  render?: (item: TransferItem) => React.ReactNode;
  disabled: boolean;
  listStyle?: React.CSSProperties;
  pagination?: boolean | { pageSize?: number };
  selectAllLabel?: (info: {
    selectedCount: number;
    totalCount: number;
  }) => React.ReactNode;
}

const TransferPanel: React.FC<TransferPanelProps> = ({
  title,
  items,
  selectedKeys,
  onSelectAll,
  onSelect,
  showSearch,
  searchValue,
  onSearch,
  render,
  disabled,
  listStyle,
  pagination,
  selectAllLabel,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const enabledItems = items.filter((i) => !i.disabled);
  const allSelected =
    enabledItems.length > 0 &&
    enabledItems.every((i) => selectedKeys.includes(i.key));
  const someSelected =
    enabledItems.some((i) => selectedKeys.includes(i.key)) && !allSelected;

  // Filter by search
  const filteredItems = React.useMemo(() => {
    if (!searchValue) return items;
    const lower = searchValue.toLowerCase();
    return items.filter(
      (item) =>
        (item.title?.toLowerCase() ?? "").includes(lower) ||
        (item.description?.toLowerCase() ?? "").includes(lower),
    );
  }, [items, searchValue]);

  // Pagination
  const pageSize =
    pagination === true
      ? 10
      : typeof pagination === "object"
        ? pagination.pageSize ?? 10
        : 0;
  const totalPages = pageSize > 0 ? Math.ceil(filteredItems.length / pageSize) : 1;
  const displayItems =
    pageSize > 0
      ? filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      : filteredItems;

  // Reset page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);

  const selectedCount = selectedKeys.length;
  const totalCount = items.length;

  return (
    <div
      className="flex w-56 flex-col overflow-hidden rounded-lg border border-border"
      style={listStyle}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-3 py-2">
        <input
          type="checkbox"
          className="size-4 rounded border-input accent-primary"
          checked={allSelected}
          ref={(el) => {
            if (el) el.indeterminate = someSelected;
          }}
          onChange={(e) => onSelectAll(e.target.checked)}
          disabled={disabled}
        />
        <span className="flex-1 text-sm font-medium">
          {selectAllLabel
            ? selectAllLabel({ selectedCount, totalCount })
            : `${selectedCount > 0 ? `${selectedCount}/` : ""}${totalCount} items`}
        </span>
        <span className="text-xs text-muted-foreground">{title}</span>
      </div>

      {/* Search */}
      {showSearch && (
        <div className="border-b border-border px-2 py-1.5">
          <div className="flex items-center gap-1.5 rounded-md border border-input px-2 py-1">
            <SearchIcon className="size-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search here"
              className="min-w-0 flex-1 border-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              disabled={disabled}
            />
          </div>
        </div>
      )}

      {/* Item list */}
      <div className="flex-1 overflow-y-auto px-1 py-1" style={{ maxHeight: 300 }}>
        {displayItems.length === 0 ? (
          <div className="px-2 py-8 text-center text-sm text-muted-foreground">
            No data
          </div>
        ) : (
          displayItems.map((item) => {
            const isChecked = selectedKeys.includes(item.key);
            const isDisabled = disabled || item.disabled;
            return (
              <label
                key={item.key}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-muted/50",
                  isDisabled && "cursor-not-allowed opacity-50",
                )}
              >
                <input
                  type="checkbox"
                  className="size-4 rounded border-input accent-primary"
                  checked={isChecked}
                  onChange={(e) => onSelect(item.key, e.target.checked)}
                  disabled={isDisabled}
                />
                <span className="min-w-0 flex-1 truncate text-sm">
                  {render ? render(item) : item.title ?? item.key}
                </span>
              </label>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {pageSize > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 border-t border-border px-2 py-1.5">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <span className="text-xs text-muted-foreground">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// InternalTransfer
// ---------------------------------------------------------------------------

const InternalTransfer: React.FC<TransferProps> = ({
  dataSource = [],
  targetKeys: targetKeysProp,
  selectedKeys: selectedKeysProp,
  onChange,
  onSelectChange,
  onSearch,
  render,
  showSearch = false,
  titles = ["Source", "Target"],
  operations = ["", ""],
  disabled = false,
  listStyle: listStyleProp,
  pagination = false,
  oneWay = false,
  selectAllLabels,
  className,
  style,
}) => {
  // Target keys state
  const [internalTargetKeys, setInternalTargetKeys] = React.useState<string[]>(
    [],
  );
  const targetKeys = targetKeysProp ?? internalTargetKeys;

  // Selected keys state
  const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<
    string[]
  >([]);
  const allSelectedKeys = selectedKeysProp ?? internalSelectedKeys;

  // Search state
  const [leftSearch, setLeftSearch] = React.useState("");
  const [rightSearch, setRightSearch] = React.useState("");

  // Split items
  const targetKeySet = React.useMemo(() => new Set(targetKeys), [targetKeys]);

  const sourceItems = React.useMemo(
    () => dataSource.filter((item) => !targetKeySet.has(item.key)),
    [dataSource, targetKeySet],
  );
  const targetItems = React.useMemo(
    () => dataSource.filter((item) => targetKeySet.has(item.key)),
    [dataSource, targetKeySet],
  );

  // Split selected keys by direction
  const sourceSelectedKeys = React.useMemo(
    () =>
      allSelectedKeys.filter(
        (key) => !targetKeySet.has(key),
      ),
    [allSelectedKeys, targetKeySet],
  );
  const targetSelectedKeys = React.useMemo(
    () =>
      allSelectedKeys.filter(
        (key) => targetKeySet.has(key),
      ),
    [allSelectedKeys, targetKeySet],
  );

  const resolveListStyle = React.useCallback(
    (direction: "left" | "right") => {
      if (typeof listStyleProp === "function") {
        return listStyleProp({ direction });
      }
      return listStyleProp;
    },
    [listStyleProp],
  );

  // Handlers
  const handleSelect = React.useCallback(
    (key: string, checked: boolean) => {
      let newSelected: string[];
      if (checked) {
        newSelected = [...allSelectedKeys, key];
      } else {
        newSelected = allSelectedKeys.filter((k) => k !== key);
      }
      if (selectedKeysProp === undefined) {
        setInternalSelectedKeys(newSelected);
      }
      const newSourceSelected = newSelected.filter(
        (k) => !targetKeySet.has(k),
      );
      const newTargetSelected = newSelected.filter((k) =>
        targetKeySet.has(k),
      );
      onSelectChange?.(newSourceSelected, newTargetSelected);
    },
    [allSelectedKeys, selectedKeysProp, targetKeySet, onSelectChange],
  );

  const handleSelectAll = React.useCallback(
    (direction: "left" | "right", checked: boolean) => {
      const items = direction === "left" ? sourceItems : targetItems;
      const enabledKeys = items
        .filter((i) => !i.disabled)
        .map((i) => i.key);
      const otherSelected =
        direction === "left" ? targetSelectedKeys : sourceSelectedKeys;
      const newSelected = checked
        ? [...otherSelected, ...enabledKeys]
        : [...otherSelected];
      if (selectedKeysProp === undefined) {
        setInternalSelectedKeys(newSelected);
      }
      const newSourceSelected = newSelected.filter(
        (k) => !targetKeySet.has(k),
      );
      const newTargetSelected = newSelected.filter((k) =>
        targetKeySet.has(k),
      );
      onSelectChange?.(newSourceSelected, newTargetSelected);
    },
    [
      sourceItems,
      targetItems,
      sourceSelectedKeys,
      targetSelectedKeys,
      selectedKeysProp,
      targetKeySet,
      onSelectChange,
    ],
  );

  const moveToRight = React.useCallback(() => {
    const moveKeys = sourceSelectedKeys.filter((key) => {
      const item = dataSource.find((i) => i.key === key);
      return item && !item.disabled;
    });
    if (moveKeys.length === 0) return;

    const newTargetKeys = [...targetKeys, ...moveKeys];
    if (targetKeysProp === undefined) {
      setInternalTargetKeys(newTargetKeys);
    }
    onChange?.(newTargetKeys, "right", moveKeys);

    // Clear moved items from selection
    const newSelected = allSelectedKeys.filter(
      (k) => !moveKeys.includes(k),
    );
    if (selectedKeysProp === undefined) {
      setInternalSelectedKeys(newSelected);
    }
  }, [
    sourceSelectedKeys,
    dataSource,
    targetKeys,
    targetKeysProp,
    onChange,
    allSelectedKeys,
    selectedKeysProp,
  ]);

  const moveToLeft = React.useCallback(() => {
    const moveKeys = targetSelectedKeys.filter((key) => {
      const item = dataSource.find((i) => i.key === key);
      return item && !item.disabled;
    });
    if (moveKeys.length === 0) return;

    const moveKeySet = new Set(moveKeys);
    const newTargetKeys = targetKeys.filter((k) => !moveKeySet.has(k));
    if (targetKeysProp === undefined) {
      setInternalTargetKeys(newTargetKeys);
    }
    onChange?.(newTargetKeys, "left", moveKeys);

    // Clear moved items from selection
    const newSelected = allSelectedKeys.filter(
      (k) => !moveKeys.includes(k),
    );
    if (selectedKeysProp === undefined) {
      setInternalSelectedKeys(newSelected);
    }
  }, [
    targetSelectedKeys,
    dataSource,
    targetKeys,
    targetKeysProp,
    onChange,
    allSelectedKeys,
    selectedKeysProp,
  ]);

  const handleSearchChange = React.useCallback(
    (direction: "left" | "right", value: string) => {
      if (direction === "left") {
        setLeftSearch(value);
      } else {
        setRightSearch(value);
      }
      onSearch?.(direction, value);
    },
    [onSearch],
  );

  return (
    <div
      className={cn("inline-flex items-center gap-2", className)}
      style={style}
    >
      {/* Left panel (source) */}
      <TransferPanel
        direction="left"
        title={titles[0]}
        items={sourceItems}
        selectedKeys={sourceSelectedKeys}
        onSelectAll={(checked) => handleSelectAll("left", checked)}
        onSelect={handleSelect}
        showSearch={showSearch}
        searchValue={leftSearch}
        onSearch={(v) => handleSearchChange("left", v)}
        render={render}
        disabled={disabled}
        listStyle={resolveListStyle("left")}
        pagination={pagination}
        selectAllLabel={selectAllLabels?.[0]}
      />

      {/* Action buttons */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          disabled={disabled || sourceSelectedKeys.length === 0}
          onClick={moveToRight}
          className={cn(
            "inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          {operations[1] && (
            <span>{operations[1]}</span>
          )}
          <ChevronRightIcon className="size-3.5" />
        </button>
        {!oneWay && (
          <button
            type="button"
            disabled={disabled || targetSelectedKeys.length === 0}
            onClick={moveToLeft}
            className={cn(
              "inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            <ChevronLeftIcon className="size-3.5" />
            {operations[0] && (
              <span>{operations[0]}</span>
            )}
          </button>
        )}
      </div>

      {/* Right panel (target) */}
      <TransferPanel
        direction="right"
        title={titles[1]}
        items={targetItems}
        selectedKeys={targetSelectedKeys}
        onSelectAll={(checked) => handleSelectAll("right", checked)}
        onSelect={handleSelect}
        showSearch={showSearch}
        searchValue={rightSearch}
        onSearch={(v) => handleSearchChange("right", v)}
        render={render}
        disabled={disabled}
        listStyle={resolveListStyle("right")}
        pagination={pagination}
        selectAllLabel={selectAllLabels?.[1]}
      />
    </div>
  );
};

InternalTransfer.displayName = "Transfer";

export { InternalTransfer };
