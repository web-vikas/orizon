/**
 * @file Message component type definitions.
 *
 * Defines types for the imperative `message` API that displays lightweight
 * toast-style feedback at the top of the viewport. Supports success, error,
 * info, warning, and loading message types.
 *
 * @see {@link ./messageManager.tsx} for the imperative API
 * @see {@link ./MessageContainer.tsx} for the rendering container
 */
import type { ReactNode, CSSProperties } from "react";

export type MessageType =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "loading";

export interface MessageConfig {
  /** Message content */
  content: ReactNode;
  /** Duration in seconds (0 means no auto-close) */
  duration?: number;
  /** Custom icon */
  icon?: ReactNode;
  /** Unique key for the message */
  key?: string | number;
  /** Extra class name */
  className?: string;
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Called when message closes */
  onClose?: () => void;
  /** Message type */
  type?: MessageType;
  /** Inline style */
  style?: CSSProperties;
}

export interface MessageGlobalConfig {
  /** Top offset */
  top?: number;
  /** Default duration in seconds */
  duration?: number;
  /** Maximum count of messages */
  maxCount?: number;
  /** Mount container */
  getContainer?: () => HTMLElement;
}

export interface MessageAPI {
  success: (
    content: ReactNode | MessageConfig,
    duration?: number,
    onClose?: () => void
  ) => MessageClosePromise;
  error: (
    content: ReactNode | MessageConfig,
    duration?: number,
    onClose?: () => void
  ) => MessageClosePromise;
  info: (
    content: ReactNode | MessageConfig,
    duration?: number,
    onClose?: () => void
  ) => MessageClosePromise;
  warning: (
    content: ReactNode | MessageConfig,
    duration?: number,
    onClose?: () => void
  ) => MessageClosePromise;
  loading: (
    content: ReactNode | MessageConfig,
    duration?: number,
    onClose?: () => void
  ) => MessageClosePromise;
  open: (config: MessageConfig) => MessageClosePromise;
  destroy: (key?: string | number) => void;
  config: (options: MessageGlobalConfig) => void;
}

export interface MessageClosePromise {
  (): void;
  then: (
    resolve: () => void,
    reject?: () => void
  ) => Promise<void>;
}

export interface MessageInstance {
  id: string;
  config: MessageConfig;
  type: MessageType;
  closing: boolean;
}
