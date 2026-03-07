import type { CSSProperties, ReactNode } from "react";

export interface RateProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  count?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  character?:
    | ReactNode
    | ((info: { index: number; value: number }) => ReactNode);
  disabled?: boolean;
  tooltips?: string[];
  className?: string;
  style?: CSSProperties;
  onHoverChange?: (value: number) => void;
}
