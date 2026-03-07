/**
 * @file Public API for the Slider component.
 * @see ./Slider.tsx - implementation
 */
import { InternalSlider } from "./Slider";

/**
 * Slider input for selecting a value or range from a continuous scale.
 *
 * @example
 * ```tsx
 * <Slider defaultValue={30} />
 * <Slider range defaultValue={[20, 50]} />
 * <Slider marks={{ 0: "0%", 50: "50%", 100: "100%" }} />
 * ```
 */
const Slider = InternalSlider;

export { Slider };
export type {
  SliderProps,
  SliderMarks,
  SliderTooltipConfig,
} from "./types";
