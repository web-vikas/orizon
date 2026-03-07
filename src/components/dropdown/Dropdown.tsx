/**
 * @file Dropdown component — contextual overlay menu.
 *
 * Wraps a trigger element with a dropdown menu that appears on hover, click,
 * or context-menu. The menu supports items, groups, dividers, disabled items,
 * and danger-styled items.
 *
 * Key props: `menu`, `trigger`, `placement`, `open`, `disabled`.
 *
 * @example
 * ```tsx
 * <Dropdown menu={{ items: [{ key: '1', label: 'Edit' }] }}>
 *   <a>Hover me</a>
 * </Dropdown>
 * ```
 *
 * @see {@link ./types.ts} for prop type definitions
 * @see {@link ./DropdownButton.tsx} for the split-button variant
 * @see {@link ./index.ts} for the public export
 */
"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/primitives/dropdown-menu";
import { cn } from "@/lib/utils";
import type { DropdownProps, DropdownMenuItemType, DropdownPlacement } from "./types";

function placementToSideAlign(placement?: DropdownPlacement) {
  const map: Record<string, { side: "top" | "bottom" | "left" | "right"; align: "start" | "center" | "end" }> = {
    top: { side: "top", align: "center" },
    topLeft: { side: "top", align: "start" },
    topRight: { side: "top", align: "end" },
    bottom: { side: "bottom", align: "center" },
    bottomLeft: { side: "bottom", align: "start" },
    bottomRight: { side: "bottom", align: "end" },
  };
  return map[placement ?? "bottomLeft"] ?? { side: "bottom", align: "start" };
}

function renderMenuItems(
  items: DropdownMenuItemType[],
  menuOnClick?: (info: { key: string; domEvent: React.MouseEvent }) => void
) {
  return items.map((item, index) => {
    if (item.type === "divider") {
      return <DropdownMenuSeparator key={item.key || `divider-${index}`} />;
    }

    if (item.type === "group") {
      return (
        <DropdownMenuGroup key={item.key}>
          <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
          {item.children && renderMenuItems(item.children, menuOnClick)}
        </DropdownMenuGroup>
      );
    }

    return (
      <DropdownMenuItem
        key={item.key}
        disabled={item.disabled}
        variant={item.danger ? "destructive" : "default"}
        onClick={(e: React.MouseEvent) => {
          item.onClick?.({ key: item.key, domEvent: e });
          menuOnClick?.({ key: item.key, domEvent: e });
        }}
      >
        {item.icon && (
          <span className="mr-1.5 inline-flex items-center [&_svg]:size-4">
            {item.icon}
          </span>
        )}
        {item.label}
      </DropdownMenuItem>
    );
  });
}

const InternalDropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  (props, ref) => {
    const {
      menu,
      trigger = ["hover"],
      placement = "bottomLeft",
      open: openProp,
      onOpenChange,
      disabled = false,
      children,
      overlayClassName,
      className,
    } = props;

    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlled = openProp !== undefined;
    const open = isControlled ? openProp : internalOpen;

    const handleOpenChange = (nextOpen: boolean) => {
      if (disabled) return;
      if (!isControlled) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    };

    const { side, align } = placementToSideAlign(placement);

    // Context menu trigger handling
    const isContextMenu = trigger.includes("contextMenu");
    const isClick = trigger.includes("click") || isContextMenu;

    return (
      <DropdownMenu
        open={open}
        onOpenChange={handleOpenChange}
        modal={false}
      >
        <DropdownMenuTrigger
          ref={ref}
          disabled={disabled}
          className={cn("outline-none", className)}
          // For hover trigger, use mouse events
          {...(!isClick
            ? {
                onMouseEnter: () => handleOpenChange(true),
                onMouseLeave: () => handleOpenChange(false),
              }
            : {})}
          {...(isContextMenu
            ? {
                onContextMenu: (e: React.MouseEvent) => {
                  e.preventDefault();
                  handleOpenChange(true);
                },
              }
            : {})}
        >
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={side}
          align={align}
          className={cn(overlayClassName)}
          {...(!isClick
            ? {
                onMouseEnter: () => handleOpenChange(true),
                onMouseLeave: () => handleOpenChange(false),
              }
            : {})}
        >
          {menu?.items && renderMenuItems(menu.items, menu.onClick)}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

InternalDropdown.displayName = "Dropdown";

export { InternalDropdown };
