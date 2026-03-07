"use client";

import { cn } from "@/lib/utils";
import type { FormErrorListProps } from "./types";

// ---------------------------------------------------------------------------
// FormErrorList - renders a list of error messages
// ---------------------------------------------------------------------------

function FormErrorList({ errors, className }: FormErrorListProps) {
  if (!errors || errors.length === 0) return null;

  return (
    <ul
      className={cn(
        "orizon-form-error-list",
        "list-none p-0 m-0 space-y-1",
        className,
      )}
      role="alert"
    >
      {errors.map((error, index) => (
        <li
          key={index}
          className="text-destructive text-xs"
        >
          {error}
        </li>
      ))}
    </ul>
  );
}

FormErrorList.displayName = "FormErrorList";

export { FormErrorList };
