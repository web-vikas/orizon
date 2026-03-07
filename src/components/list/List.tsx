/**
 * @file List component — data display list with pagination.
 *
 * Renders a vertical list of items from a `dataSource` with support for
 * custom `renderItem`, header/footer, bordered and split styles, loading
 * skeleton, grid layout, and built-in pagination. Includes `List.Item`
 * and `List.Item.Meta` sub-components.
 *
 * Key props: `dataSource`, `renderItem`, `bordered`, `loading`, `pagination`, `grid`.
 *
 * @example
 * ```tsx
 * <List
 *   dataSource={['Item 1', 'Item 2', 'Item 3']}
 *   renderItem={(item) => <List.Item>{item}</List.Item>}
 *   bordered
 * />
 * ```
 *
 * @see {@link ./types.ts} for prop type definitions
 * @see {@link ./index.ts} for the public export
 */
"use client";

import * as React from "react";
import { Skeleton } from "@/primitives/skeleton";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type {
  ListProps,
  ListItemProps,
  ListItemMetaProps,
  ListSize,
  ListPaginationConfig,
} from "./types";

// ---------------------------------------------------------------------------
// Size mapping
// ---------------------------------------------------------------------------

const SIZE_CLASSES: Record<ListSize, string> = {
  default: "py-3 px-4",
  large: "py-4 px-6",
  small: "py-2 px-3 text-sm",
};

// ---------------------------------------------------------------------------
// List.Item.Meta
// ---------------------------------------------------------------------------

const ListItemMeta: React.FC<ListItemMetaProps> = ({
  avatar,
  title,
  description,
  className,
  style,
}) => {
  return (
    <div className={cn("flex items-start gap-3", className)} style={style}>
      {avatar && <div className="shrink-0">{avatar}</div>}
      <div className="min-w-0 flex-1">
        {title && <div className="text-sm font-medium leading-snug">{title}</div>}
        {description && (
          <div className="mt-0.5 text-sm text-muted-foreground">{description}</div>
        )}
      </div>
    </div>
  );
};

ListItemMeta.displayName = "List.Item.Meta";

// ---------------------------------------------------------------------------
// List.Item
// ---------------------------------------------------------------------------

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ actions, extra, className, style, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-4", className)}
        style={style}
      >
        <div className="min-w-0 flex-1">{children}</div>
        {extra && <div className="shrink-0">{extra}</div>}
        {actions && actions.length > 0 && (
          <div className="flex shrink-0 items-center gap-2">
            {actions.map((action, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-muted-foreground/40">|</span>}
                {action}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  },
);

ListItem.displayName = "List.Item";

// ---------------------------------------------------------------------------
// Simple pagination for List
// ---------------------------------------------------------------------------

function ListPagination({
  config,
  total,
  onChange,
}: {
  config: ListPaginationConfig;
  total: number;
  onChange: (page: number, pageSize: number) => void;
}) {
  const { current = 1, pageSize = 10, align = "end", simple, size } = config;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const isSmall = size === "small";

  return (
    <div
      className={cn(
        "flex items-center gap-1 py-3",
        align === "center" && "justify-center",
        align === "end" && "justify-end",
        align === "start" && "justify-start",
      )}
    >
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-muted disabled:pointer-events-none disabled:opacity-50",
          isSmall ? "size-7" : "size-8",
        )}
        disabled={current <= 1}
        onClick={() => onChange(current - 1, pageSize)}
      >
        <ChevronLeftIcon className="size-4" />
      </button>

      {simple ? (
        <span className="flex items-center gap-1 px-2 text-sm">
          {current} / {totalPages}
        </span>
      ) : (
        Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(0, 7)
          .map((page) => (
            <button
              key={page}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium",
                isSmall ? "size-7" : "size-8",
                page === current
                  ? "border border-primary bg-primary text-primary-foreground"
                  : "border border-input bg-background hover:bg-muted",
              )}
              onClick={() => onChange(page, pageSize)}
            >
              {page}
            </button>
          ))
      )}

      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-muted disabled:pointer-events-none disabled:opacity-50",
          isSmall ? "size-7" : "size-8",
        )}
        disabled={current >= totalPages}
        onClick={() => onChange(current + 1, pageSize)}
      >
        <ChevronRightIcon className="size-4" />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// InternalList
