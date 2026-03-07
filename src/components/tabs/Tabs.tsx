/**
 * @file Tabs -- tabbed content navigation.
 *
 * Renders a tab bar with associated content panels. Supports line,
 * card, and editable-card types, four tab-bar positions
 * (top / bottom / left / right), responsive sizing, extra content
 * slots, and closable / addable tabs for the editable-card variant.
 *
 * Key props: `items`, `activeKey`, `type`, `tabPosition`, `size`,
 * `centered`, `onEdit`.
 *
 * @example
 * ```tsx
 * <Tabs
 *   items={[
 *     { key: "1", label: "Tab 1", children: "Content 1" },
 *     { key: "2", label: "Tab 2", children: "Content 2" },
 *   ]}
 * />
 * ```
 *
 * @see {@link ./types.ts} for prop definitions.
 * @see {@link ./index.ts} for the public export.
 */
"use client";

import * as React from "react";
import {
  Tabs as ShadcnTabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/primitives/tabs";
import { cn } from "@/lib/utils";
import { useComponentSize } from "@/hooks/useComponentSize";
import type { TabsProps, TabItem } from "./types";

const SIZE_MAP = {
  small: "text-xs",
  middle: "text-sm",
  large: "text-base",
} as const;

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
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

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    activeKey,
    defaultActiveKey,
    items = [],
    type = "line",
    size: sizeProp,
    tabPosition = "top",
    onChange,
    onEdit,
    tabBarExtraContent,
    centered = false,
    destroyInactiveTabPane = false,
    className,
    style,
  } = props;

  const size = useComponentSize(sizeProp);

  const [internalActiveKey, setInternalActiveKey] = React.useState(
    defaultActiveKey ?? items[0]?.key ?? ""
  );
  const isControlled = activeKey !== undefined;
  const mergedActiveKey = isControlled ? activeKey : internalActiveKey;

  const handleChange = (value: string) => {
    if (!isControlled) setInternalActiveKey(value);
    onChange?.(value);
  };

  const handleClose = (
    e: React.MouseEvent,
    key: string
  ) => {
    e.stopPropagation();
    onEdit?.(key, "remove");
  };

  const handleAdd = (e: React.MouseEvent) => {
    onEdit?.(e, "add");
  };

  const orientation =
    tabPosition === "left" || tabPosition === "right"
      ? "vertical"
      : "horizontal";

  // Determine shadcn Tabs variant
  const variant = type === "line" ? "line" : "default";

  // Extra content parsing
  const extraLeft =
    tabBarExtraContent && typeof tabBarExtraContent === "object" && "left" in tabBarExtraContent
      ? tabBarExtraContent.left
      : null;
  const extraRight =
    tabBarExtraContent && typeof tabBarExtraContent === "object" && "right" in tabBarExtraContent
      ? tabBarExtraContent.right
      : React.isValidElement(tabBarExtraContent) || typeof tabBarExtraContent === "string"
        ? tabBarExtraContent
        : null;

  return (
    <ShadcnTabs
      ref={ref}
      value={mergedActiveKey}
      onValueChange={handleChange}
      orientation={orientation}
      className={cn(
        tabPosition === "bottom" && "flex-col-reverse",
        tabPosition === "right" && "flex-row-reverse",
        className
      )}
      style={style}
    >
      {/* Tab bar */}
      <div
        data-slot="tabs-bar"
        className={cn(
          "flex items-center gap-2",
          orientation === "vertical" ? "flex-col" : "flex-row"
        )}
      >
        {extraLeft && (
          <div data-slot="tabs-extra-left" className="shrink-0">
            {extraLeft}
          </div>
        )}

        <TabsList
          variant={variant}
          className={cn(
            centered && "mx-auto",
            type === "card" && "bg-transparent gap-0.5",
            type === "editable-card" && "bg-transparent gap-0.5",
            SIZE_MAP[size]
          )}
        >
          {items.map((item: TabItem) => (
            <TabsTrigger
              key={item.key}
              value={item.key}
              disabled={item.disabled}
              className={cn(
                SIZE_MAP[size],
                type === "card" &&
                  "rounded-t-lg rounded-b-none border border-b-0 border-border bg-muted/40 data-active:bg-background data-active:border-border",
                type === "editable-card" &&
                  "rounded-t-lg rounded-b-none border border-b-0 border-border bg-muted/40 data-active:bg-background data-active:border-border"
              )}
            >
              {item.icon && (
                <span className="mr-1 inline-flex items-center [&_svg]:size-4">
                  {item.icon}
                </span>
              )}
              {item.label}
              {type === "editable-card" && item.closable !== false && (
                <span
                  className="ml-1 inline-flex cursor-pointer rounded-sm p-0.5 opacity-60 hover:opacity-100 hover:bg-accent"
                  onClick={(e) => handleClose(e, item.key)}
                  role="button"
                  aria-label="Remove tab"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onEdit?.(item.key, "remove");
                    }
                  }}
                >
                  <CloseIcon />
                </span>
              )}
            </TabsTrigger>
          ))}

          {type === "editable-card" && (
            <button
              type="button"
              data-slot="tabs-add-button"
              className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-md border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              onClick={handleAdd}
              aria-label="Add tab"
            >
              <PlusIcon />
            </button>
          )}
        </TabsList>

        {extraRight && (
          <div data-slot="tabs-extra-right" className="shrink-0 ml-auto">
            {extraRight}
          </div>
        )}
      </div>

      {/* Tab panels */}
      {items.map((item: TabItem) => (
        <TabsContent
          key={item.key}
          value={item.key}
          className={cn(
            destroyInactiveTabPane && mergedActiveKey !== item.key && "hidden"
          )}
        >
          {item.children}
        </TabsContent>
      ))}
    </ShadcnTabs>
  );
});

Tabs.displayName = "Tabs";

export { Tabs };
