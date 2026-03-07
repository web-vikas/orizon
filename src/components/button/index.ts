import { InternalButton } from "./Button";
import { ButtonGroup } from "./ButtonGroup";

type ButtonComponent = typeof InternalButton & {
  Group: typeof ButtonGroup;
};

const Button = InternalButton as ButtonComponent;
Button.Group = ButtonGroup;

export { Button };
export type { ButtonProps, ButtonGroupProps, ButtonType, ButtonSize, ButtonShape, ButtonHTMLType } from "./types";
