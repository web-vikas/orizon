import type { ReactNode } from "react";

export interface SeedToken {
  colorPrimary?: string;
  colorSuccess?: string;
  colorWarning?: string;
  colorError?: string;
  colorInfo?: string;
  colorTextBase?: string;
  colorBgBase?: string;
  borderRadius?: number;
  fontSize?: number;
}

export type ThemeAlgorithm = "default" | "dark" | "compact";

export interface ThemeConfig {
  token?: SeedToken;
  algorithm?: ThemeAlgorithm;
}

export interface ConfigProviderProps {
  theme?: ThemeConfig;
  componentSize?: "small" | "middle" | "large";
  direction?: "ltr" | "rtl";
  children: ReactNode;
}
