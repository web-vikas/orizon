/**
 * @file Pagination -- page navigation with size changer and quick jumper.
 *
 * Renders numbered page links with prev/next navigation, optional page-size
 * selector, quick-jump input, and total display. Supports controlled and
 * uncontrolled modes plus simple (compact) mode.
 *
 * Key props: `total`, `current`, `pageSize`, `showSizeChanger`,
 * `showQuickJumper`, `showTotal`, `simple`, `size`, `disabled`.
 *
 * @example
 * ```tsx
 * <Pagination total={100} current={1} pageSize={10} onChange={handleChange} />
 * ```
 *
 * @see ./types.ts  - PaginationProps
 * @see ./index.ts  - public export
 */
"use client";

import * as React from "react";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/primitives/pagination";
import { cn } from "@/lib/utils";
import type { PaginationProps } from "./types";

function generatePageNumbers(
  current: number,
  totalPages: number
): (number | "ellipsis-start" | "ellipsis-end")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [1];

  if (current > 3) {
    pages.push("ellipsis-start");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(totalPages - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < totalPages - 2) {
    pages.push("ellipsis-end");
  }

  if (pages[pages.length - 1] !== totalPages) {
    pages.push(totalPages);
  }

  return pages;
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (props, ref) => {
    const {
      current: currentProp,
      defaultCurrent = 1,
      pageSize: pageSizeProp,
      defaultPageSize = 10,
      total,
      showSizeChanger = false,
      pageSizeOptions = [10, 20, 50, 100],
      showQuickJumper = false,
      showTotal,
      simple = false,
      onChange,
      onShowSizeChange,
      disabled = false,
      size = "default",
      className,
    } = props;

    const [internalCurrent, setInternalCurrent] = React.useState(defaultCurrent);
    const [internalPageSize, setInternalPageSize] = React.useState(defaultPageSize);

    const isCurrentControlled = currentProp !== undefined;
    const isPageSizeControlled = pageSizeProp !== undefined;

    const current = isCurrentControlled ? currentProp : internalCurrent;
    const pageSize = isPageSizeControlled ? pageSizeProp : internalPageSize;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const [jumperValue, setJumperValue] = React.useState("");

    const goToPage = (page: number) => {
      if (disabled) return;
      const safePage = Math.max(1, Math.min(totalPages, page));
      if (!isCurrentControlled) setInternalCurrent(safePage);
      onChange?.(safePage, pageSize);
    };

    const handlePageSizeChange = (newSize: number) => {
      if (disabled) return;
      if (!isPageSizeControlled) setInternalPageSize(newSize);
      const newTotalPages = Math.max(1, Math.ceil(total / newSize));
      const newCurrent = Math.min(current, newTotalPages);
      if (!isCurrentControlled) setInternalCurrent(newCurrent);
      onShowSizeChange?.(newCurrent, newSize);
      onChange?.(newCurrent, newSize);
    };

    const handleJumperKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const page = parseInt(jumperValue, 10);
        if (!isNaN(page)) {
          goToPage(page);
        }
        setJumperValue("");
      }
    };

    const rangeStart = (current - 1) * pageSize + 1;
    const rangeEnd = Math.min(current * pageSize, total);

    const isSmall = size === "small";

    // Simple mode
    if (simple) {
      return (
        <ShadcnPagination ref={ref} className={cn(className)}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                text=""
                onClick={() => goToPage(current - 1)}
                className={cn(
                  disabled || current <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer",
                  isSmall && "h-7 w-7"
                )}
              />
            </PaginationItem>
            <PaginationItem>
              <span className={cn("mx-2 text-sm", isSmall && "text-xs")}>
                {current} / {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                text=""
                onClick={() => goToPage(current + 1)}
                className={cn(
                  disabled || current >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer",
                  isSmall && "h-7 w-7"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </ShadcnPagination>
      );
    }

    const pageNumbers = generatePageNumbers(current, totalPages);

    return (
      <div
        data-slot="pagination-wrapper"
        className={cn("flex items-center gap-2", className)}
      >
        {showTotal && (
          <span className={cn("text-sm text-muted-foreground whitespace-nowrap", isSmall && "text-xs")}>
            {showTotal(total, [rangeStart, rangeEnd])}
          </span>
        )}

        <ShadcnPagination ref={ref}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                text=""
                onClick={() => goToPage(current - 1)}
                className={cn(
                  disabled || current <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer",
                  isSmall && "h-7 w-7"
                )}
              />
            </PaginationItem>

            {pageNumbers.map((page, _i) => {
              if (page === "ellipsis-start" || page === "ellipsis-end") {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis className={cn(isSmall && "h-7 w-7")} />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === current}
                    onClick={() => goToPage(page)}
                    className={cn(
                      disabled ? "pointer-events-none opacity-50" : "cursor-pointer",
                      isSmall && "h-7 w-7 text-xs"
                    )}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                text=""
                onClick={() => goToPage(current + 1)}
                className={cn(
                  disabled || current >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer",
                  isSmall && "h-7 w-7"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </ShadcnPagination>

        {showSizeChanger && (
          <select
            data-slot="pagination-size-changer"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            disabled={disabled}
            className={cn(
              "rounded-md border border-input bg-background px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-ring/50",
              isSmall && "text-xs h-7",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt} / page
              </option>
            ))}
          </select>
        )}

        {showQuickJumper && (
          <div
            data-slot="pagination-quick-jumper"
            className={cn("flex items-center gap-1 text-sm", isSmall && "text-xs")}
          >
            <span className="text-muted-foreground">Go to</span>
            <input
              type="text"
              value={jumperValue}
              onChange={(e) => setJumperValue(e.target.value)}
              onKeyDown={handleJumperKeyDown}
              disabled={disabled}
              className={cn(
                "w-12 rounded-md border border-input bg-background px-2 py-1 text-center text-sm outline-none focus:ring-2 focus:ring-ring/50",
                isSmall && "w-10 h-7 text-xs",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            />
          </div>
        )}
      </div>
    );
  }
);

Pagination.displayName = "Pagination";

export { Pagination };
