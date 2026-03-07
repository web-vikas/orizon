import { createContext } from "react";
import type { ThemeConfig } from "./types";

export interface ConfigContextValue {
  theme?: ThemeConfig;
  componentSize?: "small" | "middle" | "large";
  direction?: "ltr" | "rtl";
}

export const ConfigContext = createContext<ConfigContextValue>({});
