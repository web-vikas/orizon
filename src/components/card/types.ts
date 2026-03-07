/**
 * @file Card Type Definitions
 *
 * Props for `<Card>`, `<Card.Meta>`, and `<Card.Grid>`. Supports
 * title, extra slot, cover image, action bar, loading skeleton,
 * bordered / hoverable variants, and inner card nesting.
 *
 * @see {@link ./Card.tsx} — component implementation
 */

import type { ReactNode, CSSProperties, HTMLAttributes } from "react";

export type CardSize = "default" | "small";
export type CardType = "inner" | undefined;

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Card title */
  title?: ReactNode;
  /** Content rendered in the top-right corner */
  extra?: ReactNode;
  /** Card cover image */
  cover?: ReactNode;
  /** Action list rendered at the bottom */
  actions?: ReactNode[];
  /** Whether to show border */
  bordered?: boolean;
  /** Hover effect */
  hoverable?: boolean;
  /** Show loading skeleton */
  loading?: boolean;
  /** Size */
  size?: CardSize;
  /** Type: inner for nested cards */
  type?: CardType;
  /** Body style */
  bodyStyle?: CSSProperties;
  /** Head style */
  headStyle?: CSSProperties;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  children?: ReactNode;
}

export interface CardMetaProps {
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

export interface CardGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Hoverable effect */
  hoverable?: boolean;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  children?: ReactNode;
}
