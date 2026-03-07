/**
 * @file Cascader — Public Barrel Export
 *
 * Re-exports the `<Cascader>` hierarchical dropdown selector.
 */

import { InternalCascader } from "./Cascader";

/**
 * Cascader component for hierarchical selection.
 *
 * Drills into nested option columns. Supports `multiple` selection,
 * `expandTrigger` (click / hover), `showSearch`, `changeOnSelect`,
 * `loadData` for lazy loading, and `allowClear`.
 *
 * @example
 * ```tsx
 * <Cascader
 *   options={[
 *     { value: "zhejiang", label: "Zhejiang", children: [
 *       { value: "hangzhou", label: "Hangzhou" },
 *     ]},
 *   ]}
 *   placeholder="Select location"
 *   onChange={(val, opts) => console.log(val, opts)}
 * />
 * ```
 */
const Cascader = InternalCascader;

export { Cascader };
export type {
  CascaderProps,
  CascaderOption,
  CascaderSize,
  CascaderStatus,
  CascaderVariant,
  CascaderExpandTrigger,
  CascaderPlacement,
} from "./types";
