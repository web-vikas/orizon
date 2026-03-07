"use client";

import {
  useForm as useRHFForm,
} from "react-hook-form";
import type {
  UseFormReturn,
  FieldValues,
  Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";

// ---------------------------------------------------------------------------
// UseFormOptions
// ---------------------------------------------------------------------------
interface UseFormOptions {
  /** Zod schema for automatic validation via zodResolver */
  schema?: ZodType;
  /** Default values for all fields */
  defaultValues?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Form.useForm - antd-compatible hook returning [formInstance]
// ---------------------------------------------------------------------------

/**
 * Creates and returns a react-hook-form instance wrapped in a single-element
 * tuple to match the antd `Form.useForm()` API:
 *
 * ```ts
 * const [form] = Form.useForm({ schema });
 * ```
 *
 * When a Zod `schema` is provided the form is automatically configured with
 * `zodResolver`.  Without a schema, plain react-hook-form validation applies.
 */
export function useForm<TValues extends FieldValues = FieldValues>(
  options: UseFormOptions = {},
): [UseFormReturn<TValues>] {
  const { schema, defaultValues } = options;

  const form = useRHFForm<TValues>({
    ...(schema
      ? { resolver: zodResolver(schema as any) as unknown as Resolver<TValues> }
      : {}),
    defaultValues: defaultValues as any,
    mode: "onTouched",
  });

  return [form];
}
