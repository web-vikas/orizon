import type { ReactNode, CSSProperties } from "react";

export type CalendarMode = "month" | "year";

export interface CalendarProps {
  /** Selected date value (controlled) */
  value?: Date;
  /** Default selected date */
  defaultValue?: Date;
  /** Calendar mode */
  mode?: CalendarMode;
  /** Whether to render full-screen calendar */
  fullscreen?: boolean;
  /** Custom cell render */
  cellRender?: (date: Date, info: { originNode: ReactNode; type: "date" | "month" }) => ReactNode;
  /** Custom header render */
  headerRender?: (config: {
    value: Date;
    type: CalendarMode;
    onChange: (date: Date) => void;
    onTypeChange: (type: CalendarMode) => void;
  }) => ReactNode;
  /** Whether date is disabled */
  disabledDate?: (date: Date) => boolean;
  /** Callback when date changes */
  onChange?: (date: Date) => void;
  /** Callback when panel mode changes */
  onPanelChange?: (date: Date, mode: CalendarMode) => void;
  /** Callback when date is selected */
  onSelect?: (date: Date, info: { source: "year" | "month" | "date" }) => void;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  /** Locale */
  locale?: {
    lang?: {
      locale?: string;
      monthFormat?: string;
    };
  };
}
