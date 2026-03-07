/**
 * @file ColorPicker — Public Barrel Export
 *
 * Re-exports the `<ColorPicker>` colour selection component.
 */

import { InternalColorPicker } from "./ColorPicker";

/**
 * ColorPicker component for selecting colours.
 *
 * Opens a popover with a saturation canvas, hue slider, optional
 * alpha slider, format switcher (hex / rgb / hsb), and preset
 * colour swatches. Supports `showText`, `trigger` (click / hover),
 * and `size`.
 *
 * @example
 * ```tsx
 * <ColorPicker defaultValue="#1677ff" />
 * <ColorPicker showText format="rgb" />
 * <ColorPicker
 *   presets={[{ label: "Brand", colors: ["#1677ff", "#52c41a"] }]}
 * />
 * ```
 */
const ColorPicker = InternalColorPicker;

export { ColorPicker };
export type {
  ColorPickerProps,
  ColorFormat,
  ColorPickerSize,
  ColorPickerTrigger,
  ColorPreset,
} from "./types";
