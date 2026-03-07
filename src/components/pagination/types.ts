/**
 * @file Pagination component type definitions.
 *
 * Exports props for the `<Pagination>` component including controlled/
 * uncontrolled page state, size changer, quick jumper, and show-total.
 *
 * @see ./Pagination.tsx - component implementation
 * @see ./index.ts       - public export
 */
import type { ReactNode } from "react";

export type PaginationSize = "small" | "default";

export interface PaginationProps {
  /** Current page number (controlled) */
  current?: number;
  /** Default current page (uncontrolled) */
  defaultCurrent?: number;
  /** Number of items per page */
  pageSize?: number;
  /** Default page size (uncontrolled) */
  defaultPageSize?: number;
  /** Total number of data items */
  total: number;
  /** Show a page size select */
  showSizeChanger?: boolean;
  /** Available page sizes for the size changer */
  pageSizeOptions?: number[];
  /** Show a quick jumper input */
  showQuickJumper?: boolean;
  /** Show total count; can be a render function */
  showTotal?: (total: number, range: [number, number]) => ReactNode;
  /** Simple mode (no page numbers) */
  simple?: boolean;
  /** Callback when page or pageSize changes */
  onChange?: (page: number, pageSize: number) => void;
  /** Callback when pageSize changes */
  onShowSizeChange?: (current: number, size: number) => void;
  /** Whether pagination is disabled */
  disabled?: boolean;
  /** Size of pagination */
  size?: PaginationSize;
  /** Extra class name */
  className?: string;
}
