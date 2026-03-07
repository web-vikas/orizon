/**
 * @file Segmented component type definitions.
 *
 * Exports props for the `<Segmented>` tab-like toggle control including
 * option objects with icons, sizes, and block mode.
 *
 * @see ./Segmented.tsx - component implementation
 * @see ./index.ts      - public export
 */
import type { ReactNode, CSSProperties } from "react";

export type SegmentedSize = "large" | "middle" | "small";

export interface SegmentedOption {
  label: ReactNode;
  value: string | number;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export type SegmentedOptionType = string | number | SegmentedOption;

export interface SegmentedProps {
  /** Options for the segmented control */
  options: SegmentedOptionType[];
  /** Currently selected value (controlled) */
  value?: string | number;
  /** Default selected value */
  defaultValue?: string | number;
  /** Callback when selection changes */
  onChange?: (value: string | number) => void;
  /** Full width */
  block?: boolean;
  /** Disable all options */
  disabled?: boolean;
  /** Size */
  size?: SegmentedSize;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
}
