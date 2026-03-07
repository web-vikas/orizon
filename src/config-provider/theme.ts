import type { SeedToken } from "./types";

const tokenToCssVar: Record<keyof SeedToken, string> = {
  colorPrimary: "--primary",
  colorSuccess: "--success",
  colorWarning: "--warning",
  colorError: "--destructive",
  colorInfo: "--info",
  colorTextBase: "--foreground",
  colorBgBase: "--background",
  borderRadius: "--radius",
  fontSize: "--orizon-font-size-base",
};

export function applyThemeTokens(element: HTMLElement, token: SeedToken) {
  for (const [key, cssVar] of Object.entries(tokenToCssVar)) {
    const value = token[key as keyof SeedToken];
    if (value !== undefined) {
      if (key === "borderRadius") {
        element.style.setProperty(cssVar, `${value}px`);
      } else if (key === "fontSize") {
        element.style.setProperty(cssVar, `${value}px`);
      } else if (typeof value === "string") {
        element.style.setProperty(cssVar, value);
      }
    }
  }
}

export const theme = {
  defaultAlgorithm: "default" as const,
  darkAlgorithm: "dark" as const,
  compactAlgorithm: "compact" as const,
};
