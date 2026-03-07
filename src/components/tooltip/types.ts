/**
 * @file Tooltip component type definitions.
 *
 * Provides `TooltipProps` for the pop-up hint overlay, plus the
 * `TooltipPlacement` and `TooltipTrigger` union types.
 *
 * @see {@link ./Tooltip.tsx} for the implementation.
 * @see {@link ./index.ts} for the public export.
 */
import type { ReactNode, CSSProperties } from "react";

export type TooltipPlacement =
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

export type TooltipTrigger = "hover" | "focus" | "click";

export interface TooltipProps {
  /** Tooltip content */
  title?: ReactNode | (() => ReactNode);
  /** Placement position */
  placement?: TooltipPlacement;
  /** Trigger mode */
  trigger?: TooltipTrigger;
  /** Controlled open state */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Callback when open changes */
  onOpenChange?: (open: boolean) => void;
  /** Custom background color */
  color?: string;
  /** Whether to show arrow */
  arrow?: boolean;
  /** Overlay class name */
  overlayClassName?: string;
  /** Overlay style */
  overlayStyle?: CSSProperties;
  /** Mouse enter delay in seconds */
  mouseEnterDelay?: number;
  /** Mouse leave delay in seconds */
  mouseLeaveDelay?: number;
  /** Destroy on hide */
  destroyTooltipOnHide?: boolean;
  /** Children trigger element */
  children?: ReactNode;
}
