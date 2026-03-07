import type { ReactNode } from "react";

export type AlertType = "success" | "info" | "warning" | "error";

export interface AlertClosableConfig {
  closeIcon?: ReactNode;
  afterClose?: () => void;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface AlertProps {
  /** Alert type */
  type?: AlertType;
  /** Alert title / message */
  message?: ReactNode;
  /** Alias for message */
  title?: ReactNode;
  /** Additional description below the title */
  description?: ReactNode;
  /** Whether alert can be closed */
  closable?: boolean | AlertClosableConfig;
  /** Show type icon */
  showIcon?: boolean;
  /** Custom icon */
  icon?: ReactNode;
  /** Action area on the right */
  action?: ReactNode;
  /** Banner mode (no border, full width) */
  banner?: boolean;
  /** Called after close animation finishes */
  afterClose?: () => void;
  /** Custom close icon */
  closeIcon?: ReactNode;
  /** Called when close button is clicked */
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Extra class name */
  className?: string;
  /** Inline style */
  style?: React.CSSProperties;
}

export interface AlertErrorBoundaryProps {
  /** Title shown in the error alert */
  message?: ReactNode;
  /** Description shown in the error alert */
  description?: ReactNode;
  /** Children to wrap */
  children?: ReactNode;
}
