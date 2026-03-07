/**
 * @file Popover component type definitions.
 *
 * Exports props for the `<Popover>` floating content panel including
 * trigger modes, placements, and controlled open state.
 *
 * @see ./Popover.tsx - component implementation
 * @see ./index.ts    - public export
 */
import type { ReactNode, CSSProperties } from "react";

export type PopoverPlacement =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight"
  | "left"
  | "leftTop"
  | "leftBottom"
  | "right"
  | "rightTop"
  | "rightBottom";

export type PopoverTrigger = "hover" | "focus" | "click";

export interface PopoverProps {
  /** Popover body content */
  content?: ReactNode | (() => ReactNode);
  /** Popover title */
  title?: ReactNode;
  /** Trigger mode */
  trigger?: PopoverTrigger;
  /** Placement */
  placement?: PopoverPlacement;
  /** Controlled open state */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Callback when open changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether to show arrow */
  arrow?: boolean;
  /** Overlay class name */
  overlayClassName?: string;
  /** Overlay style */
  overlayStyle?: CSSProperties;
  /** Mouse enter delay (seconds) */
  mouseEnterDelay?: number;
  /** Mouse leave delay (seconds) */
  mouseLeaveDelay?: number;
  /** Children trigger element */
  children?: ReactNode;
}
