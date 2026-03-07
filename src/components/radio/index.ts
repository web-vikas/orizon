import { InternalRadio } from "./Radio";
import { InternalRadioGroup } from "./RadioGroup";
import { RadioButton } from "./RadioButton";

type RadioComponent = typeof InternalRadio & {
  Group: typeof InternalRadioGroup;
  Button: typeof RadioButton;
};

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
