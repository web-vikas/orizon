/**
 * @file AutoComplete — Public Barrel Export
 *
 * Re-exports the `<AutoComplete>` input component with dropdown
 * suggestions.
 */

import { InternalAutoComplete } from "./AutoComplete";

/**
 * AutoComplete input with filterable dropdown suggestions.
 *
 * Supports `options`, controlled / uncontrolled `value`, custom
 * `filterOption`, `allowClear`, `size`, `status`, and `variant`.
 *
 * @example
 * ```tsx
 * <AutoComplete
 *   options={[{ value: "React" }, { value: "Vue" }]}
 *   placeholder="Search..."
 *   onSelect={(val) => console.log(val)}
 * />
 * <AutoComplete size="large" variant="filled" allowClear />
 * ```
 */
const AutoComplete = InternalAutoComplete;

export { AutoComplete };
export type {
  AutoCompleteProps,
  AutoCompleteOption,
  AutoCompleteSize,
  AutoCompleteStatus,
  AutoCompleteVariant,
} from "./types";
