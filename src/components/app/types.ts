/**
 * @file App Type Definitions
 *
 * Props interface for the `<App>` provider component that supplies
 * context-based imperative APIs for message, notification, and modal.
 *
 * @see {@link ./App.tsx} — component implementation
 */

import type { ReactNode, CSSProperties } from "react";

export interface AppProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  component?: keyof React.JSX.IntrinsicElements | false;
  message?: Record<string, unknown>;
  notification?: Record<string, unknown>;
}
