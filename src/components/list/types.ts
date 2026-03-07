/**
 * @file List component type definitions.
 *
 * Defines props for `<List>`, `<List.Item>`, and `<List.Item.Meta>`.
 * Supports data source rendering, pagination, grid layout, loading state,
 * and bordered/split styling.
 *
 * @see {@link ./List.tsx} for the component implementation
 */
import type { ReactNode, CSSProperties } from "react";

export type ListSize = "default" | "large" | "small";
export type ListItemLayout = "horizontal" | "vertical";

export interface ListGridConfig {
  /** Number of columns */
  column?: number;
  /** Gap between items */
  gutter?: number;
  /** Responsive columns */
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

export interface ListPaginationConfig {
  current?: number;
  pageSize?: number;
  total?: number;
  onChange?: (page: number, pageSize: number) => void;
  position?: "top" | "bottom" | "both";
  align?: "start" | "center" | "end";
  simple?: boolean;
  size?: "default" | "small";
}

export interface ListProps<T = unknown> {
  /** Data source */
  dataSource?: T[];
  /** Render each item */
  renderItem?: (item: T, index: number) => ReactNode;
  /** List header */
  header?: ReactNode;
  /** List footer */
  footer?: ReactNode;
  /** Show border */
  bordered?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Pagination config */
  pagination?: ListPaginationConfig | false;
  /** Size */
  size?: ListSize;
  /** Grid config */
  grid?: ListGridConfig;
  /** Item layout direction */
  itemLayout?: ListItemLayout;
  /** Show split line between items */
  split?: boolean;
  /** Empty text */
  locale?: { emptyText?: ReactNode };
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  /** Row key */
  rowKey?: string | ((item: T) => string);
}

export interface ListItemProps {
  /** Action list */
  actions?: ReactNode[];
  /** Extra content */
  extra?: ReactNode;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  children?: ReactNode;
}

export interface ListItemMetaProps {
  /** Avatar or icon */
  avatar?: ReactNode;
  /** Title */
  title?: ReactNode;
  /** Description */
  description?: ReactNode;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
}
