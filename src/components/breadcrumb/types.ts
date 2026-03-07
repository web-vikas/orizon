/**
 * @file Breadcrumb Type Definitions
 *
 * Props and item interfaces for the `<Breadcrumb>` navigation
 * component. Supports linked items, dropdown menus per item,
 * and custom separators.
 *
 * @see {@link ./Breadcrumb.tsx} — component implementation
 */

import type { ReactNode, MouseEventHandler } from "react";

export interface BreadcrumbMenuItemType {
  /** Key for the menu item */
  key: string;
  /** Label text */
  label: ReactNode;
  /** Optional href */
  href?: string;
  /** Click handler */
  onClick?: MouseEventHandler;
}

export interface BreadcrumbItemType {
  /** Title text or node */
  title: ReactNode;
  /** Link href */
  href?: string;
  /** Dropdown menu for this item */
  menu?: { items: BreadcrumbMenuItemType[] };
  /** Click handler */
  onClick?: MouseEventHandler;
  /** Path key (for routing) */
  path?: string;
  /** Class name for the item */
  className?: string;
}

export interface BreadcrumbProps {
  /** Breadcrumb items */
  items?: BreadcrumbItemType[];
  /** Custom separator, defaults to "/" */
  separator?: ReactNode;
  /** Extra class name */
  className?: string;
}
