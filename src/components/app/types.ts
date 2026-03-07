import type { ReactNode, CSSProperties } from "react";

export interface AppProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  component?: keyof React.JSX.IntrinsicElements | false;
  message?: Record<string, unknown>;
  notification?: Record<string, unknown>;
}
