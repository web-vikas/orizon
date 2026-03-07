"use client";

import * as React from "react";
import {
  Controller,
  useFormContext as useRHFFormContext,
} from "react-hook-form";
import type {
  FieldValues,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
  RegisterOptions,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/primitives/label";
import { useFormContext } from "./FormContext";
import type { FormItemProps, Rule } from "./types";

// ---------------------------------------------------------------------------
// Convert antd Rule[] to react-hook-form RegisterOptions
// ---------------------------------------------------------------------------

function rulesToRHFRules(rules: Rule[]): RegisterOptions {
  const result: RegisterOptions<FieldValues, string> = {};

  for (const rule of rules) {
    if (rule.required) {
      result.required =
        typeof rule.message === "string"
          ? rule.message
          : "This field is required";
    }

    if (rule.pattern) {
      result.pattern = {
        value: rule.pattern,
        message:
          typeof rule.message === "string"
            ? rule.message
            : "Value does not match pattern",
      };
    }

    if (rule.min !== undefined) {
      result.min = {
        value: rule.min,
        message:
          typeof rule.message === "string"
            ? rule.message
            : `Minimum value is ${rule.min}`,
      };
    }

    if (rule.max !== undefined) {
      result.max = {
        value: rule.max,
        message:
          typeof rule.message === "string"
            ? rule.message
            : `Maximum value is ${rule.max}`,
      };
    }

    if (rule.len !== undefined) {
      result.minLength = {
        value: rule.len,
        message:
          typeof rule.message === "string"
            ? rule.message
            : `Must be exactly ${rule.len} characters`,
      };
      result.maxLength = {
        value: rule.len,
        message:
          typeof rule.message === "string"
            ? rule.message
            : `Must be exactly ${rule.len} characters`,
      };
    }

    // Custom async validator
    if (rule.validator) {
      const validator = rule.validator;
      const ruleRef = rule;
      result.validate = {
        ...(typeof result.validate === "object" ? result.validate : {}),
        [`custom_${rules.indexOf(rule)}`]: async (value: unknown) => {
          try {
            await validator(ruleRef, value);
            return true;
          } catch (err) {
            if (err instanceof Error) return err.message;
            return typeof rule.message === "string"
              ? rule.message
              : "Validation failed";
          }
        },
      };
    }

    // Built-in type validation
    if (rule.type) {
      const typeMessage =
        typeof rule.message === "string" ? rule.message : undefined;

      switch (rule.type) {
        case "email":
          result.pattern = {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: typeMessage ?? "Please enter a valid email",
          };
          break;
        case "url":
          result.pattern = {
            value: /^https?:\/\/.+/,
            message: typeMessage ?? "Please enter a valid URL",
          };
          break;
        case "number":
          result.validate = {
            ...(typeof result.validate === "object" ? result.validate : {}),
            isNumber: (value: unknown) => {
              if (value === undefined || value === null || value === "")
                return true;
              return !isNaN(Number(value)) || (typeMessage ?? "Must be a number");
            },
          };
          break;
      }
    }

    // Whitespace rule
    if (rule.whitespace) {
      const wsMessage =
        typeof rule.message === "string"
          ? rule.message
          : "Cannot be only whitespace";
      result.validate = {
        ...(typeof result.validate === "object" ? result.validate : {}),
        notWhitespace: (value: unknown) => {
          if (typeof value === "string" && value.trim() === "") {
            return wsMessage;
          }
          return true;
        },
      };
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Determine if a field is required (from rules or explicit prop)
// ---------------------------------------------------------------------------

function isFieldRequired(rules?: Rule[], requiredProp?: boolean): boolean {
  if (requiredProp !== undefined) return requiredProp;
  return rules?.some((r) => r.required) ?? false;
}

// ---------------------------------------------------------------------------
// FormItem
// ---------------------------------------------------------------------------

function FormItem<TValues extends FieldValues = FieldValues>(
  props: FormItemProps<TValues>,
) {
  const {
    name,
    label,
    rules,
    required,
    help,
    extra,
    tooltip,
    layout: layoutProp,
    hidden = false,
    noStyle = false,
    valuePropName = "value",
    trigger = "onChange",
    validateTrigger: _validateTrigger,
    className,
    children,
  } = props;

  const formCtx = useFormContext();
  const layout = layoutProp ?? formCtx.layout;
  const fieldRequired = isFieldRequired(rules, required);

  // Try to get RHF context - may not exist if Form.Item is used standalone
  let rhfContext: ReturnType<typeof useRHFFormContext> | null = null;
  try {
    rhfContext = useRHFFormContext();
  } catch {
    // Not inside a FormProvider - render children as-is
  }

  // If no name, just render layout wrapper
  if (!name) {
    if (noStyle) return <>{children}</>;
    return (
      <FormItemLayout
        label={label}
        layout={layout}
        required={fieldRequired}
        colon={formCtx.colon}
        requiredMark={formCtx.requiredMark}
        tooltip={tooltip}
        help={help}
        extra={extra}
        hidden={hidden}
        className={className}
      >
        {children}
      </FormItemLayout>
    );
  }

  // If no RHF context, render children without binding
  if (!rhfContext) {
    if (noStyle) return <>{children}</>;
    return (
      <FormItemLayout
        label={label}
        layout={layout}
        required={fieldRequired}
        colon={formCtx.colon}
        requiredMark={formCtx.requiredMark}
        tooltip={tooltip}
        help={help}
        extra={extra}
        hidden={hidden}
        className={className}
      >
        {children}
      </FormItemLayout>
    );
  }

  // Convert antd rules to RHF validation
  const rhfRules = rules ? rulesToRHFRules(rules) : {};

  return (
    <Controller
      name={name}
      control={rhfContext.control}
      rules={rhfRules}
      render={({
        field,
        fieldState,
      }: {
        field: ControllerRenderProps<FieldValues, string>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<FieldValues>;
      }) => {
        const errorMessage = fieldState.error?.message;
        const hasError = !!fieldState.error;

        // Clone children to inject field props
        const controlledChildren = React.isValidElement(children)
          ? React.cloneElement(
              children as React.ReactElement<Record<string, unknown>>,
              {
                [valuePropName]: field.value ?? (valuePropName === "checked" ? false : ""),
                [trigger]: (...args: unknown[]) => {
                  // Call the child's original handler if present
                  const childProps = (children as React.ReactElement<Record<string, unknown>>).props;
                  if (typeof childProps[trigger] === "function") {
                    (childProps[trigger] as (...a: unknown[]) => void)(...args);
                  }

                  // Extract value from event or use directly
                  const event = args[0];
                  if (
                    event &&
                    typeof event === "object" &&
                    "target" in event &&
                    (event as React.ChangeEvent<HTMLInputElement>).target
                  ) {
                    const target = (event as React.ChangeEvent<HTMLInputElement>).target;
                    const val =
                      target.type === "checkbox" ? target.checked : target.value;
                    field.onChange(val);
                  } else {
                    // Direct value (e.g. Select, DatePicker)
                    field.onChange(args[0]);
                  }
                },
                onBlur: field.onBlur,
                ref: field.ref,
                "aria-invalid": hasError || undefined,
                disabled: formCtx.disabled || undefined,
              },
            )
          : children;

        if (noStyle) return <>{controlledChildren}</>;

        return (
          <FormItemLayout
            label={label}
            layout={layout}
            required={fieldRequired}
            colon={formCtx.colon}
            requiredMark={formCtx.requiredMark}
            tooltip={tooltip}
            help={help}
            extra={extra}
            error={typeof errorMessage === "string" ? errorMessage : undefined}
            hidden={hidden}
            className={className}
          >
            {controlledChildren}
          </FormItemLayout>
        );
      }}
    />
  );
}

FormItem.displayName = "FormItem";

// ---------------------------------------------------------------------------
// FormItemLayout - shared layout wrapper
// ---------------------------------------------------------------------------

interface FormItemLayoutProps {
  label?: React.ReactNode;
  layout: "horizontal" | "vertical" | "inline";
  required: boolean;
  colon: boolean;
  requiredMark: boolean | "optional";
  tooltip?: React.ReactNode;
  help?: React.ReactNode;
  extra?: React.ReactNode;
  error?: string;
  hidden?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function FormItemLayout({
  label,
  layout,
  required,
  colon,
  requiredMark,
  tooltip,
  help,
  extra,
  error,
  hidden,
  className,
  children,
}: FormItemLayoutProps) {
  const isHorizontal = layout === "horizontal";
  const showRequired =
    required && requiredMark !== false && requiredMark !== "optional";
  const showOptional = !required && requiredMark === "optional";

  return (
    <div
      className={cn(
        "orizon-form-item",
        isHorizontal ? "flex items-start gap-2" : "flex flex-col gap-1.5",
        hidden && "hidden",
        "mb-4",
        className,
      )}
    >
      {/* Label */}
      {label != null && (
        <Label
          className={cn(
            isHorizontal && "min-w-[100px] pt-2 text-right shrink-0",
            "text-sm font-medium leading-none",
          )}
        >
          {showRequired && (
            <span className="text-destructive mr-0.5">*</span>
          )}
          {label}
          {showOptional && (
            <span className="text-muted-foreground text-xs ml-1 font-normal">
              (optional)
            </span>
          )}
          {colon && isHorizontal && <span className="ml-0.5">:</span>}
          {tooltip && (
            <span
              className="text-muted-foreground ml-1 cursor-help"
              title={typeof tooltip === "string" ? tooltip : undefined}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </span>
          )}
        </Label>
      )}

      {/* Control + messages */}
      <div className={cn("flex flex-col gap-1", isHorizontal && "flex-1")}>
        {children}

        {/* Error message */}
        {error && (
          <p className="text-destructive text-xs mt-0.5" role="alert">
            {error}
          </p>
        )}

        {/* Help text */}
        {help && !error && (
          <p className="text-muted-foreground text-xs">{help}</p>
        )}

        {/* Extra */}
        {extra && (
          <div className="text-muted-foreground text-xs">{extra}</div>
        )}
      </div>
    </div>
  );
}

export { FormItem };
