import type { ReactNode, HTMLAttributes, ElementType } from "react";

export type FlexGap = "small" | "middle" | "large" | number | string;

export interface FlexProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** If true, direction is column */
  vertical?: boolean;
  /** CSS flex-wrap value */
  wrap?: boolean | "wrap" | "nowrap" | "wrap-reverse";
  /** CSS justify-content value */
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "start"
    | "end"
    | "normal";
  /** CSS align-items value */
  align?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "stretch"
    | "baseline"
    | "start"
    | "end"
    | "normal";
  /** Gap between items - named size or CSS value */
  gap?: FlexGap;
  /** Flex value (flex CSS shorthand) */
  flex?: string | number;
  /** Render as a different element type */
  component?: ElementType;
  /** Extra class name */
  className?: string;
  children?: ReactNode;
}
