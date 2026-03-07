/**
 * @file Checkbox — Public Barrel Export
 *
 * Composes `InternalCheckbox` + `CheckboxGroup` into a single
 * `Checkbox` export with a `.Group` static property.
 */

import { InternalCheckbox } from "./Checkbox";
import { CheckboxGroup } from "./CheckboxGroup";

type CheckboxComponent = typeof InternalCheckbox & {
  Group: typeof CheckboxGroup;
};

/**
 * Checkbox component with label support.
 *
 * Supports `checked`, `defaultChecked`, `indeterminate`, and
 * `disabled`. Use `Checkbox.Group` for multi-select with an
 * `options` array or child composition.
 *
 * @example
 * ```tsx
 * <Checkbox>Remember me</Checkbox>
 * <Checkbox indeterminate>Select all</Checkbox>
 *
 * <Checkbox.Group
 *   options={["Apple", "Pear", "Orange"]}
 *   defaultValue={["Apple"]}
 *   onChange={(vals) => console.log(vals)}
 * />
 * ```
 */
const Checkbox = InternalCheckbox as CheckboxComponent;
(Checkbox as any).Group = CheckboxGroup;

export { Checkbox };
export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxChangeEvent,
  CheckboxOptionType,
} from "./types";