// ---------------------------------------------------------------------------

function InternalList<T = unknown>({
  dataSource = [],
  renderItem,
  header,
  footer,
  bordered = false,
  loading = false,
  pagination: paginationProp,
  size = "default",
  grid,
  itemLayout = "horizontal",
  split = true,
  locale,
  className,
  style,
  rowKey,
}: ListProps<T>) {
  const [internalPage, setInternalPage] = React.useState(1);
  const [internalPageSize, setInternalPageSize] = React.useState(10);

  const hasPagination = paginationProp !== false && paginationProp !== undefined;
  const paginationConfig: ListPaginationConfig = hasPagination
    ? {
        ...paginationProp,
        current: paginationProp!.current ?? internalPage,
        pageSize: paginationProp!.pageSize ?? internalPageSize,
      }
    : {};

  const total = paginationConfig.total ?? dataSource.length;

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (!hasPagination) return dataSource;
    const { current = 1, pageSize = 10 } = paginationConfig;
    if (paginationConfig.total != null && paginationConfig.total !== dataSource.length) {
      return dataSource;
    }
    const start = (current - 1) * pageSize;
    return dataSource.slice(start, start + pageSize);
  }, [dataSource, hasPagination, paginationConfig]);

  const handlePageChange = (page: number, pageSize: number) => {
    setInternalPage(page);
    setInternalPageSize(pageSize);
    paginationProp && typeof paginationProp === "object" && paginationProp.onChange?.(page, pageSize);
  };

  const getKey = (item: T, index: number): string => {
    if (typeof rowKey === "function") return rowKey(item);
    if (typeof rowKey === "string") return String((item as Record<string, unknown>)[rowKey]);
    return String(index);
  };

  const isGrid = !!grid;
  const gridStyle: React.CSSProperties = isGrid
    ? {
        display: "grid",
        gridTemplateColumns: `repeat(${grid!.column ?? 1}, 1fr)`,
        gap: grid!.gutter ?? 0,
      }
    : {};

  const paginationNode = hasPagination ? (
    <ListPagination
      config={paginationConfig}
      total={total}
      onChange={handlePageChange}
    />
  ) : null;

  return (
    <div
      className={cn(
        "w-full",
        bordered && "rounded-lg border",
        className,
      )}
      style={style}
    >
      {header && (
        <div className={cn("border-b", SIZE_CLASSES[size])}>{header}</div>
      )}

      {paginationProp &&
        typeof paginationProp === "object" &&
        (paginationProp.position === "top" || paginationProp.position === "both") &&
        paginationNode}

      {loading ? (
        <div className="space-y-3 p-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : paginatedData.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
          {locale?.emptyText ?? "No data"}
        </div>
      ) : (
        <div style={gridStyle}>
          {paginatedData.map((item, index) => (
            <div
              key={getKey(item, index)}
              className={cn(
                SIZE_CLASSES[size],
                !isGrid && split && "border-b last:border-b-0",
                itemLayout === "vertical" && "flex flex-col",
              )}
            >
              {renderItem?.(item, index)}
            </div>
          ))}
        </div>
      )}

      {(!paginationProp ||
        typeof paginationProp !== "object" ||
        !paginationProp.position ||
        paginationProp.position === "bottom" ||
        paginationProp.position === "both") &&
        paginationNode}

      {footer && (
        <div className={cn("border-t", SIZE_CLASSES[size])}>{footer}</div>
      )}
    </div>
  );
}

InternalList.displayName = "List";

export { InternalList, ListItem, ListItemMeta };
