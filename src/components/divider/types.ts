/**
 * @file Divider component type definitions.
 *
 * Defines props for the `<Divider>` component, which renders a horizontal
 * or vertical visual separator with optional title text.
 *
 * @see {@link ./Divider.tsx} for the component implementation
 */
import type { ReactNode, HTMLAttributes } from "react";

export type DividerType = "horizontal" | "vertical";
export type DividerOrientation = "left" | "center" | "right";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Direction of the divider */
  type?: DividerType;
  /** Use dashed border style */
  dashed?: boolean;
  /** Position of the title text */
  orientation?: DividerOrientation;
  /** Custom margin for the orientation title */
  orientationMargin?: number | string;
  /** Title text displayed in the divider */
  children?: ReactNode;
  /** Use plain text style (no bold) */
  plain?: boolean;
  /** Extra class name */
  className?: string;
}
