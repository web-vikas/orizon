import { InternalSwitch } from "./Switch";

/**
 * Switch toggle component for binary on/off states.
 *
 * Supports loading state, inner labels, two sizes, and
 * controlled / uncontrolled modes.
 *
 * @example
 * ```tsx
 * <Switch defaultChecked onChange={(v) => console.log(v)} />
 * <Switch checkedChildren="ON" unCheckedChildren="OFF" />
 * ```
 */
const Switch = InternalSwitch;

export { Switch };
export type { SwitchProps } from "./types";
