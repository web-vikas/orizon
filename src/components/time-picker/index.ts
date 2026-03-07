import { InternalTimePicker } from "./TimePicker";
import { TimeRangePicker } from "./TimeRangePicker";

type TimePickerComponent = typeof InternalTimePicker & {
  RangePicker: typeof TimeRangePicker;
};

/**
 * TimePicker component for selecting a time value via scrollable
 * hour / minute / second columns.
 *
 * Includes a `TimePicker.RangePicker` sub-component for selecting
 * a start and end time range.
 *
 * @example
 * ```tsx
 * <TimePicker placeholder="Select time" />
 * <TimePicker.RangePicker placeholder={["Start", "End"]} />
 * ```
 */
const TimePicker = InternalTimePicker as TimePickerComponent;
TimePicker.RangePicker = TimeRangePicker;

export { TimePicker };
export type {
  TimePickerProps,
  TimeRangePickerProps,
  TimePickerSize,
  TimePickerStatus,
  TimePickerVariant,
} from "./types";
