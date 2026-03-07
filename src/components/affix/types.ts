import type { CSSProperties, ReactNode } from "react";

export interface AffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  target?: () => HTMLElement | Window;
  onChange?: (affixed: boolean) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
