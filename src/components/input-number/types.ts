/**
 * @file InputNumber component type definitions.
 *
 * Defines props for the `<InputNumber>` component, a numeric input with
 * stepper controls, min/max clamping, precision, formatting, and addons.
 *
 * @see {@link ./InputNumber.tsx} for the component implementation
 */
import type { CSSProperties, ReactNode } from "react";

export type InputNumberSize = "small" | "middle" | "large";
export type InputNumberStatus = "error" | "warning";
export type InputNumberVariant = "outlined" | "borderless" | "filled";

export interface InputNumberProps<T = number> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T | null) => void;
  min?: T;
  max?: T;
  step?: T extends number ? number : never;
  precision?: number;
  formatter?: (
    value: T | undefined,
    info: { userTyping: boolean; input: string }
  ) => string;
  parser?: (displayValue: string | undefined) => T;
  controls?:
    | boolean
    | { upIcon?: ReactNode; downIcon?: ReactNode };
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  size?: InputNumberSize;
  status?: InputNumberStatus;
  variant?: InputNumberVariant;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  stringMode?: boolean;
  keyboard?: boolean;
  changeOnWheel?: boolean;
  className?: string;
  style?: CSSProperties;
  onStep?: (
    value: number,
    info: { offset: number; type: "up" | "down" }
  ) => void;
  onPressEnter?: (e: React.KeyboardEvent) => void;
}
