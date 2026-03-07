import type { ReactNode } from "react";
import type { ButtonProps } from "../button";

export type PopconfirmPlacement =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight"
  | "left"
  | "leftTop"
  | "leftBottom"
  | "right"
  | "rightTop"
  | "rightBottom";

export interface PopconfirmProps {
  /** Title of the confirm popup */
  title: ReactNode | (() => ReactNode);
  /** Description text */
  description?: ReactNode | (() => ReactNode);
  /** Callback when OK is clicked */
  onConfirm?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback when Cancel is clicked */
  onCancel?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** OK button text */
  okText?: ReactNode;
  /** Cancel button text */
  cancelText?: ReactNode;
  /** OK button type */
  okType?: ButtonProps["type"];
  /** OK button extra props */
  okButtonProps?: Partial<ButtonProps>;
  /** Cancel button extra props */
  cancelButtonProps?: Partial<ButtonProps>;
  /** Custom icon */
  icon?: ReactNode;
  /** Whether the popconfirm is disabled */
  disabled?: boolean;
  /** Placement of the popup */
  placement?: PopconfirmPlacement;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether to show cancel button */
  showCancel?: boolean;
  /** Trigger element */
  children?: ReactNode;
  /** Extra class name */
  className?: string;
}
