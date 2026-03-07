/**
 * @file ColorPicker Type Definitions
 *
 * Props and config interfaces for the `<ColorPicker>` component.
 * Supports hex / rgb / hsb formats, alpha channel, preset colours,
 * trigger modes, and custom size.
 *
 * @see {@link ./ColorPicker.tsx} — component implementation
 */

import type { CSSProperties, ReactNode } from "react";

export type ColorFormat = "hex" | "rgb" | "hsb";
export type ColorPickerSize = "small" | "middle" | "large";
export type ColorPickerTrigger = "click" | "hover";

export interface ColorPreset {
  label: ReactNode;
  colors: string[];
  defaultOpen?: boolean;
}

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onChangeComplete?: (value: string) => void;
  format?: ColorFormat;
  defaultFormat?: ColorFormat;
  onFormatChange?: (format: ColorFormat) => void;
  showText?: boolean | ((color: string) => ReactNode);
  presets?: ColorPreset[];
  allowClear?: boolean;
  disabled?: boolean;
  disabledAlpha?: boolean;
  size?: ColorPickerSize;
  trigger?: ColorPickerTrigger;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
