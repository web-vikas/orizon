/**
 * @file Form component — data entry container with validation.
 *
 * Wraps react-hook-form with an antd-compatible API. Provides `<Form>`,
 * `<Form.Item>`, `<Form.List>`, and `<Form.ErrorList>` along with
 * `Form.useForm` and `Form.useWatch` hooks. Supports horizontal, vertical,
 * and inline layouts, antd-style validation rules, Zod schema validation,
 * and size/variant/disabled propagation.
 *
 * Key props: `form`, `layout`, `onFinish`, `onFinishFailed`, `initialValues`.
 *
 * @example
 * ```tsx
 * const form = Form.useForm();
 * <Form form={form} onFinish={(values) => console.log(values)}>
 *   <Form.Item name="username" label="Username" rules={[{ required: true }]}>
 *     <Input />
 *   </Form.Item>
 *   <button type="submit">Submit</button>
 * </Form>
 * ```
 *
 * @see {@link ./types.ts} for prop type definitions
 * @see {@link ./index.ts} for the public export
 */
"use client";

import * as React from "react";
import {
  useForm as useRHFForm,
  FormProvider,
} from "react-hook-form";
import type {
  FieldValues,
  FieldErrors,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormContext } from "./FormContext";
import type { FormProps, FormContextValue } from "./types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Flatten nested RHF errors into antd-style errorFields array */
function flattenErrors(
  errors: FieldErrors,
  prefix: (string | number)[] = [],
): { name: (string | number)[]; errors: string[] }[] {
  const result: { name: (string | number)[]; errors: string[] }[] = [];

  for (const key of Object.keys(errors)) {
    const err = errors[key];
    if (!err) continue;

    const path = [...prefix, key];

    if (err.message && typeof err.message === "string") {
      result.push({ name: path, errors: [err.message] });
    } else if (typeof err === "object") {
      // Nested errors (e.g. field arrays)
      result.push(...flattenErrors(err as FieldErrors, path));
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// InternalForm
// ---------------------------------------------------------------------------

function InternalForm<TValues extends FieldValues = FieldValues>(
  props: FormProps<TValues>,
) {
  const {
    form: externalForm,
    layout = "vertical",
    labelCol,
    wrapperCol,
    onFinish,
    onFinishFailed,
    onValuesChange,
    initialValues,
    colon = true,
    disabled = false,
    size = "middle",
    variant = "outlined",
    requiredMark = true,
    className,
    children,
    ...rest
  } = props;

  // Create an internal form instance when no external one is provided
  const internalForm = useRHFForm<TValues>({
    defaultValues: initialValues as any,
    mode: "onTouched",
  });

  const form = externalForm ?? internalForm;

  // Watch for value changes and forward to onValuesChange
  React.useEffect(() => {
    if (!onValuesChange) return;

    const subscription = form.watch((allValues, { name }) => {
      if (!name) return;
      const changedValues = { [name]: allValues[name] } as unknown as Partial<TValues>;
      onValuesChange(changedValues, allValues as TValues);
    });

    return () => subscription.unsubscribe();
  }, [form, onValuesChange]);

  // Submit handler
  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      void form.handleSubmit(
        // onValid
        (values) => {
          onFinish?.(values);
        },
        // onInvalid
        (errors) => {
          onFinishFailed?.({
            values: form.getValues(),
            errorFields: flattenErrors(errors),
          });
        },
      )(e);
    },
    [form, onFinish, onFinishFailed],
  );

  const ctx = React.useMemo<FormContextValue>(
    () => ({
      layout,
      labelCol,
      wrapperCol,
      colon,
      disabled,
      size,
      variant,
      requiredMark,
    }),
    [layout, labelCol, wrapperCol, colon, disabled, size, variant, requiredMark],
  );

  return (
    <FormProvider {...form}>
      <FormContext.Provider value={ctx}>
        <form
          onSubmit={handleSubmit}
          className={cn(
            "orizon-form",
            layout === "inline" && "flex flex-wrap items-start gap-4",
            disabled && "opacity-60 pointer-events-none",
            className,
          )}
          {...rest}
        >
          {children}
        </form>
      </FormContext.Provider>
    </FormProvider>
  );
}

InternalForm.displayName = "Form";

export { InternalForm };
