/**
 * @file Button — Public Barrel Export
 *
 * Composes `InternalButton` + `ButtonGroup` into a single `Button`
 * export with a `.Group` static property (Ant Design pattern).
 */

import { InternalButton } from "./Button";
import { ButtonGroup } from "./ButtonGroup";

type ButtonComponent = typeof InternalButton & {
  Group: typeof ButtonGroup;
};

/**
 * Button component with Ant-Design-compatible props.
 *
 * Supports `type`, `size`, `shape`, `danger`, `ghost`, `loading`,
 * `icon`, `block`, and `hint` (tooltip on hover).
 *
 * Use `Button.Group` to render connected button groups.
 *
 * @example
 * ```tsx
 * // Primary button
 * <Button type="primary">Save</Button>
 *
 * // With icon and tooltip
 * <Button type="primary" icon={<Save />} hint="Save changes">Save</Button>
 *
 * // Danger
 * <Button danger icon={<Trash2 />}>Delete</Button>
 *
 * // Loading state
 * <Button type="primary" loading>Submitting…</Button>
 *
 * // Ghost on dark background
 * <Button type="primary" ghost>Ghost</Button>
 *
 * // Button group
 * <Button.Group>
 *   <Button>Left</Button>
 *   <Button>Center</Button>
 *   <Button>Right</Button>
 * </Button.Group>
 * ```
 */
const Button = InternalButton as ButtonComponent;
Button.Group = ButtonGroup;

export { Button };
export type { ButtonProps, ButtonGroupProps, ButtonType, ButtonSize, ButtonShape, ButtonHTMLType } from "./types";
