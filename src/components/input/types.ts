/**
 * @file Input component type definitions.
 *
 * Defines props for `<Input>`, `<Input.Password>`, `<Input.TextArea>`,
 * `<Input.Search>`, and `<Input.OTP>`. Covers size, variant, status,
 * prefix/suffix, addons, clear button, and character counting.
 *
 * @see {@link ./Input.tsx} for the base input
 * @see {@link ./Password.tsx} for the password variant
 * @see {@link ./TextArea.tsx} for the textarea variant
 * @see {@link ./Search.tsx} for the search variant
 * @see {@link ./OTP.tsx} for the OTP input
 */
import type {
  ReactNode,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  KeyboardEventHandler,
  ChangeEventHandler,
} from "react";

// ---------------------------------------------------------------------------
// Shared
// ---------------------------------------------------------------------------

export type InputSize = "small" | "middle" | "large";
export type InputStatus = "error" | "warning";
export type InputVariant = "outlined" | "borderless" | "filled" | "underlined";

export interface ShowCountInfo {
  value: string;
  count: number;
  maxLength?: number;
}

export type ShowCountFormatter = (info: ShowCountInfo) => ReactNode;

// ---------------------------------------------------------------------------
// InputProps
// ---------------------------------------------------------------------------

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "prefix" | "onChange"
  > {
  /** Controlled value */
  value?: string;
  /** Default (uncontrolled) value */
  defaultValue?: string;
  /** Change handler – receives the native React ChangeEvent */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Component size */
  size?: InputSize;
  /** Prefix icon / node rendered inside the input (left) */
  prefix?: ReactNode;
  /** Suffix icon / node rendered inside the input (right) */
  suffix?: ReactNode;
  /** Addon rendered *before* the input as a separate segment */
  addonBefore?: ReactNode;
  /** Addon rendered *after* the input as a separate segment */
  addonAfter?: ReactNode;
  /** Show a clear button when the input has value */
  allowClear?: boolean | { clearIcon?: ReactNode };
  /** Validation status */
  status?: InputStatus;
  /** Visual variant */
  variant?: InputVariant;
  /** Display character count below / after the input */
  showCount?: boolean | ShowCountFormatter;
  /** Maximum number of characters */
  maxLength?: number;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Callback fired when Enter is pressed */
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
  /** Callback fired when the clear button is clicked */
  onClear?: () => void;
  /** Extra class name */
  className?: string;
}

// ---------------------------------------------------------------------------
// InputPasswordProps
// ---------------------------------------------------------------------------

export interface InputPasswordProps extends Omit<InputProps, "type"> {
  /** Whether to show the toggle icon – defaults to true */
  visibilityToggle?: boolean;
  /** Controlled visible state */
  visible?: boolean;
  /** Callback when visibility changes */
  onVisibleChange?: (visible: boolean) => void;
  /** Custom icons: [visible, hidden] */
  iconRender?: (visible: boolean) => ReactNode;
}

// ---------------------------------------------------------------------------
// InputTextAreaProps
// ---------------------------------------------------------------------------

export interface AutoSizeConfig {
  minRows?: number;
  maxRows?: number;
}

export interface InputTextAreaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange"
  > {
  /** Controlled value */
  value?: string;
  /** Default (uncontrolled) value */
  defaultValue?: string;
  /** Change handler */
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  /** Auto-resize the textarea to fit content */
  autoSize?: boolean | AutoSizeConfig;
  /** Display character count */
  showCount?: boolean | ShowCountFormatter;
  /** Maximum number of characters */
  maxLength?: number;
  /** Component size */
  size?: InputSize;
  /** Validation status */
  status?: InputStatus;
  /** Visual variant */
  variant?: InputVariant;
  /** Callback fired when Enter is pressed */
  onPressEnter?: KeyboardEventHandler<HTMLTextAreaElement>;
  /** Callback fired when the clear button is clicked */
  onClear?: () => void;
  /** Show a clear button */
  allowClear?: boolean | { clearIcon?: ReactNode };
  /** Extra class name */
  className?: string;
}

// ---------------------------------------------------------------------------
// InputSearchProps
// ---------------------------------------------------------------------------

export interface InputSearchProps extends InputProps {
  /** Render a button after the input; `true` renders the default "Search" text */
  enterButton?: boolean | ReactNode;
  /** Show a loading spinner */
  loading?: boolean;
  /** Callback fired on search (Enter key or button click) */
  onSearch?: (value: string, event?: React.SyntheticEvent) => void;
}

// ---------------------------------------------------------------------------
// InputOTPProps
// ---------------------------------------------------------------------------

export interface InputOTPProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "defaultValue" | "size"
  > {
  /** Number of input fields – defaults to 6 */
  length?: number;
  /** Controlled value (full string) */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Fires with the combined value string */
  onChange?: (value: string) => void;
  /** Mask character (e.g. "*") – hides entered characters */
  mask?: boolean | string;
  /** Component size */
  size?: InputSize;
  /** Validation status */
  status?: InputStatus;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Auto-focus the first input on mount */
  autoFocus?: boolean;
  /** Extra class name for the wrapper */
  className?: string;
}
