/**
 * @file DatePicker Type Definitions
 *
 * Props for `<DatePicker>` and `<DatePicker.RangePicker>`. Supports
 * date selection, format strings, disabled dates, presets, size /
 * status / variant styling, and range selection with two calendars.
 *
 * @see {@link ./DatePicker.tsx} — single date picker implementation
 * @see {@link ./RangePicker.tsx} — range picker implementation
 */

import type { CSSProperties, ReactNode } from "react";

export type DatePickerSize = "small" | "middle" | "large";
export type DatePickerStatus = "error" | "warning";
export type DatePickerVariant = "outlined" | "borderless" | "filled";
export type PickerMode = "date" | "week" | "month" | "quarter" | "year";
export type DatePickerPlacement =
  | "bottomLeft"
  | "bottomRight"
  | "topLeft"
  | "topRight";

export interface PresetDate {
  label: ReactNode;
  value: Date;
}

export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | null, dateString: string) => void;
  picker?: PickerMode;
  format?: string;
  showTime?: boolean | { format?: string };
  showNow?: boolean;
  showToday?: boolean;
  disabled?: boolean;
  disabledDate?: (currentDate: Date) => boolean;
  placeholder?: string;
  size?: DatePickerSize;
  status?: DatePickerStatus;
  variant?: DatePickerVariant;
  placement?: DatePickerPlacement;
  allowClear?: boolean;
  presets?: PresetDate[];
  suffixIcon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  popupClassName?: string;
  popupStyle?: CSSProperties;
}

export interface RangePickerProps {
  value?: [Date | null, Date | null];
  defaultValue?: [Date | null, Date | null];
  onChange?: (
    dates: [Date | null, Date | null],
    dateStrings: [string, string]
  ) => void;
  picker?: PickerMode;
  format?: string;
  showTime?: boolean | { format?: string };
  disabled?: boolean | [boolean, boolean];
  disabledDate?: (currentDate: Date) => boolean;
  placeholder?: [string, string];
  size?: DatePickerSize;
  status?: DatePickerStatus;
  variant?: DatePickerVariant;
  placement?: DatePickerPlacement;
  allowClear?: boolean;
  presets?: PresetDate[];
  separator?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
