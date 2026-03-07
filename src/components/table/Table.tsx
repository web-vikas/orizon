"use client";

import * as React from "react";
import {
  Table as ShadcnTable,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/primitives/table";
import { Skeleton } from "@/primitives/skeleton";
import { cn } from "@/lib/utils";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  ChevronLeftIcon,
} from "lucide-react";
import type {
  TableProps,
  ColumnType,
  SortOrder,
  SorterResult,
  PaginationConfig,
  TableSize,
} from "./types";
import type { Key, ReactNode } from "react";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getRowKey<T>(record: T, rowKey: string | ((record: T) => Key), index: number): Key {
  if (typeof rowKey === "function") return rowKey(record);
  if (typeof rowKey === "string") return (record as Record<string, unknown>)[rowKey] as Key;
  return index;
}

function getValueByDataIndex<T>(record: T, dataIndex?: string | string[]): unknown {
  if (!dataIndex) return undefined;
  if (typeof dataIndex === "string") {
    return (record as Record<string, unknown>)[dataIndex];
  }
  let value: unknown = record;
  for (const key of dataIndex) {
    if (value == null) return undefined;
    value = (value as Record<string, unknown>)[key];
  }
  return value;
}

const SIZE_CLASSES: Record<TableSize, string> = {
  large: "[&_th]:h-12 [&_th]:px-4 [&_td]:px-4 [&_td]:py-3",
  middle: "[&_th]:h-10 [&_th]:px-3 [&_td]:px-3 [&_td]:py-2",
  small: "[&_th]:h-8 [&_th]:px-2 [&_td]:px-2 [&_td]:py-1 text-xs",
};

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

