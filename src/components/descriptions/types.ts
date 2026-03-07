/**
 * @file Descriptions Type Definitions
 *
 * Props and item interfaces for the `<Descriptions>` key-value
 * display component. Supports horizontal / vertical layout,
 * bordered / plain styles, size presets, column spans, and
 * a title / extra header row.
 *
 * @see {@link ./Descriptions.tsx} — component implementation
 */

import type { ReactNode, CSSProperties, Key } from "react";

export type DescriptionsLayout = "horizontal" | "vertical";
export type DescriptionsSize = "default" | "middle" | "small";

export interface DescriptionsItem {
  /** Unique key */
  key?: Key;
  /** Label text */
  label: ReactNode;
  /** Content */
  children: ReactNode;
  /** Number of columns this item spans */
  span?: number;
  /** Label style */
  labelStyle?: CSSProperties;
  /** Content style */
  contentStyle?: CSSProperties;
  /** Label class name */
  labelClassName?: string;
  /** Content class name */
  contentClassName?: string;
}

export interface ResponsiveColumn {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

export interface DescriptionsProps {
  /** Description items */
  items?: DescriptionsItem[];
  /** Whether to show border */
  bordered?: boolean;
  /** Number of columns per row */
  column?: number | ResponsiveColumn;
  /** Layout direction */
  layout?: DescriptionsLayout;
  /** Size */
  size?: DescriptionsSize;
  /** Title */
  title?: ReactNode;
  /** Extra content in the top-right */
  extra?: ReactNode;
  /** Whether to show colon after label */
  colon?: boolean;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  /** Label style applied to all items */
  labelStyle?: CSSProperties;
  /** Content style applied to all items */
  contentStyle?: CSSProperties;
}
