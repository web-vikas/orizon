/**
 * @file Public API for the Radio component.
 *
 * Re-exports `<Radio>` with `.Group` and `.Button` sub-components.
 *
 * @see ./Radio.tsx       - individual radio
 * @see ./RadioGroup.tsx  - group wrapper
 * @see ./RadioButton.tsx - button-style radio
 */
import { InternalRadio } from "./Radio";
import { InternalRadioGroup } from "./RadioGroup";
import { RadioButton } from "./RadioButton";

type RadioComponent = typeof InternalRadio & {
  Group: typeof InternalRadioGroup;
  Button: typeof RadioButton;
};

/**
 * Radio input for single-choice selection from a set of options.
 *
 * Use `Radio.Group` for managing a group of radios, and `Radio.Button`
 * for button-styled radio options.
 *
 * @example
 * ```tsx
 * <Radio.Group value={value} onChange={handleChange}>
 *   <Radio value="a">Option A</Radio>
 *   <Radio value="b">Option B</Radio>
 * </Radio.Group>
 *
 * <Radio.Group optionType="button" buttonStyle="solid"
 *   options={["Small", "Medium", "Large"]} />
 * ```
 */
const Radio = InternalRadio as RadioComponent;
(Radio as any).Group = InternalRadioGroup;
(Radio as any).Button = RadioButton;

export { Radio };
export type {
  RadioProps,
  RadioGroupProps,
  RadioButtonProps,
  RadioChangeEvent,
  RadioOptionType,
} from "./types";