function TablePagination({
  pagination,
  total,
  onChange,
}: {
  pagination: PaginationConfig;
  total: number;
  onChange: (page: number, pageSize: number) => void;
}) {
  const {
    current = 1,
    pageSize = 10,
    showTotal,
    showSizeChanger,
    pageSizeOptions = [10, 20, 50, 100],
    showQuickJumper,
    simple,
    size: paginationSize,
  } = pagination;

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [jumpValue, setJumpValue] = React.useState("");

  const range: [number, number] = [
    Math.min((current - 1) * pageSize + 1, total),
    Math.min(current * pageSize, total),
  ];

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push("ellipsis");
      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (current < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  const isSmall = paginationSize === "small";

  return (
    <div className="flex items-center justify-between gap-4 px-2 py-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {showTotal && showTotal(total, range)}
      </div>
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          className={cn(
            "inline-flex items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50",
            isSmall ? "size-7" : "size-8",
          )}
          disabled={current <= 1}
          onClick={() => onChange(current - 1, pageSize)}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="size-4" />
        </button>

        {!simple &&
          getPageNumbers().map((page, i) =>
            page === "ellipsis" ? (
              <span key={`e-${i}`} className="flex size-8 items-center justify-center text-muted-foreground">
                ...
              </span>
            ) : (
              <button
                key={page}
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
                  isSmall ? "size-7" : "size-8",
                  page === current
                    ? "border border-primary bg-primary text-primary-foreground"
                    : "border border-input bg-background hover:bg-muted",
                )}
                onClick={() => onChange(page, pageSize)}
              >
                {page}
              </button>
            ),
          )}

        {simple && (
          <span className="flex items-center gap-1 text-sm">
            <span className="font-medium">{current}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{totalPages}</span>
          </span>
        )}

        {/* Next */}
        <button
          className={cn(
            "inline-flex items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50",
            isSmall ? "size-7" : "size-8",
          )}
          disabled={current >= totalPages}
          onClick={() => onChange(current + 1, pageSize)}
          aria-label="Next page"
        >
          <ChevronRightIcon className="size-4" />
        </button>

        {/* Size changer */}
        {showSizeChanger && (
          <select
            className="ml-2 h-8 rounded-md border border-input bg-background px-2 text-sm"
            value={pageSize}
            onChange={(e) => onChange(1, Number(e.target.value))}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt} / page
              </option>
            ))}
          </select>
        )}

        {/* Quick jumper */}
        {showQuickJumper && (
          <div className="ml-2 flex items-center gap-1 text-sm">
            <span>Go to</span>
            <input
              className="h-8 w-12 rounded-md border border-input bg-background px-2 text-center text-sm"
              value={jumpValue}
              onChange={(e) => setJumpValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const val = Number(jumpValue);
                  if (!isNaN(val) && val >= 1 && val <= totalPages) {
                    onChange(val, pageSize);
                    setJumpValue("");
                  }
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// InternalTable
// ---------------------------------------------------------------------------

function InternalTable<T extends Record<string, unknown> = Record<string, unknown>>(
  props: TableProps<T>,
) {
  const {
    columns = [],
    dataSource = [],
    rowKey = "key",
    loading = false,
    size: sizeProp,
    pagination: paginationProp,
    rowSelection,
    scroll,
    bordered = false,
    onChange,
    sortDirections: globalSortDirections = ["ascend", "descend", null],
    expandable,
    className,
    style,
    title,
    footer,
    rowClassName,
    onRow,
    showHeader = true,
    locale,
    sticky = false,
  } = props;

  const resolvedSize = sizeProp ?? "middle";

  // ---- Sort state ----
  const [sortState, setSortState] = React.useState<{
    key?: Key;
    order: SortOrder;
  }>(() => {
    for (const col of columns) {
      if (col.defaultSortOrder) {
        return { key: col.key ?? (col.dataIndex as string), order: col.defaultSortOrder };
      }
    }
    return { key: undefined, order: null };
  });

  // ---- Filter state ----
  const [filterState] = React.useState<
    Record<string, (string | number | boolean)[] | null>
  >({});
  const hasPagination = paginationProp !== false;

  const [internalPage, setInternalPage] = React.useState(
    (paginationProp && typeof paginationProp === "object" && paginationProp.defaultCurrent) || 1,
  );
  const [internalPageSize, setInternalPageSize] = React.useState(
    (paginationProp && typeof paginationProp === "object" && paginationProp.defaultPageSize) || 10,
  );

  const paginationConfig: PaginationConfig | false = hasPagination
    ? {
        ...(typeof paginationProp === "object" ? paginationProp : {}),
        current:
          typeof paginationProp === "object" && paginationProp.current != null
            ? paginationProp.current
            : internalPage,
        pageSize:
          typeof paginationProp === "object" && paginationProp.pageSize != null
            ? paginationProp.pageSize
            : internalPageSize,
      }
    : false;

  // ---- Selection state ----
  const [selectedKeys, setSelectedKeys] = React.useState<Key[]>(
    rowSelection?.selectedRowKeys ?? [],
  );
  React.useEffect(() => {
    if (rowSelection?.selectedRowKeys) {
      setSelectedKeys(rowSelection.selectedRowKeys);
    }
  }, [rowSelection?.selectedRowKeys]);

  // ---- Expand state ----
  const [expandedKeys, setExpandedKeys] = React.useState<Key[]>(
    expandable?.expandedRowKeys ?? expandable?.defaultExpandedRowKeys ?? [],
  );
  React.useEffect(() => {
    if (expandable?.expandedRowKeys) {
      setExpandedKeys(expandable.expandedRowKeys);
    }
  }, [expandable?.expandedRowKeys]);

  // ---- Process data: filter, sort, paginate ----
  const processedData = React.useMemo(() => {
    let data = [...dataSource];

    // Apply filters
    for (const col of columns) {
      const colKey = String(col.key ?? col.dataIndex ?? "");
      const filterValues = filterState[colKey];
      if (filterValues && filterValues.length > 0 && col.onFilter) {
        data = data.filter((record) =>
          filterValues.some((val) => col.onFilter!(val, record)),
        );
      }
    }

    // Apply sort
    if (sortState.key && sortState.order) {
      const sortCol = columns.find(
        (c) => (c.key ?? c.dataIndex) === sortState.key,
      );
      if (sortCol && typeof sortCol.sorter === "function") {
        const multiplier = sortState.order === "ascend" ? 1 : -1;
        data.sort((a, b) => multiplier * (sortCol.sorter as (a: T, b: T) => number)(a, b));
      } else if (sortCol && sortCol.sorter === true) {
        const di = sortCol.dataIndex;
        const multiplier = sortState.order === "ascend" ? 1 : -1;
        data.sort((a, b) => {
          const va = String(getValueByDataIndex(a, di) ?? "");
          const vb = String(getValueByDataIndex(b, di) ?? "");
          return multiplier * va.localeCompare(vb);
        });
      }
    }

    return data;
  }, [dataSource, columns, filterState, sortState]);

  const totalRecords =
    (typeof paginationProp === "object" && paginationProp.total) || processedData.length;

  // ---- Paginated data ----
  const paginatedData = React.useMemo(() => {
    if (!hasPagination || paginationConfig === false) return processedData;
    const { current = 1, pageSize = 10 } = paginationConfig;

    // If total is externally provided and doesn't match dataSource length,
    // assume data is already paginated server-side
    if (typeof paginationProp === "object" && paginationProp.total != null && paginationProp.total !== processedData.length) {
      return processedData;
    }

    const start = (current - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, paginationConfig, hasPagination, paginationProp]);

  // ---- Visible columns ----
  const visibleColumns = React.useMemo(
    () => columns.filter((col) => !col.hidden),
    [columns],
  );

  // ---- Handlers ----
  const handleSort = (col: ColumnType<T>) => {
    const colKey = col.key ?? (col.dataIndex as string);
    const directions = col.sortDirections ?? globalSortDirections;
    const currentIdx = directions.indexOf(sortState.key === colKey ? sortState.order : null);
    const nextOrder = directions[(currentIdx + 1) % directions.length] ?? null;

    const newSortState = { key: colKey, order: nextOrder };
    setSortState(newSortState);

    const sorterResult: SorterResult<T> = {
      column: col,
      order: nextOrder,
      field: col.dataIndex,
      columnKey: colKey,
    };

    onChange?.(
      paginationConfig || {},
      filterState,
      sorterResult,
    );
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setInternalPage(page);
    setInternalPageSize(pageSize);

    if (typeof paginationProp === "object") {
      paginationProp.onChange?.(page, pageSize);
    }

    onChange?.(
      { ...(paginationConfig || {}), current: page, pageSize },
      filterState,
      { order: sortState.order, field: undefined, columnKey: sortState.key },
    );
  };

  const handleSelectRow = (record: T, key: Key) => {
    const isRadio = rowSelection?.type === "radio";
    let newKeys: Key[];
    let selected: boolean;

    if (isRadio) {
      newKeys = [key];
      selected = true;
    } else {
      if (selectedKeys.includes(key)) {
        newKeys = selectedKeys.filter((k) => k !== key);
        selected = false;
      } else {
        newKeys = [...selectedKeys, key];
        selected = true;
      }
    }

    setSelectedKeys(newKeys);
    const selectedRows = dataSource.filter((r, i) =>
      newKeys.includes(getRowKey(r, rowKey, i)),
    );
    rowSelection?.onChange?.(newKeys, selectedRows);
    rowSelection?.onSelect?.(record, selected, selectedRows);
  };

  const handleSelectAll = (checked: boolean) => {
    let newKeys: Key[];
    if (checked) {
      newKeys = dataSource.map((r, i) => getRowKey(r, rowKey, i));
    } else {
      newKeys = [];
    }
    setSelectedKeys(newKeys);
    const selectedRows = checked ? [...dataSource] : [];
    const changeRows = checked
      ? dataSource.filter((r, i) => !selectedKeys.includes(getRowKey(r, rowKey, i)))
      : dataSource.filter((r, i) => selectedKeys.includes(getRowKey(r, rowKey, i)));
    rowSelection?.onChange?.(newKeys, selectedRows);
    rowSelection?.onSelectAll?.(checked, selectedRows, changeRows);
  };

  const handleExpand = (record: T, key: Key) => {
    const isExpanded = expandedKeys.includes(key);
    const newKeys = isExpanded
      ? expandedKeys.filter((k) => k !== key)
      : [...expandedKeys, key];
    setExpandedKeys(newKeys);
    expandable?.onExpand?.(!isExpanded, record);
    expandable?.onExpandedRowsChange?.(newKeys);
  };

  // ---- Loading state ----
  const isLoading = typeof loading === "boolean" ? loading : loading?.spinning ?? false;
  const loadingTip = typeof loading === "object" ? loading.tip : undefined;

  // ---- Compute column count for spanning ----
  const totalColCount =
    visibleColumns.length +
    (rowSelection ? 1 : 0) +
    (expandable?.showExpandColumn !== false && expandable?.expandedRowRender ? 1 : 0);

  // ---- Render ----
  const tableContent = (
    <div className="relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60">
          <div className="flex flex-col items-center gap-2">
            <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            {loadingTip && <span className="text-sm text-muted-foreground">{loadingTip}</span>}
          </div>
        </div>
      )}

      <div
        className={cn(scroll?.x && "overflow-x-auto", scroll?.y && "overflow-y-auto")}
        style={{
          maxHeight: scroll?.y,
        }}
      >
        <ShadcnTable
          className={cn(
            SIZE_CLASSES[resolvedSize],
            bordered && "border [&_td]:border [&_th]:border",
            className,
          )}
          style={{
            minWidth: scroll?.x === true ? "100%" : scroll?.x,
            ...style,
          }}
        >
          {showHeader && (
            <TableHeader className={cn(sticky && "sticky top-0 z-[5] bg-background")}>
              <TableRow>
                {/* Selection column header */}
                {rowSelection && (
                  <TableHead
                    style={{ width: rowSelection.columnWidth ?? 48 }}
                    className="text-center"
                  >
                    {rowSelection.columnTitle ??
                      (rowSelection.type !== "radio" && !rowSelection.hideSelectAll && (
                        <input
                          type="checkbox"
                          className="size-4 rounded border-input accent-primary"
                          checked={
                            dataSource.length > 0 &&
                            selectedKeys.length === dataSource.length
                          }
                          ref={(el) => {
                            if (el) {
                              el.indeterminate =
                                selectedKeys.length > 0 &&
                                selectedKeys.length < dataSource.length;
                            }
                          }}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      ))}
                  </TableHead>
                )}

                {/* Expand column header */}
                {expandable?.showExpandColumn !== false && expandable?.expandedRowRender && (
                  <TableHead
                    style={{ width: expandable.columnWidth ?? 48 }}
                    className="text-center"
                  />
                )}

                {/* Data columns */}
                {visibleColumns.map((col, colIdx) => {
                  const colKey = String(col.key ?? col.dataIndex ?? colIdx);
                  const isSortable = !!col.sorter;
                  const isSorted = sortState.key === (col.key ?? col.dataIndex);
                  const sortOrder = isSorted ? sortState.order : null;
                  const headerProps = col.onHeaderCell?.() ?? {};

                  return (
                    <TableHead
                      key={colKey}
                      style={{
                        width: col.width,
                        minWidth: col.minWidth,
                        textAlign: col.align,
                        ...(col.fixed
                          ? {
                              position: "sticky",
                              [col.fixed === "right" ? "right" : "left"]: 0,
                              zIndex: 2,
                              background: "var(--color-background, white)",
                            }
                          : {}),
                      }}
                      className={cn(
                        isSortable && "cursor-pointer select-none",
                        col.className,
                      )}
                      onClick={isSortable ? () => handleSort(col) : undefined}
                      {...headerProps}
                    >
                      <div className="flex items-center gap-1">
                        <span className={cn(col.align === "right" && "ml-auto")}>
                          {col.title}
                        </span>
                        {isSortable && (
                          <span className="ml-1 inline-flex flex-col">
                            {sortOrder === "ascend" ? (
                              <ChevronUpIcon className="size-3.5 text-primary" />
                            ) : sortOrder === "descend" ? (
                              <ChevronDownIcon className="size-3.5 text-primary" />
                            ) : (
                              <ChevronsUpDownIcon className="size-3.5 text-muted-foreground" />
                            )}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
          )}

          <TableBody>
            {paginatedData.length === 0 && !isLoading ? (
              <TableRow>
                <TableCell colSpan={totalColCount} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center gap-1 py-8 text-muted-foreground">
                    {locale?.emptyText ?? "No data"}
                  </div>
                </TableCell>
              </TableRow>
            ) : isLoading && paginatedData.length === 0 ? (
              // Show skeleton rows when loading with no data
              Array.from({ length: 3 }).map((_, rowIdx) => (
                <TableRow key={`skeleton-${rowIdx}`}>
                  {Array.from({ length: totalColCount }).map((_, cellIdx) => (
                    <TableCell key={cellIdx}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              paginatedData.map((record, rowIdx) => {
                const key = getRowKey(record, rowKey, rowIdx);
                const isSelected = selectedKeys.includes(key);
                const isExpanded = expandedKeys.includes(key);
                const rowProps = onRow?.(record, rowIdx) ?? {};
                const rowCls =
                  typeof rowClassName === "function"
                    ? rowClassName(record, rowIdx)
                    : rowClassName;

                const isExpandable =
                  expandable?.expandedRowRender &&
                  (expandable.rowExpandable?.(record) ?? true);

                return (
                  <React.Fragment key={key}>
                    <TableRow
                      data-state={isSelected ? "selected" : undefined}
                      className={cn(rowCls)}
                      onClick={
                        expandable?.expandRowByClick && isExpandable
                          ? () => handleExpand(record, key)
                          : undefined
                      }
                      {...rowProps}
                    >
                      {/* Selection cell */}
                      {rowSelection && (
                        <TableCell className="text-center">
                          <input
                            type={rowSelection.type === "radio" ? "radio" : "checkbox"}
                            className="size-4 rounded border-input accent-primary"
                            checked={isSelected}
                            onChange={() => handleSelectRow(record, key)}
                            {...rowSelection.getCheckboxProps?.(record)}
                          />
                        </TableCell>
                      )}

                      {/* Expand cell */}
                      {expandable?.showExpandColumn !== false &&
                        expandable?.expandedRowRender && (
                          <TableCell className="text-center">
                            {isExpandable &&
                              (expandable.expandIcon ? (
                                expandable.expandIcon({
                                  expanded: isExpanded,
                                  onExpand: () => handleExpand(record, key),
                                  record,
                                })
                              ) : (
                                <button
                                  className="inline-flex size-6 items-center justify-center rounded transition-transform"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleExpand(record, key);
                                  }}
                                >
                                  <ChevronRightIcon
                                    className={cn(
                                      "size-4 transition-transform",
                                      isExpanded && "rotate-90",
                                    )}
                                  />
                                </button>
                              ))}
                          </TableCell>
                        )}

                      {/* Data cells */}
                      {visibleColumns.map((col, colIdx) => {
                        const colKey = String(col.key ?? col.dataIndex ?? colIdx);
                        const value = getValueByDataIndex(record, col.dataIndex);
                        const cellContent = col.render
                          ? col.render(value, record, rowIdx)
                          : (value as ReactNode);
                        const cellProps = col.onCell?.(record, rowIdx) ?? {};

                        return (
                          <TableCell
                            key={colKey}
                            style={{
                              textAlign: col.align,
                              ...(col.fixed
                                ? {
                                    position: "sticky",
                                    [col.fixed === "right" ? "right" : "left"]: 0,
                                    zIndex: 1,
                                    background: "var(--color-background, white)",
                                  }
                                : {}),
                            }}
                            className={cn(
                              col.ellipsis && "max-w-0 truncate",
                              col.className,
                            )}
                            title={
                              col.ellipsis &&
                              typeof col.ellipsis !== "object" &&
                              typeof value === "string"
                                ? value
                                : undefined
                            }
                            {...cellProps}
                          >
                            {cellContent}
                          </TableCell>
                        );
                      })}
                    </TableRow>

                    {/* Expanded row */}
                    {isExpandable && isExpanded && (
                      <TableRow>
                        <TableCell colSpan={totalColCount} className="bg-muted/30 p-4">
                          {expandable!.expandedRowRender!(
                            record,
                            rowIdx,
                            expandable!.indentSize ?? 15,
                            true,
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </ShadcnTable>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {title && (
        <div className="border-b px-4 py-3 text-sm font-medium">
          {title(paginatedData)}
        </div>
      )}

      {tableContent}

      {footer && (
        <div className="border-t px-4 py-3 text-sm">
          {footer(paginatedData)}
        </div>
      )}

      {hasPagination && paginationConfig !== false && (
        <TablePagination
          pagination={paginationConfig}
          total={totalRecords}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}

InternalTable.displayName = "Table";

export { InternalTable };
