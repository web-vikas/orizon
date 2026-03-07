"use client";

import * as React from "react";
import { Input as InputPrimitive } from "@/primitives/input";
import { cn } from "@/lib/utils";
import { useComponentSize } from "@/hooks/useComponentSize";
import type { InputOTPProps } from "./types";

// ---------------------------------------------------------------------------
// Size classes for individual OTP cells
// ---------------------------------------------------------------------------

const CELL_SIZE_CLASSES = {
  small: "h-7 w-7 text-xs",
  middle: "h-9 w-9 text-sm",
  large: "h-11 w-11 text-base",
} as const;

const STATUS_CLASSES: Record<string, string> = {
  error: "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
  warning: "border-warning focus-visible:border-warning focus-visible:ring-warning/20",
};

// ---------------------------------------------------------------------------
// OTP
// ---------------------------------------------------------------------------

const OTP = React.forwardRef<HTMLDivElement, InputOTPProps>((props, ref) => {
  const {
    length = 6,
    value: valueProp,
    defaultValue,
    onChange,
    mask,
    size: sizeProp,
    status,
    disabled = false,
    autoFocus = false,
    className,
    ...rest
  } = props;

  const size = useComponentSize(sizeProp);

  // ---- Refs ----
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // ---- Controlled / uncontrolled value ----
  const [internalValue, setInternalValue] = React.useState(
    () => (defaultValue ?? "").padEnd(length, "").slice(0, length),
  );
  const isControlled = valueProp !== undefined;
  const mergedValue = isControlled
    ? (valueProp ?? "").padEnd(length, "").slice(0, length)
    : internalValue;

  // Split value into individual characters
  const chars = mergedValue.split("");

  const updateValue = (newValue: string) => {
    const padded = newValue.padEnd(length, "").slice(0, length);
    if (!isControlled) {
      setInternalValue(padded);
    }
    onChange?.(padded.trimEnd());
  };

  // ---- Focus management ----
  const focusCell = (index: number) => {
    const clamped = Math.max(0, Math.min(index, length - 1));
    inputRefs.current[clamped]?.focus();
    // Select content so next keystroke replaces it
    inputRefs.current[clamped]?.select();
  };

  // ---- Auto focus ----
  React.useEffect(() => {
    if (autoFocus) {
      focusCell(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Handlers ----
  const handleInput = (index: number, e: React.FormEvent<HTMLInputElement>) => {
    const inputEl = e.currentTarget;
    const inputValue = inputEl.value;

    if (inputValue.length === 0) return;

    // If pasting multiple characters, distribute them
    if (inputValue.length > 1) {
      const newChars = [...chars];
      const pasted = inputValue.slice(0, length - index);
      for (let i = 0; i < pasted.length; i++) {
        newChars[index + i] = pasted[i];
      }
      updateValue(newChars.join(""));
      focusCell(Math.min(index + pasted.length, length - 1));
      return;
    }

    // Single character input
    const newChars = [...chars];
    newChars[index] = inputValue;
    updateValue(newChars.join(""));

    // Move to next cell
    if (index < length - 1) {
      focusCell(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newChars = [...chars];
      if (chars[index] && chars[index] !== " ") {
        // Clear current cell
        newChars[index] = " ";
        updateValue(newChars.join(""));
      } else if (index > 0) {
        // Move back and clear previous cell
        newChars[index - 1] = " ";
        updateValue(newChars.join(""));
        focusCell(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusCell(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusCell(index + 1);
    } else if (e.key === "Delete") {
      e.preventDefault();
      const newChars = [...chars];
      newChars[index] = " ";
      updateValue(newChars.join(""));
    }
  };

  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text/plain").replace(/\s/g, "");
    if (!pasted) return;

    const newChars = [...chars];
    const available = pasted.slice(0, length - index);
    for (let i = 0; i < available.length; i++) {
      newChars[index + i] = available[i];
    }
    updateValue(newChars.join(""));
    focusCell(Math.min(index + available.length, length - 1));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  // ---- Mask character ----
  const getMaskChar = () => {
    if (mask === true) return "\u2022"; // bullet
    if (typeof mask === "string") return mask;
    return null;
  };

  const maskChar = getMaskChar();

  return (
    <div
      ref={ref}
      data-slot="input-otp"
      className={cn("inline-flex items-center gap-2", className)}
      role="group"
      aria-label="One-time password input"
    >
      {Array.from({ length }, (_, index) => {
        const char = chars[index] ?? "";
        const displayChar =
          maskChar && char.trim() ? maskChar : char.trim() ? char : "";

        return (
          <InputPrimitive
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={length} // Allow paste of full value
            value={displayChar}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of ${length}`}
            className={cn(
              CELL_SIZE_CLASSES[size],
              "text-center font-mono",
              "p-0",
              status && STATUS_CLASSES[status],
            )}
            onInput={(e) => handleInput(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(index, e)}
            onFocus={handleFocus}
            {...rest}
          />
        );
      })}
    </div>
  );
});

OTP.displayName = "OTP";

export { OTP };
