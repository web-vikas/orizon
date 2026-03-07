/**
 * @file Switch component type definitions.
 *
 * Provides the `SwitchProps` interface for the binary toggle control
 * including controlled / uncontrolled modes, loading state, sizes,
 * and inner label content.
 *
 * @see {@link ./Switch.tsx} for the implementation.
 * @see {@link ./index.ts} for the public export.
 */
import type { ReactNode, MouseEventHandler } from "react";

export interface SwitchProps {
  /** Whether the switch is checked (controlled) */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Whether the switch is in loading state */
  loading?: boolean;
  /** Size of the switch */
  size?: "middle" | "small";
  /** Content shown when checked */
  checkedChildren?: ReactNode;
  /** Content shown when unchecked */
  unCheckedChildren?: ReactNode;
  /** Callback when state changes */
  onChange?: (checked: boolean) => void;
  /** Click handler */
  onClick?: MouseEventHandler<HTMLElement>;
  /** Additional class name */
  className?: string;
  /** ID attribute */
  id?: string;
}
