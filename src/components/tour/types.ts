/**
 * @file Tour component type definitions.
 *
 * Provides `TourProps` for the guided walkthrough overlay,
 * `TourStepConfig` for individual tour step configuration,
 * and the `TourPlacement` / `TourType` union types.
 *
 * @see {@link ./Tour.tsx} for the implementation.
 * @see {@link ./index.ts} for the public export.
 */
import type { ReactNode, CSSProperties, RefObject } from "react";

export type TourPlacement =
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
  | "rightBottom"
  | "center";

export type TourType = "default" | "primary";

export interface TourStepConfig {
  /** Target element ref or selector */
  target?: RefObject<HTMLElement> | (() => HTMLElement | null) | null;
  /** Step title */
  title?: ReactNode;
  /** Step description */
  description?: ReactNode;
  /** Cover image/content */
  cover?: ReactNode;
  /** Placement of the popover */
  placement?: TourPlacement;
  /** Whether to show mask */
  mask?: boolean;
  /** Custom mask style */
  maskStyle?: CSSProperties;
  /** Custom next button text */
  nextButtonProps?: { children?: ReactNode; onClick?: () => void };
  /** Custom prev button text */
  prevButtonProps?: { children?: ReactNode; onClick?: () => void };
  /** Step type */
  type?: TourType;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: CSSProperties;
}

export interface TourProps {
  /** Tour step configurations */
  steps: TourStepConfig[];
  /** Controlled open state */
  open?: boolean;
  /** Current step (controlled) */
  current?: number;
  /** Callback when step changes */
  onChange?: (current: number) => void;
  /** Callback when tour is closed */
  onClose?: () => void;
  /** Callback when tour finishes */
  onFinish?: () => void;
  /** Tour type */
  type?: TourType;
  /** Whether to show mask overlay */
  mask?: boolean;
  /** Whether to show arrow */
  arrow?: boolean;
  /** Custom indicator render */
  indicatorsRender?: (current: number, total: number) => ReactNode;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  /** Z-index */
  zIndex?: number;
}
