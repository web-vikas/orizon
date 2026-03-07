/**
 * @file Public API for the Pagination component.
 * @see ./Pagination.tsx - implementation
 */

/**
 * Page navigation with numbered links, size changer, and quick jumper.
 *
 * @example
 * ```tsx
 * <Pagination total={200} showSizeChanger showQuickJumper />
 * <Pagination total={50} simple />
 * ```
 */
export { Pagination } from "./Pagination";
export type { PaginationProps, PaginationSize } from "./types";
