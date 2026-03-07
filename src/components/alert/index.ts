/**
 * @file Alert — Public Barrel Export
 *
 * Composes `InternalAlert` + `AlertErrorBoundary` into a single
 * `Alert` export with a `.ErrorBoundary` static property.
 */

import { InternalAlert } from "./Alert";
import { AlertErrorBoundary } from "./ErrorBoundary";

type AlertComponent = typeof InternalAlert & {
  ErrorBoundary: typeof AlertErrorBoundary;
};

/**
 * Alert component for feedback messages.
 *
 * Supports `type` (success / info / warning / error), `closable`,
 * `banner` mode, custom `icon`, and an `action` slot.
 *
 * Use `Alert.ErrorBoundary` to catch React errors and display
 * them as an alert.
 *
 * @example
 * ```tsx
 * <Alert type="success" message="Done!" />
 * <Alert type="warning" message="Watch out" description="Details here" closable />
 * <Alert type="info" message="Tip" showIcon banner />
 *
 * <Alert.ErrorBoundary message="Oops">
 *   <SomeComponent />
 * </Alert.ErrorBoundary>
 * ```
 */
const Alert = InternalAlert as AlertComponent;
Alert.ErrorBoundary = AlertErrorBoundary;

export { Alert };
export type {
  AlertProps,
  AlertType,
  AlertClosableConfig,
  AlertErrorBoundaryProps,
} from "./types";
