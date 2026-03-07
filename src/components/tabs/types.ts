/**
 * @file Tabs component type definitions.
 *
 * Provides prop interfaces for the tabbed navigation component
 * including `TabsProps`, individual `TabItem`, display type variants,
 * size options, and tab-bar positioning.
 *
 * @see {@link ./Tabs.tsx} for the implementation.
 * @see {@link ./index.ts} for the public export.
 */
import type { ReactNode, CSSProperties } from "react";

export type TabsType = "line" | "card" | "editable-card";
export type TabsSize = "small" | "middle" | "large";
export type TabsPosition = "top" | "bottom" | "left" | "right";

export interface TabItem {
  /** Unique key for the tab */
  key: string;
  /** Label displayed in the tab trigger */
  label: ReactNode;
  /** Content rendered when this tab is active */
  children?: ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Whether the tab can be closed (only for editable-card) */
  closable?: boolean;
  /** Custom icon in the tab trigger */
  icon?: ReactNode;
  /** Force render the tab panel even when not active */
  forceRender?: boolean;
}

export interface TabsProps {
  /** Controlled active tab key */
  activeKey?: string;
  /** Default active tab key (uncontrolled) */
  defaultActiveKey?: string;
  /** Tab items */
  items?: TabItem[];
  /** Tab display type */
  type?: TabsType;
  /** Tab size */
  size?: TabsSize;
  /** Tab bar position */
  tabPosition?: TabsPosition;
  /** Callback when active tab changes */
  onChange?: (activeKey: string) => void;
  /** Callback for add/remove operations (editable-card only) */
  onEdit?: (
    targetKey: string | React.MouseEvent | React.KeyboardEvent,
    action: "add" | "remove"
  ) => void;
  /** Extra content on the tab bar */
  tabBarExtraContent?: ReactNode | { left?: ReactNode; right?: ReactNode };
  /** Whether tabs are centered */
  centered?: boolean;
  /** Whether to destroy hidden tab panes */
  destroyInactiveTabPane?: boolean;
  /** Extra class name */
  className?: string;
  /** Style for the component */
  style?: CSSProperties;
}
