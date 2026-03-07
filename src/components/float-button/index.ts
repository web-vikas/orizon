import { InternalFloatButton } from "./FloatButton";
import { FloatButtonGroup } from "./FloatButtonGroup";
import { BackTop } from "./BackTop";

type FloatButtonComponent = typeof InternalFloatButton & {
  Group: typeof FloatButtonGroup;
  BackTop: typeof BackTop;
};

/**
 * FloatButton component for floating action buttons.
 *
 * Sub-components: `FloatButton.Group`, `FloatButton.BackTop`.
 *
 * @example
 * ```tsx
 * <FloatButton icon={<PlusIcon />} />
 * <FloatButton.Group trigger="click">
 *   <FloatButton icon={<EditIcon />} />
 *   <FloatButton icon={<ShareIcon />} />
 * </FloatButton.Group>
 * <FloatButton.BackTop />
 * ```
 */
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
