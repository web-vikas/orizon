import type { ReactNode, CSSProperties } from "react";

export type ResultStatus =
  | "success"
  | "error"
  | "info"
  | "warning"
  | 404
  | 403
  | 500;

export interface ResultProps {
  /** Result status */
  status?: ResultStatus;
  /** Title text */
  title?: ReactNode;
  /** Sub title text */
  subTitle?: ReactNode;
  /** Custom icon */
  icon?: ReactNode;
  /** Extra action area */
  extra?: ReactNode;
  /** Children content */
  children?: ReactNode;
  /** Extra class name */
  className?: string;
  /** Inline style */
  style?: CSSProperties;
}
