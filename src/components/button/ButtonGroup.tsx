import * as React from "react";
import { cn } from "@/lib/utils";
import type { ButtonGroupProps } from "./types";

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  size,
  className,
  children,
}) => {
  return (
    <div
      data-slot="button-group"
      className={cn("inline-flex items-center", className)}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ size?: string }>, {
            size: size ?? (child.props as { size?: string }).size,
          });
        }
        return child;
      })}
    </div>
  );
};

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
