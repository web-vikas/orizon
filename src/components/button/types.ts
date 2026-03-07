import type { ReactNode, MouseEventHandler, ButtonHTMLAttributes } from "react";

export type ButtonType = "primary" | "default" | "dashed" | "link" | "text";
export type ButtonSize = "small" | "middle" | "large";
export type ButtonShape = "default" | "circle" | "round";
export type ButtonHTMLType = "button" | "submit" | "reset";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** Antd button type */
  type?: ButtonType;
  /** Size of button */
  size?: ButtonSize;
  /** Shape of button */
  shape?: ButtonShape;
  /** Show loading spinner */
  loading?: boolean;
  /** Danger styling */
  danger?: boolean;
  /** Ghost styling (transparent background) */
  ghost?: boolean;
  /** Full width */
  block?: boolean;
  /** Icon placed before children */
  icon?: ReactNode;
  /** Icon placement */
  iconPosition?: "start" | "end";
  /** HTML button type attribute */
  htmlType?: ButtonHTMLType;
  /** Click handler */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

export interface ButtonGroupProps {
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
}
