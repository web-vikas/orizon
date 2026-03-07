import type { ReactNode, CSSProperties } from "react";

export type NotificationType = "success" | "error" | "info" | "warning";

export type NotificationPlacement =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight";

export interface NotificationConfig {
  /** Notification title */
  message?: ReactNode;
  /** Alias for message */
  title?: ReactNode;
  /** Description content */
  description?: ReactNode;
  /** Duration in seconds (0 means no auto-close) */
  duration?: number;
  /** Placement of the notification */
  placement?: NotificationPlacement;
  /** Custom icon */
  icon?: ReactNode;
  /** Unique key */
  key?: string | number;
  /** Action buttons area */
  actions?: ReactNode;
  /** Show countdown progress bar */
  showProgress?: boolean;
  /** Pause countdown on hover */
  pauseOnHover?: boolean;
  /** Extra class name */
  className?: string;
  /** Inline style */
  style?: CSSProperties;
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Called when notification closes */
  onClose?: () => void;
  /** Notification type */
  type?: NotificationType;
  /** Whether to show close button */
  closable?: boolean;
  /** Custom close icon */
  closeIcon?: ReactNode;
}

export interface NotificationGlobalConfig {
  /** Bottom offset */
  bottom?: number;
  /** Top offset */
  top?: number;
  /** Default placement */
  placement?: NotificationPlacement;
  /** Maximum count */
  maxCount?: number;
  /** Stack behavior */
  stack?: boolean | { threshold?: number };
}

export interface NotificationAPI {
  success: (config: NotificationConfig) => void;
  error: (config: NotificationConfig) => void;
  info: (config: NotificationConfig) => void;
  warning: (config: NotificationConfig) => void;
  open: (config: NotificationConfig) => void;
  destroy: (key?: string | number) => void;
  config: (options: NotificationGlobalConfig) => void;
}

export interface NotificationInstance {
  id: string;
  config: NotificationConfig;
  type?: NotificationType;
  closing: boolean;
  createdAt: number;
}
