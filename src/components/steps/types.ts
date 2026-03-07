/**
 * @file Steps component type definitions.
 *
 * Exports prop interfaces for the step-by-step navigation / progress
 * component including `StepsProps`, individual `StepItem`, direction,
 * type, size, and status enums.
 *
 * @see {@link ./Steps.tsx} for the implementation.
 * @see {@link ./index.ts} for the public export.
 */
import type { ReactNode, CSSProperties } from "react";

export type StepsDirection = "horizontal" | "vertical";
export type StepsType = "default" | "navigation" | "dot" | "inline";
export type StepsSize = "small" | "default";
export type StepStatus = "wait" | "process" | "finish" | "error";

export interface StepItem {
  /** Title of the step */
  title: ReactNode;
  /** Description of the step */
  description?: ReactNode;
  /** Custom icon for the step */
  icon?: ReactNode;
  /** Status of the step (overrides computed status) */
  status?: StepStatus;
  /** Whether the step is disabled */
  disabled?: boolean;
  /** Subtitle (inline type only) */
  subTitle?: ReactNode;
}

export interface StepsProps {
  /** Current step index (zero-based) */
  current?: number;
  /** Step items */
  items?: StepItem[];
  /** Direction of the steps layout */
  direction?: StepsDirection;
  /** Type of steps display */
  type?: StepsType;
  /** Overall status of the current step */
  status?: StepStatus;
  /** Size */
  size?: StepsSize;
  /** Whether to make steps clickable */
  onChange?: (current: number) => void;
  /** Initial step (zero-based) */
  initial?: number;
  /** Enable label placement under the icon */
  labelPlacement?: "horizontal" | "vertical";
  /** Whether progress dot type should use a custom render */
  progressDot?: boolean | ((dot: ReactNode, info: { index: number; status: StepStatus; title: ReactNode; description: ReactNode }) => ReactNode);
  /** Percent of current step */
  percent?: number;
  /** Responsive support */
  responsive?: boolean;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
}
