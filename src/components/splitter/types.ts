/**
 * @file Splitter component type definitions.
 *
 * Exports props for the `<Splitter>` resizable panel layout and its
 * `<Splitter.Panel>` children including min/max constraints, collapsibility,
 * and resize callbacks.
 *
 * @see ./Splitter.tsx - splitter implementation
 * @see ./Panel.tsx    - panel sub-component
 * @see ./index.ts     - public export
 */
import type { CSSProperties, ReactNode } from "react";

export type SplitterLayout = "horizontal" | "vertical";

export interface SplitterPanelProps {
  defaultSize?: number | string;
  min?: number | string;
  max?: number | string;
  collapsible?: boolean | { start?: boolean; end?: boolean };
  resizable?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface SplitterProps {
  layout?: SplitterLayout;
  lazy?: boolean;
  onResize?: (sizes: number[]) => void;
  onResizeStart?: (sizes: number[]) => void;
  onResizeEnd?: (sizes: number[]) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
