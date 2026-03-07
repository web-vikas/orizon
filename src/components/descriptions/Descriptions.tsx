/**
 * @file Descriptions Component
 *
 * A key-value display component that renders labelled description
 * items in rows and columns. Supports horizontal / vertical layout,
 * bordered table style, size presets, column spans, colon toggle,
 * and a title / extra header row.
 *
 * Key props: `items`, `bordered`, `column`, `layout`, `size`,
 * `title`, `extra`, `colon`.
 *
 * @example
 * ```tsx
 * <Descriptions
 *   title="User Info"
 *   items={[
 *     { label: "Name", children: "Jane Doe" },
 *     { label: "Email", children: "jane@example.com" },
 *   ]}
 * />
 * ```
 *
 * @see {@link ./types.ts} — prop definitions
 * @see {@link ./index.ts} — barrel export
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { DescriptionsProps, DescriptionsItem, DescriptionsSize } from "./types";

// ---------------------------------------------------------------------------
// Size mapping
// ---------------------------------------------------------------------------

const SIZE_CLASSES: Record<DescriptionsSize, { cell: string; label: string }> = {
  default: { cell: "py-3 px-4 text-sm", label: "text-sm" },
  middle: { cell: "py-2.5 px-3 text-sm", label: "text-sm" },
  small: { cell: "py-2 px-3 text-xs", label: "text-xs" },
};

// ---------------------------------------------------------------------------
// Helpers: distribute items into rows
// ---------------------------------------------------------------------------

function distributeItemsIntoRows(
  items: DescriptionsItem[],
  column: number,
): DescriptionsItem[][] {
  const rows: DescriptionsItem[][] = [];
  let currentRow: DescriptionsItem[] = [];
  let currentSpan = 0;

  for (const item of items) {
    const itemSpan = item.span ?? 1;
    if (currentSpan + itemSpan > column && currentRow.length > 0) {
      rows.push(currentRow);
      currentRow = [];
      currentSpan = 0;
    }
    currentRow.push(item);
    currentSpan += itemSpan;
    if (currentSpan >= column) {
      rows.push(currentRow);
      currentRow = [];
      currentSpan = 0;
    }
  }
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }
  return rows;
}

// ---------------------------------------------------------------------------
// InternalDescriptions
// ---------------------------------------------------------------------------

const InternalDescriptions: React.FC<DescriptionsProps> = ({
  items = [],
  bordered = false,
  column = 3,
  layout = "horizontal",
  size = "default",
  title,
  extra,
  colon = true,
  className,
  style,
  labelStyle: globalLabelStyle,
  contentStyle: globalContentStyle,
}) => {
  const colCount = typeof column === "number" ? column : 3;
  const sizeClasses = SIZE_CLASSES[size];
  const rows = distributeItemsIntoRows(items, colCount);

  if (bordered) {
    return (
      <div className={cn("w-full", className)} style={style}>
        {/* Title bar */}
        {(title || extra) && (
          <div className="mb-3 flex items-center justify-between">
            {title && <div className="text-base font-semibold">{title}</div>}
            {extra && <div className="ml-auto">{extra}</div>}
          </div>
        )}

        <table className="w-full border-collapse overflow-hidden rounded-lg border text-sm">
          <tbody>
            {rows.map((row, rowIdx) => {
              if (layout === "vertical") {
                return (
                  <React.Fragment key={rowIdx}>
                    {/* Label row */}
                    <tr>
                      {row.map((item, itemIdx) => (
                        <th
                          key={item.key ?? itemIdx}
                          colSpan={item.span ?? 1}
                          className={cn(
                            "border bg-muted/50 text-left font-medium text-muted-foreground",
                            sizeClasses.cell,
                          )}
                          style={{ ...globalLabelStyle, ...item.labelStyle }}
                        >
                          {item.label}
                          {colon && ":"}
                        </th>
                      ))}
                    </tr>
                    {/* Content row */}
                    <tr>
                      {row.map((item, itemIdx) => (
                        <td
                          key={item.key ?? itemIdx}
                          colSpan={item.span ?? 1}
                          className={cn("border", sizeClasses.cell)}
                          style={{ ...globalContentStyle, ...item.contentStyle }}
                        >
                          {item.children}
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                );
              }

              // Horizontal layout
              return (
                <tr key={rowIdx}>
                  {row.map((item, itemIdx) => (
                    <React.Fragment key={item.key ?? itemIdx}>
                      <th
                        className={cn(
                          "border bg-muted/50 text-left font-medium text-muted-foreground",
                          sizeClasses.cell,
                        )}
                        style={{ ...globalLabelStyle, ...item.labelStyle }}
                      >
                        {item.label}
                        {colon && ":"}
                      </th>
                      <td
                        colSpan={(item.span ?? 1) * 2 - 1}
                        className={cn("border", sizeClasses.cell)}
                        style={{ ...globalContentStyle, ...item.contentStyle }}
                      >
                        {item.children}
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // Non-bordered layout
  return (
    <div className={cn("w-full", className)} style={style}>
      {/* Title bar */}
      {(title || extra) && (
        <div className="mb-3 flex items-center justify-between">
          {title && <div className="text-base font-semibold">{title}</div>}
          {extra && <div className="ml-auto">{extra}</div>}
        </div>
      )}

      <div className="space-y-0">
        {rows.map((row, rowIdx) => {
          if (layout === "vertical") {
            return (
              <div
                key={rowIdx}
                className={cn(
                  "grid border-b pb-3 pt-3",
                  `grid-cols-${colCount}`,
                )}
                style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
              >
                {row.map((item, itemIdx) => (
                  <div
                    key={item.key ?? itemIdx}
                    className={cn(sizeClasses.cell, "py-1")}
                    style={{ gridColumn: item.span ? `span ${item.span}` : undefined }}
                  >
                    <div
                      className={cn("mb-1 text-muted-foreground", sizeClasses.label)}
                      style={{ ...globalLabelStyle, ...item.labelStyle }}
                    >
                      {item.label}
                      {colon && ":"}
                    </div>
                    <div style={{ ...globalContentStyle, ...item.contentStyle }}>
                      {item.children}
                    </div>
                  </div>
                ))}
              </div>
            );
          }

          // Horizontal non-bordered
          return (
            <div
              key={rowIdx}
              className="grid border-b py-3"
              style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
            >
              {row.map((item, itemIdx) => (
                <div
                  key={item.key ?? itemIdx}
                  className={cn("flex gap-2", sizeClasses.cell, "py-0")}
                  style={{ gridColumn: item.span ? `span ${item.span}` : undefined }}
                >
                  <span
                    className={cn("shrink-0 text-muted-foreground", sizeClasses.label)}
                    style={{ ...globalLabelStyle, ...item.labelStyle }}
                  >
                    {item.label}
                    {colon && ":"}
                  </span>
                  <span style={{ ...globalContentStyle, ...item.contentStyle }}>
                    {item.children}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

InternalDescriptions.displayName = "Descriptions";

export { InternalDescriptions };
