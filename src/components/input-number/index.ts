import { InternalInputNumber } from "./InputNumber";

/**
 * InputNumber component for numeric input with stepper controls.
 *
 * @example
 * ```tsx
 * <InputNumber min={0} max={100} defaultValue={50} />
 * <InputNumber prefix="$" step={0.01} precision={2} />
 * <InputNumber addonBefore="+" addonAfter="%" />
 * ```
 */
const InputNumber = InternalInputNumber;

export { InputNumber };
export type {
  InputNumberProps,
  InputNumberSize,
  InputNumberStatus,
  InputNumberVariant,
} from "./types";
