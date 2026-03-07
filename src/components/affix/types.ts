/**
 * @file Affix Type Definitions
 *
 * Props interface for the `<Affix>` wrapper component that pins its
 * children to the viewport when scrolling past a threshold.
 *
 * @see {@link ./Affix.tsx} — component implementation
 */

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
