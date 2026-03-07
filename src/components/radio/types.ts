import type { ReactNode } from "react";

export type ComponentSize = "small" | "middle" | "large";

export interface RadioChangeEvent {
  target: {
    checked: boolean;
    value: any;
  };
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: Event | undefined;
}

export interface RadioProps {
  /** Whether the radio is checked (controlled) */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Value of this radio */
  value?: any;
  /** Callback when state changes */
  onChange?: (e: RadioChangeEvent) => void;
  /** Label content */
  children?: ReactNode;
  /** Additional class name */
  className?: string;
  /** ID attribute */
  id?: string;
  /** Name attribute */
  name?: string;
}

export interface RadioOptionType {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Options to render */
  options?: (string | number | RadioOptionType)[];
  /** Controlled selected value */
  value?: any;
  /** Default selected value */
  defaultValue?: any;
  /** Callback when selected value changes */
  onChange?: (e: RadioChangeEvent) => void;
  /** Render as button-styled options */
  optionType?: "default" | "button";
  /** Button style variant (only when optionType="button") */
  buttonStyle?: "outline" | "solid";
  /** Size of the radio group */
  size?: ComponentSize;
  /** Disable all radios in the group */
  disabled?: boolean;
  /** Whether buttons take full width */
  block?: boolean;
  /** Additional class name */
  className?: string;
  /** Name attribute for all radios */
  name?: string;
  /** Child content (alternative to options prop) */
  children?: ReactNode;
}

export interface RadioButtonProps {
  /** Value of this radio button */
  value: any;
  /** Whether the radio button is disabled */
  disabled?: boolean;
  /** Label content */
  children?: ReactNode;
  /** Additional class name */
  className?: string;
}
