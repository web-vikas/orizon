/**
 * @file DatePicker — Public Barrel Export
 *
 * Composes `InternalDatePicker` + `RangePicker` into a single
 * `DatePicker` export with a `.RangePicker` static property.
 */

import { InternalDatePicker } from "./DatePicker";
import { RangePicker } from "./RangePicker";

type DatePickerComponent = typeof InternalDatePicker & {
  RangePicker: typeof RangePicker;
};

/**
 * DatePicker component for selecting a single date.
 *
 * Opens a calendar dropdown with month navigation, today button,
 * and optional presets. Supports `format`, `disabledDate`,
 * `allowClear`, `size`, `status`, and `variant`.
 *
 * Use `DatePicker.RangePicker` to select a start and end date
 * with two side-by-side calendar panels.
 *
 * @example
 * ```tsx
 * <DatePicker placeholder="Select date" />
 * <DatePicker format="MM/DD/YYYY" allowClear />
 *
 * <DatePicker.RangePicker
 *   placeholder={["Start", "End"]}
 *   onChange={(dates) => console.log(dates)}
 * />
 * ```
 */
const DatePicker = InternalDatePicker as DatePickerComponent;
DatePicker.RangePicker = RangePicker;

export { DatePicker };
export type {
  DatePickerProps,
  RangePickerProps,
  DatePickerSize,
  DatePickerStatus,
  DatePickerVariant,
  PickerMode,
  DatePickerPlacement,
  PresetDate,
} from "./types";
