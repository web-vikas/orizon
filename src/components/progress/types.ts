import type { ReactNode, CSSProperties } from "react";

export type ProgressType = "line" | "circle" | "dashboard";
export type ProgressStatus = "success" | "exception" | "normal" | "active";
export type ProgressStrokeLinecap = "round" | "butt" | "square";

export interface ProgressSuccessConfig {
  percent?: number;
  strokeColor?: string;
}

export type ProgressSize = "small" | "default" | [number, number];

export interface ProgressProps {
  /** Completion percentage */
  percent?: number;
  /** Type of progress bar */
  type?: ProgressType;
  /** Status of the progress */
  status?: ProgressStatus;
  /** Stroke color */
  strokeColor?: string | string[] | Record<string, string>;
  /** Whether to show info text */
  showInfo?: boolean;
  /** Size of the progress */
  size?: ProgressSize;
  /** Number of steps (for segmented line) */
  steps?: number;
  /** Custom format function */
  format?: (percent?: number, successPercent?: number) => ReactNode;
  /** Stroke linecap style */
  strokeLinecap?: ProgressStrokeLinecap;
  /** Success segment config */
  success?: ProgressSuccessConfig;
  /** Rail (track) color */
  railColor?: string;
  /** Stroke width in px */
  strokeWidth?: number;
  /** Extra class name */
  className?: string;
  /** Inline style */
  style?: CSSProperties;
}
