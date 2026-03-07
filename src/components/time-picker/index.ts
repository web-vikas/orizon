import { InternalTimePicker } from "./TimePicker";
import { TimeRangePicker } from "./TimeRangePicker";

type TimePickerComponent = typeof InternalTimePicker & {
  RangePicker: typeof TimeRangePicker;
};

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
