/**
 * @file TimePicker component type definitions.
 *
 * Provides prop interfaces for the time-picker input and its
 * `TimePicker.RangePicker` sub-component including size, status,
 * variant, 12-hour mode, and disabled-time configuration.
 *
 * @see {@link ./TimePicker.tsx} for the implementation.
 * @see {@link ./TimeRangePicker.tsx} for the range variant.
 * @see {@link ./index.ts} for the public export.
 */
import type { CSSProperties, ReactNode } from "react";

export type TimePickerSize = "small" | "middle" | "large";
export type TimePickerStatus = "error" | "warning";
export type TimePickerVariant = "outlined" | "borderless" | "filled";

export interface TimePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (time: Date | null, timeString: string) => void;
  format?: string;
  use12Hours?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  showNow?: boolean;
  disabled?: boolean;
  placeholder?: string;
  size?: TimePickerSize;
  status?: TimePickerStatus;
  variant?: TimePickerVariant;
  allowClear?: boolean;
  suffixIcon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideDisabledOptions?: boolean;
  disabledTime?: () => {
    disabledHours?: () => number[];
    disabledMinutes?: (selectedHour: number) => number[];
    disabledSeconds?: (
      selectedHour: number,
      selectedMinute: number
    ) => number[];
  };
}

export interface TimeRangePickerProps {
  value?: [Date | null, Date | null];
  defaultValue?: [Date | null, Date | null];
  onChange?: (
    times: [Date | null, Date | null],
    timeStrings: [string, string]
  ) => void;
  format?: string;
  use12Hours?: boolean;
  disabled?: boolean | [boolean, boolean];
  placeholder?: [string, string];
  size?: TimePickerSize;
  status?: TimePickerStatus;
  variant?: TimePickerVariant;
  allowClear?: boolean;
  className?: string;
  style?: CSSProperties;
  order?: boolean;
}
