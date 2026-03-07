"use client";

import * as React from "react";
import {
  useFieldArray,
  useFormContext as useRHFFormContext,
} from "react-hook-form";
import type { FormListProps, FormListField, FormListOperation } from "./types";

// ---------------------------------------------------------------------------
// Global key counter for stable keys across add/remove operations
// ---------------------------------------------------------------------------
let _keyCounter = 0;

// ---------------------------------------------------------------------------
// FormList - wraps react-hook-form's useFieldArray with antd-compatible API
// ---------------------------------------------------------------------------

function FormList({ name, children, initialValue }: FormListProps) {
  const { control } = useRHFFormContext();

  const { fields, append, insert, remove, move } = useFieldArray({
    control,
    name,
  });

  // Track stable keys for each field index
  const keyMapRef = React.useRef<Map<string, number>>(new Map());

  // Build antd-compatible field list with stable keys
  const formListFields: FormListField[] = fields.map((field, index) => {
    const fieldId = field.id;
    if (!keyMapRef.current.has(fieldId)) {
      keyMapRef.current.set(fieldId, _keyCounter++);
    }
    return {
      name: index,
      key: keyMapRef.current.get(fieldId)!,
    };
  });

  // Cleanup stale keys
  React.useEffect(() => {
    const activeIds = new Set(fields.map((f) => f.id));
    for (const key of keyMapRef.current.keys()) {
      if (!activeIds.has(key)) {
        keyMapRef.current.delete(key);
      }
    }
  }, [fields]);

  // Initialize with default values if provided and field array is empty
  const initializedRef = React.useRef(false);
  React.useEffect(() => {
    if (initialValue && !initializedRef.current && fields.length === 0) {
      initializedRef.current = true;
      for (const item of initialValue) {
        append(item as Record<string, unknown>);
      }
    }
  }, [initialValue, fields.length, append]);

  // Operations matching antd's Form.List API
  const operations: FormListOperation = React.useMemo(
    () => ({
      add: (defaultValue?: unknown, insertIndex?: number) => {
        const val = (defaultValue ?? {}) as Record<string, unknown>;
        if (insertIndex !== undefined) {
          insert(insertIndex, val);
        } else {
          append(val);
        }
      },
      remove: (index: number | number[]) => {
        if (Array.isArray(index)) {
          // Remove in reverse order to preserve indices
          const sorted = [...index].sort((a, b) => b - a);
          for (const i of sorted) {
            remove(i);
          }
        } else {
          remove(index);
        }
      },
      move: (from: number, to: number) => {
        move(from, to);
      },
    }),
    [append, insert, remove, move],
  );

  // Errors for the field array itself
  const meta = React.useMemo(() => ({ errors: [] as React.ReactNode[] }), []);

  return <>{children(formListFields, operations, meta)}</>;
}

FormList.displayName = "FormList";

export { FormList };
