"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { RadioButtonProps } from "./types";
import { RadioGroupContext } from "./RadioGroup";

const RadioButton = React.forwardRef<HTMLButtonElement, RadioButtonProps>(
  (props, ref) => {
    const { value, disabled: disabledProp = false, children, className } = props;

    const groupContext = React.useContext(RadioGroupContext);
    if (!groupContext) {
      throw new Error("Radio.Button must be used within a Radio.Group");
    }

    const isChecked = groupContext.value === value;
    const isDisabled = disabledProp || groupContext.disabled;
    const buttonStyle = groupContext.buttonStyle ?? "outline";
    const size = groupContext.size ?? "middle";

    const handleClick = React.useCallback(() => {
      if (isDisabled) return;
      groupContext.onChange(value);
    }, [isDisabled, groupContext, value]);

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isChecked}
        disabled={isDisabled}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center border px-3 text-sm font-medium transition-colors outline-none select-none",
          "first:rounded-l-md last:rounded-r-md",
          "-ml-px first:ml-0",
          "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring/50",
          isDisabled && "cursor-not-allowed opacity-50",
          // Size
          size === "large" && "h-10 px-4 text-base",
          size === "middle" && "h-8 px-3",
          size === "small" && "h-7 px-2 text-xs",
          // Outline style
          buttonStyle === "outline" && [
            "border-input bg-background hover:bg-accent hover:text-accent-foreground",
            isChecked &&
              "border-primary text-primary bg-background z-10",
          ],
          // Solid style
          buttonStyle === "solid" && [
            "border-input bg-background hover:bg-accent hover:text-accent-foreground",
            isChecked &&
              "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground z-10",
          ],
          className
        )}
      >
        {children}
      </button>
    );
  }
);

RadioButton.displayName = "RadioButton";

export { RadioButton };
