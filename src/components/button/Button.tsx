import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button as ShadcnButton } from "@/primitives/button";
import { cn } from "@/lib/utils";
import { useComponentSize } from "@/hooks/useComponentSize";
import type { ButtonProps } from "./types";

const TYPE_TO_VARIANT = {
  primary: "default",
  default: "outline",
  dashed: "outline",
  link: "link",
  text: "ghost",
} as const;

const SIZE_MAP = {
  small: "sm",
  middle: "default",
  large: "lg",
} as const;

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
      className,
      children,
      disabled,
      ...rest
    } = props;

    const size = useComponentSize(sizeProp);
    const variant = danger ? "destructive" : TYPE_TO_VARIANT[type];
    const mappedSize = SIZE_MAP[size];

    const iconNode = loading ? (
      <Loader2 className="h-4 w-4 animate-spin" />
    ) : icon ? (
      <span className="inline-flex items-center">{icon}</span>
    ) : null;

    return (
      <ShadcnButton
        ref={ref}
        variant={variant}
        size={mappedSize}
        type={htmlType}
        disabled={disabled || loading}
        className={cn(
          type === "dashed" && "border-dashed",
          ghost &&
            "bg-transparent border-current hover:bg-transparent hover:opacity-80",
          block && "w-full",
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
  }
);

InternalButton.displayName = "Button";

export { InternalButton };
