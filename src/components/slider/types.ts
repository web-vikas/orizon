import type { CSSProperties, ReactNode } from "react";

export type SliderMarks = Record<
  number,
  ReactNode | { label: ReactNode; style?: CSSProperties }
>;

export interface SliderTooltipConfig {
  open?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  formatter?: ((value?: number) => ReactNode) | null;
}

export interface SliderProps {
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  onChangeComplete?: (value: number | [number, number]) => void;
  min?: number;
  max?: number;
  step?: number | null;
  range?: boolean;
  marks?: SliderMarks;
  dots?: boolean;
  disabled?: boolean;
  vertical?: boolean;
  tooltip?: SliderTooltipConfig;
  included?: boolean;
  reverse?: boolean;
  className?: string;
  style?: CSSProperties;
}
