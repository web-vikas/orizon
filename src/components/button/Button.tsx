/**
 * @file Button Component
 *
 * Public `<Button>` with an Ant-Design-compatible API.
 * Wraps the low-level `primitives/button` and maps friendly props
 * (`type`, `danger`, `ghost`, `loading`, `shape`, `hint`, …) onto
 * CVA variant classes.
 *
 * Ant-Design `type` → Primitive `variant` mapping:
 *   primary  → "default"  (solid primary bg)
 *   default  → "outline"  (bordered)
 *   dashed   → "outline"  + border-dashed class
 *   text     → "ghost"    (transparent)
 *   link     → "link"     (underline on hover)
 *
 * When `danger` is true the variant is overridden to "destructive".
 *
 * Tooltip: pass a `hint` string and the button is automatically
 * wrapped in a `<TooltipProvider> → <Tooltip> → <TooltipTrigger>`.
 *
 * @see {@link ../../primitives/button.tsx}  — underlying styled primitive
 * @see {@link ./types.ts}                  — prop definitions
 * @see {@link ./ButtonGroup.tsx}           — grouped buttons
 */

import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button as ShadcnButton } from "@/primitives/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/primitives/tooltip";
import { cn } from "@/lib/utils";
import { useComponentSize } from "@/hooks/useComponentSize";
import type { ButtonProps } from "./types";

// ---------------------------------------------------------------------------
// Mapping tables
// ---------------------------------------------------------------------------

/** Maps Ant-Design `type` values to primitive CVA `variant` names. */
const TYPE_TO_VARIANT = {
  primary: "default",
  default: "outline",
  dashed: "outline",
  link: "link",
  text: "ghost",
} as const;

/** Maps Ant-Design size names to primitive CVA size tokens. */
const SIZE_MAP = {
  small: "sm",
  middle: "default",
  large: "lg",
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const InternalButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      type = "default",
      size: sizeProp,
      shape = "default",
      loading = false,
      danger = false,
      ghost = false,
      block = false,
      icon,
      iconPosition = "start",
      htmlType = "button",
      hint,
      className,
      children,
      disabled,
      ...rest
    } = props;

    // Resolve size from prop or nearest SizeContext provider
    const size = useComponentSize(sizeProp);

    // Danger overrides the visual variant to destructive
    const variant = danger ? "destructive" : TYPE_TO_VARIANT[type];
    const mappedSize = SIZE_MAP[size];

    // Icon slot — replaced by a spinner when loading
    const iconNode = loading ? (
      <Loader2 className="h-4 w-4 animate-spin" />
    ) : icon ? (
      <span className="inline-flex items-center">{icon}</span>
    ) : null;

    // Core button element (without tooltip wrapper)
    const button = (
      <ShadcnButton
        ref={ref}
        variant={variant}
        size={mappedSize}
        type={htmlType}
        disabled={disabled || loading}
        className={cn(
          // Dashed border override (shares "outline" variant with default)
          type === "dashed" && "border-dashed",
          // Ghost: transparent bg + border in current color.
          // Override text color so it's visible on any background
          // (primary variant sets text-primary-foreground which is white).
          ghost &&
            "bg-transparent border-current shadow-none hover:bg-foreground/5 active:bg-foreground/10",
          ghost && type === "primary" && "text-primary",
          ghost && danger && "text-destructive",
          // Block: stretch to full width
          block && "w-full",
          // Shape overrides
          shape === "circle" && "rounded-full aspect-square p-0",
          shape === "round" && "rounded-full px-6",
          className
        )}
        {...rest}
      >
        {iconPosition === "start" && iconNode}
        {children}
        {iconPosition === "end" && iconNode}
      </ShadcnButton>
    );

    // Wrap in tooltip when `hint` is provided.
    // Uses a <span> as the trigger element so we don't nest <button> inside <button>.
    // The span gets tooltip event handlers; hover bubbles up from the inner button.
    if (hint) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={<span className={cn("inline-flex", block && "w-full")} />}
            >
              {button}
            </TooltipTrigger>
            <TooltipContent>{hint}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return button;
  }
);

InternalButton.displayName = "Button";

export { InternalButton };
