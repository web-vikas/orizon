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
