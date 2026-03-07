import { InternalFloatButton } from "./FloatButton";
import { FloatButtonGroup } from "./FloatButtonGroup";
import { BackTop } from "./BackTop";

type FloatButtonComponent = typeof InternalFloatButton & {
  Group: typeof FloatButtonGroup;
  BackTop: typeof BackTop;
};

const FloatButton = InternalFloatButton as FloatButtonComponent;
FloatButton.Group = FloatButtonGroup;
FloatButton.BackTop = BackTop;

export { FloatButton };
export type {
  FloatButtonProps,
  FloatButtonGroupProps,
  BackTopProps,
  FloatButtonShape,
  FloatButtonType,
  FloatButtonGroupTrigger,
  FloatButtonBadge,
} from "./types";
