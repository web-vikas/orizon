/**
 * @file Rate component type definitions.
 *
 * Exports props for the `<Rate>` star-rating component including half-star
 * support, custom characters, tooltips, and hover callbacks.
 *
 * @see ./Rate.tsx  - component implementation
 * @see ./index.ts  - public export
 */
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
