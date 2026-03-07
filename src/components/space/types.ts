/**
 * @file Space component type definitions.
 *
 * Exports props for `<Space>` and `<Space.Compact>` layout helpers
 * including size, direction, wrap, alignment, and split separators.
 *
 * @see ./Space.tsx   - space implementation
 * @see ./Compact.tsx - compact group implementation
 * @see ./index.ts    - public export
 */
import type { ReactNode, HTMLAttributes } from "react";

export type SpaceSize = "small" | "middle" | "large" | number;
export type SpaceDirection = "horizontal" | "vertical";
export type SpaceAlign = "start" | "end" | "center" | "baseline";

export interface SpaceProps extends Omit<HTMLAttributes<HTMLDivElement>, "dir"> {
  /** Alignment of children */
  align?: SpaceAlign;
  /** Spacing size between children */
  size?: SpaceSize | [SpaceSize, SpaceSize];
  /** Direction of the space layout */
  direction?: SpaceDirection;
  /** Whether to wrap children */
  wrap?: boolean;
  /** Separator node between children */
  split?: ReactNode;
  /** Extra class name */
  className?: string;
  children?: ReactNode;
}

export interface SpaceCompactProps extends HTMLAttributes<HTMLDivElement> {
  /** Direction of compact layout */
  direction?: SpaceDirection;
  /** Size override for children */
  size?: "small" | "middle" | "large";
  /** Whether to display as block */
  block?: boolean;
  /** Extra class name */
  className?: string;
  children?: ReactNode;
}
