/**
 * @file Statistic component type definitions.
 *
 * Provides prop interfaces for the Statistic value display and the
 * Statistic.Countdown timer sub-component.
 *
 * @see {@link ./Statistic.tsx} for the implementation.
 * @see {@link ./index.ts} for the public export.
 */
import type { ReactNode, CSSProperties } from "react";

export interface StatisticProps {
  /** Title text */
  title?: ReactNode;
  /** Numeric or string value */
  value?: number | string;
  /** Decimal precision */
  precision?: number;
  /** Prefix element */
  prefix?: ReactNode;
  /** Suffix element */
  suffix?: ReactNode;
  /** Value text style */
  valueStyle?: CSSProperties;
  /** Custom value formatter */
  formatter?: (value: number | string) => ReactNode;
  /** Group separator for numbers */
  groupSeparator?: string;
  /** Loading skeleton */
  loading?: boolean;
  /** Decimal separator */
  decimalSeparator?: string;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
}

export interface CountdownProps extends Omit<StatisticProps, "value"> {
  /** Target timestamp (Date, number, or dayjs-like value) */
  value: number | Date;
  /** Display format string (e.g., "HH:mm:ss", "D days HH:mm:ss") */
  format?: string;
  /** Callback when countdown finishes */
  onFinish?: () => void;
  /** Callback on each tick */
  onChange?: (value: number) => void;
}
