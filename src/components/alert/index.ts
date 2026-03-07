import { InternalAlert } from "./Alert";
import { AlertErrorBoundary } from "./ErrorBoundary";

type AlertComponent = typeof InternalAlert & {
  ErrorBoundary: typeof AlertErrorBoundary;
};

const Alert = InternalAlert as AlertComponent;
Alert.ErrorBoundary = AlertErrorBoundary;

export { Alert };
export type {
  AlertProps,
  AlertType,
  AlertClosableConfig,
  AlertErrorBoundaryProps,
} from "./types";
