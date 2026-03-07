import type { ReactNode, CSSProperties } from "react";

export type SpinSize = "small" | "middle" | "large";

export interface SpinProps {
  /** Whether the spin is active */
  spinning?: boolean;
  /** Size of the spinner */
  size?: SpinSize;
  /** Delay before showing spinner (ms) */
  delay?: number;
  /** Custom spinner indicator */
  indicator?: ReactNode;
  /** Tip/description text below the spinner */
  tip?: ReactNode;
  /** Alias for tip */
  description?: ReactNode;
  /** Whether to show fullscreen overlay */
  fullscreen?: boolean;
  /** Progress percentage ("auto" for indeterminate, or number) */
  percent?: "auto" | number;
  /** Wrapper class name when wrapping children */
  wrapperClassName?: string;
  /** Children to wrap with spin overlay */
  children?: ReactNode;
  /** Extra class name */
  className?: string;
  /** Inline style */
  style?: CSSProperties;
}
