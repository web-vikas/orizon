import { InternalDatePicker } from "./DatePicker";
import { RangePicker } from "./RangePicker";

type DatePickerComponent = typeof InternalDatePicker & {
  RangePicker: typeof RangePicker;
};

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
