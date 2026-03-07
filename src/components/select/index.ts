/**
 * @file Public API for the Select component.
 * @see ./Select.tsx - implementation
 */
import { InternalSelect } from "./Select";

/**
 * Dropdown selector supporting single, multiple, and tags modes.
 *
 * @example
 * ```tsx
 * <Select options={[{ label: "Apple", value: "apple" }]} />
 * <Select mode="multiple" options={options} allowClear showSearch />
 * <Select mode="tags" placeholder="Enter tags" />
 * ```
 */
const Select = InternalSelect;

export { Select };
export type {
  SelectProps,
  SelectOptionType,
  LabeledValue,
  FieldNames,
} from "./types";
