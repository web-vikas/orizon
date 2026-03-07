import { InternalCheckbox } from "./Checkbox";
import { CheckboxGroup } from "./CheckboxGroup";

type CheckboxComponent = typeof InternalCheckbox & {
  Group: typeof CheckboxGroup;
};

const Checkbox = InternalCheckbox as CheckboxComponent;
(Checkbox as any).Group = CheckboxGroup;

export { Checkbox };
export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxChangeEvent,
  CheckboxOptionType,
} from "./types";
