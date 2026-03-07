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
