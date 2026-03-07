/**
 * @file Form component type definitions.
 *
 * Defines props for `<Form>`, `<Form.Item>`, `<Form.List>`,
 * `<Form.ErrorList>`, and the `Form.useForm` hook. Built on top of
 * react-hook-form with antd-compatible validation rules and Zod support.
 *
 * @see {@link ./Form.tsx} for the form wrapper
 * @see {@link ./FormItem.tsx} for the field wrapper
 * @see {@link ./FormList.tsx} for dynamic field arrays
 */
import type { ReactNode, HTMLAttributes } from "react";
import type {
  UseFormReturn,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import type { ZodType } from "zod";

// ---------------------------------------------------------------------------
// Rule - antd-compatible validation rule interface
// ---------------------------------------------------------------------------
export interface Rule {
  /** Mark the field as required */
  required?: boolean;
  /** Custom error message shown when the rule fails */
  message?: string | ReactNode;
  /** Built-in type validation */
  type?: "string" | "number" | "email" | "url" | "boolean";
  /** RegExp pattern the value must match */
  pattern?: RegExp;
  /** Minimum value (number) or length (string / array) */
  min?: number;
  /** Maximum value (number) or length (string / array) */
  max?: number;
  /** Exact length the value must be */
  len?: number;
  /** If true, a string composed only of whitespace is considered empty */
  whitespace?: boolean;
  /** Custom async validator */
  validator?: (rule: Rule, value: unknown) => Promise<void>;
  /** If true, the validation message is shown as a warning instead of an error */
  warningOnly?: boolean;
}

// ---------------------------------------------------------------------------
// Form
// ---------------------------------------------------------------------------
export type FormLayout = "horizontal" | "vertical" | "inline";
export type FormSize = "small" | "middle" | "large";
export type FormVariant = "outlined" | "borderless" | "filled" | "underlined";
export type FormRequiredMark = boolean | "optional";

export interface FormProps<TValues extends FieldValues = FieldValues>
  extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  /** react-hook-form instance returned by Form.useForm */
  form?: UseFormReturn<TValues>;
  /** Label / field layout direction */
  layout?: FormLayout;
  /** Grid column config for labels (horizontal layout) */
  labelCol?: { span?: number };
  /** Grid column config for controls (horizontal layout) */
  wrapperCol?: { span?: number };
  /** Called with validated values on successful submit */
  onFinish?: (values: TValues) => void | Promise<void>;
  /** Called when submit validation fails */
  onFinishFailed?: (errorInfo: {
    values: TValues;
    errorFields: { name: (string | number)[]; errors: string[] }[];
  }) => void;
  /** Called whenever a field value changes */
  onValuesChange?: (
    changedValues: Partial<TValues>,
    allValues: TValues,
  ) => void;
  /** Default field values (only used when no external form instance) */
  initialValues?: Partial<TValues>;
  /** Whether to append colon after labels */
  colon?: boolean;
  /** Disable all form controls */
  disabled?: boolean;
  /** Size of form controls */
  size?: FormSize;
  /** Visual variant for all controls */
  variant?: FormVariant;
  /** Show required / optional marks next to labels */
  requiredMark?: FormRequiredMark;
  /** Additional CSS class */
  className?: string;
  children?: ReactNode;
}

// ---------------------------------------------------------------------------
// Form.Item
// ---------------------------------------------------------------------------
export interface FormItemProps<TValues extends FieldValues = FieldValues> {
  /** Field path in the form values object */
  name?: FieldPath<TValues>;
  /** Label displayed beside or above the control */
  label?: ReactNode;
  /** Antd-style validation rules */
  rules?: Rule[];
  /** Shorthand: mark field as required (adds asterisk to label) */
  required?: boolean;
  /** Persistent help text below the control */
  help?: ReactNode;
  /** Extra hint text below help / error */
  extra?: ReactNode;
  /** Tooltip shown next to the label */
  tooltip?: ReactNode;
  /** Override parent form layout for this item */
  layout?: "horizontal" | "vertical";
  /** Hide the form item (still registers the field) */
  hidden?: boolean;
  /** Render only the control without label / error wrapper */
  noStyle?: boolean;
  /** Prop name used for the controlled value (default: "value") */
  valuePropName?: string;
  /** Prop name used for the change handler (default: "onChange") */
  trigger?: string;
  /** When to run validation */
  validateTrigger?: string | string[];
  /** Additional CSS class */
  className?: string;
  children?: ReactNode;
}

// ---------------------------------------------------------------------------
// Form.List
// ---------------------------------------------------------------------------
export interface FormListOperation {
  add: (defaultValue?: unknown, insertIndex?: number) => void;
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
}

export interface FormListField {
  name: number;
  key: number;
}

export interface FormListProps {
  /** Field array name path */
  name: string;
  /** Render function receiving fields and operation helpers */
  children: (
    fields: FormListField[],
    operation: FormListOperation,
    meta: { errors: ReactNode[] },
  ) => ReactNode;
  /** Initial value when the list is created */
  initialValue?: unknown[];
  /** Validation rules for the entire list */
  rules?: Rule[];
}

// ---------------------------------------------------------------------------
// Form.ErrorList
// ---------------------------------------------------------------------------
export interface FormErrorListProps {
  /** List of error messages to display */
  errors?: ReactNode[];
  /** Additional CSS class */
  className?: string;
}

// ---------------------------------------------------------------------------
// useForm options
// ---------------------------------------------------------------------------
export interface UseFormOptions<TSchema extends ZodType = ZodType> {
  /** Zod schema for validation. When provided, zodResolver is used automatically. */
  schema?: TSchema;
  /** Default values for the form fields */
  defaultValues?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Internal form context
// ---------------------------------------------------------------------------
export interface FormContextValue {
  layout: FormLayout;
  labelCol?: { span?: number };
  wrapperCol?: { span?: number };
  colon: boolean;
  disabled: boolean;
  size: FormSize;
  variant: FormVariant;
  requiredMark: FormRequiredMark;
}
