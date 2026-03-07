import type { ReactNode, HTMLAttributes } from "react";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export type Gutter = number | Partial<Record<Breakpoint, number>>;

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
  /** Horizontal and optional vertical gutter spacing in px.
   *  number | [horizontal, vertical] | responsive object */
  gutter?: Gutter | [Gutter, Gutter];
  /** Vertical alignment of columns */
  align?: "top" | "middle" | "bottom" | "stretch";
  /** Horizontal justification of columns */
  justify?:
    | "start"
    | "end"
    | "center"
    | "space-around"
    | "space-between"
    | "space-evenly";
  /** Whether columns should wrap */
  wrap?: boolean;
  /** Extra class name */
  className?: string;
  children?: ReactNode;
}

export interface ColSpanType {
  span?: number;
  offset?: number;
  push?: number;
  pull?: number;
  order?: number;
}

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of cells to occupy (0-24). 0 means display:none */
  span?: number;
  /** Number of cells to offset from left */
  offset?: number;
  /** Number of cells to move right */
  push?: number;
  /** Number of cells to move left */
  pull?: number;
  /** Flex order */
  order?: number;
  /** Flex grow/shrink/basis */
  flex?: string | number;
  /** <576px responsive config */
  xs?: number | ColSpanType;
  /** >=576px responsive config */
  sm?: number | ColSpanType;
  /** >=768px responsive config */
  md?: number | ColSpanType;
  /** >=992px responsive config */
  lg?: number | ColSpanType;
  /** >=1200px responsive config */
  xl?: number | ColSpanType;
  /** >=1600px responsive config */
  xxl?: number | ColSpanType;
  /** Extra class name */
  className?: string;
  children?: ReactNode;
}
