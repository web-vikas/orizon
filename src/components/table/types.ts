/**
 * @file Table component type definitions.
 *
 * Comprehensive type system for the data-table component including
 * column definitions, pagination, row selection, expandable rows,
 * scroll configuration, sorting, and filtering.
 *
 * @see {@link ./Table.tsx} for the implementation.
 * @see {@link ./index.ts} for the public export.
 */
import type { ReactNode, Key, CSSProperties } from "react";

// ---------------------------------------------------------------------------
// Column Types
// ---------------------------------------------------------------------------

export type SortOrder = "ascend" | "descend" | null;
export type FixedType = "left" | "right" | boolean;
export type AlignType = "left" | "center" | "right";

export interface FilterItem {
  text: ReactNode;
  value: string | number | boolean;
  children?: FilterItem[];
}

export interface ColumnType<T = unknown> {
  /** Column title */
  title?: ReactNode;
  /** Data index for accessing nested data */
  dataIndex?: string | string[];
  /** Unique key for this column */
  key?: Key;
  /** Column width */
  width?: number | string;
  /** Min width */
  minWidth?: number;
  /** Custom render function */
  render?: (value: unknown, record: T, index: number) => ReactNode;
  /** Sorter function or true for default */
  sorter?: boolean | ((a: T, b: T) => number);
  /** Default sort order */
  defaultSortOrder?: SortOrder;
  /** Sort directions */
  sortDirections?: SortOrder[];
  /** Filter items */
  filters?: FilterItem[];
  /** Filter function */
  onFilter?: (value: string | number | boolean, record: T) => boolean;
  /** Fixed column */
  fixed?: FixedType;
  /** Text alignment */
  align?: AlignType;
  /** Show ellipsis for overflowing text */
  ellipsis?: boolean | { showTitle?: boolean };
  /** Column className */
  className?: string;
  /** Whether column is hidden */
  hidden?: boolean;
  /** onCell callback */
  onCell?: (record: T, index: number) => React.HTMLAttributes<HTMLTableCellElement>;
  /** onHeaderCell callback */
  onHeaderCell?: () => React.HTMLAttributes<HTMLTableCellElement>;
  /** Child columns for grouped headers */
  children?: ColumnType<T>[];
}

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

export interface PaginationConfig {
  current?: number;
  pageSize?: number;
  total?: number;
  defaultCurrent?: number;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => ReactNode;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  position?: ("topLeft" | "topRight" | "bottomLeft" | "bottomRight")[];
  simple?: boolean;
  size?: "default" | "small";
}

// ---------------------------------------------------------------------------
// Row Selection
// ---------------------------------------------------------------------------

export type RowSelectionType = "checkbox" | "radio";

export interface RowSelection<T = unknown> {
  type?: RowSelectionType;
  selectedRowKeys?: Key[];
  onChange?: (selectedRowKeys: Key[], selectedRows: T[]) => void;
  onSelect?: (record: T, selected: boolean, selectedRows: T[]) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  getCheckboxProps?: (record: T) => Partial<{ disabled: boolean; name: string }>;
  columnWidth?: number | string;
  columnTitle?: ReactNode;
  fixed?: FixedType;
  hideSelectAll?: boolean;
}

// ---------------------------------------------------------------------------
// Expandable
// ---------------------------------------------------------------------------

export interface ExpandableConfig<T = unknown> {
  expandedRowRender?: (record: T, index: number, indent: number, expanded: boolean) => ReactNode;
  expandedRowKeys?: Key[];
  defaultExpandedRowKeys?: Key[];
  onExpand?: (expanded: boolean, record: T) => void;
  onExpandedRowsChange?: (expandedKeys: Key[]) => void;
  expandIcon?: (props: { expanded: boolean; onExpand: () => void; record: T }) => ReactNode;
  expandRowByClick?: boolean;
  indentSize?: number;
  columnWidth?: number | string;
  fixed?: FixedType;
  showExpandColumn?: boolean;
  rowExpandable?: (record: T) => boolean;
}

// ---------------------------------------------------------------------------
// Scroll
// ---------------------------------------------------------------------------

export interface ScrollConfig {
  x?: number | string | true;
  y?: number | string;
  scrollToFirstRowOnChange?: boolean;
}

// ---------------------------------------------------------------------------
// TableProps
// ---------------------------------------------------------------------------

export type TableSize = "large" | "middle" | "small";

export interface SorterResult<T = unknown> {
  column?: ColumnType<T>;
  order?: SortOrder;
  field?: string | string[];
  columnKey?: Key;
}

export interface TableProps<T = unknown> {
  /** Column definitions */
  columns?: ColumnType<T>[];
  /** Data source */
  dataSource?: T[];
  /** Row key */
  rowKey?: string | ((record: T) => Key);
  /** Loading state */
  loading?: boolean | { spinning?: boolean; tip?: ReactNode };
  /** Table size */
  size?: TableSize;
  /** Pagination config or false to disable */
  pagination?: PaginationConfig | false;
  /** Row selection config */
  rowSelection?: RowSelection<T>;
  /** Scroll config */
  scroll?: ScrollConfig;
  /** Whether to show bordered */
  bordered?: boolean;
  /** Callback for sort, filter, pagination changes */
  onChange?: (
    pagination: PaginationConfig,
    filters: Record<string, (string | number | boolean)[] | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
  ) => void;
  /** Allowed sort directions */
  sortDirections?: SortOrder[];
  /** Expandable config */
  expandable?: ExpandableConfig<T>;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  /** Table title */
  title?: (currentPageData: T[]) => ReactNode;
  /** Table footer */
  footer?: (currentPageData: T[]) => ReactNode;
  /** Row className */
  rowClassName?: string | ((record: T, index: number) => string);
  /** onRow callback */
  onRow?: (record: T, index: number) => React.HTMLAttributes<HTMLTableRowElement>;
  /** Show table header */
  showHeader?: boolean;
  /** Empty text */
  locale?: { emptyText?: ReactNode };
  /** Sticky header */
  sticky?: boolean;
}
