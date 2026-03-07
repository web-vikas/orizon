import { InternalTable } from "./Table";

/**
 * Table component for displaying structured data with sorting,
 * pagination, row selection, and expandable rows.
 *
 * @example
 * ```tsx
 * <Table
 *   columns={[{ title: "Name", dataIndex: "name" }]}
 *   dataSource={[{ key: "1", name: "John" }]}
 * />
 * ```
 */
const Table = InternalTable;

export { Table };
export type {
  TableProps,
  ColumnType,
  SortOrder,
  SorterResult,
  PaginationConfig,
  RowSelection,
  RowSelectionType,
  ExpandableConfig,
  ScrollConfig,
  TableSize,
  FilterItem,
  FixedType,
  AlignType,
} from "./types";
