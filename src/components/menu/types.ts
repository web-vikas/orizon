/**
 * @file Menu component type definitions.
 *
 * Defines props for the `<Menu>` component that renders a navigation
 * menu in horizontal, vertical, or inline mode. Supports sub-menus,
 * item groups, dividers, icons, danger items, themes, and controlled
 * selection/open states.
 *
 * @see {@link ./Menu.tsx} for the component implementation
 */
import type { ReactNode, CSSProperties } from "react";

export type MenuMode = "horizontal" | "vertical" | "inline";
export type MenuTheme = "light" | "dark";

export interface MenuItemType {
  /** Unique key */
  key: string;
  /** Label content */
  label: ReactNode;
  /** Icon for the item */
  icon?: ReactNode;
  /** Child menu items (creates a submenu) */
  children?: MenuItemType[];
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Danger styling */
  danger?: boolean;
  /** Type of item */
  type?: "group" | "divider";
  /** Title for group type */
  title?: string;
  /** Extra class name */
  className?: string;
}

export interface MenuInfo {
  key: string;
  keyPath: string[];
  domEvent: React.MouseEvent | React.KeyboardEvent;
}

export interface MenuProps {
  /** Menu mode */
  mode?: MenuMode;
  /** Menu items */
  items?: MenuItemType[];
  /** Currently selected keys (controlled) */
  selectedKeys?: string[];
  /** Default selected keys */
  defaultSelectedKeys?: string[];
  /** Currently open submenu keys (controlled) */
  openKeys?: string[];
  /** Default open submenu keys */
  defaultOpenKeys?: string[];
  /** Callback when an item is clicked */
  onClick?: (info: MenuInfo) => void;
  /** Callback when open submenus change */
  onOpenChange?: (openKeys: string[]) => void;
  /** Callback when an item is selected */
  onSelect?: (info: MenuInfo & { selectedKeys: string[] }) => void;
  /** Callback when an item is deselected */
  onDeselect?: (info: MenuInfo & { selectedKeys: string[] }) => void;
  /** Theme */
  theme?: MenuTheme;
  /** Allow multiple selection */
  multiple?: boolean;
  /** Indent width for inline mode (in px) */
  inlineIndent?: number;
  /** Whether to collapse the menu */
  inlineCollapsed?: boolean;
  /** Style */
  style?: CSSProperties;
  /** Extra class name */
  className?: string;
}
