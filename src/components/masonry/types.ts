/**
 * @file Masonry layout component type definitions.
 *
 * Defines props for the `<Masonry>` component, which arranges items in a
 * CSS multi-column masonry layout with responsive column counts and gutters.
 *
 * @see {@link ./Masonry.tsx} for the component implementation
 */
import type { CSSProperties, ReactNode } from "react";

export interface MasonryProps {
  columns?: number | Record<string, number>;
  gutter?: number | [number, number];
  items?: ReactNode[];
  itemRender?: (item: ReactNode, index: number) => ReactNode;
  sequential?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
