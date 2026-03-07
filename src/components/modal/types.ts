/**
 * @file Modal component type definitions.
 *
 * Exports the prop interfaces for the declarative `<Modal>` component,
 * its imperative static methods (`Modal.confirm`, `Modal.info`, etc.),
 * and the `useModal` hook API.
 *
 * @see ./Modal.tsx        - declarative modal implementation
 * @see ./staticMethods.tsx - imperative confirm/info/success/error/warning
 * @see ./useModal.tsx      - React hook returning a modal API tuple
 */
import type { ReactNode, CSSProperties, MouseEvent } from "react";
import type { ButtonProps } from "../button";

export type ModalType = "confirm" | "info" | "success" | "error" | "warning";

export interface ModalProps {
  /** Whether the modal is visible */
  open?: boolean;
  /** Callback when OK button is clicked */
  onOk?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Callback when Cancel button or close is triggered */
  onCancel?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Title of the modal */
  title?: ReactNode;
  /** Footer content. Pass null to hide footer. */
  footer?:
    | ReactNode
    | null
    | ((
        originNode: ReactNode,
        extra: { OkBtn: React.FC; CancelBtn: React.FC }
      ) => ReactNode);
  /** Width of the modal */
  width?: string | number;
  /** Whether to center the modal vertically */
  centered?: boolean;
  /** Whether to show close button */
  closable?: boolean;
  /** Custom close icon */
  closeIcon?: ReactNode;
  /** Whether OK button shows loading */
  confirmLoading?: boolean;
  /** Destroy child elements when closed */
  destroyOnHidden?: boolean;
  /** Whether to show mask */
  mask?: boolean;
  /** Whether clicking mask closes the modal */
  maskClosable?: boolean;
  /** OK button text */
  okText?: ReactNode;
  /** Cancel button text */
  cancelText?: ReactNode;
  /** OK button type */
  okType?: ButtonProps["type"];
  /** OK button extra props */
  okButtonProps?: Partial<ButtonProps>;
  /** Cancel button extra props */
  cancelButtonProps?: Partial<ButtonProps>;
  /** Callback after close animation */
  afterClose?: () => void;
  /** Callback after open/close animation */
  afterOpenChange?: (open: boolean) => void;
  /** Whether to support keyboard (Esc to close) */
  keyboard?: boolean;
  /** z-index of the modal */
  zIndex?: number;
  /** Show loading state */
  loading?: boolean;
  /** Custom modal render */
  modalRender?: (node: ReactNode) => ReactNode;
  /** Wrapper class name */
  wrapClassName?: string;
  /** Children content */
  children?: ReactNode;
  /** Extra class name */
  className?: string;
  /** Inline style */
  style?: CSSProperties;
}

export interface ModalStaticConfig extends Omit<ModalProps, "open"> {
  /** Content of the modal */
  content?: ReactNode;
  /** Type of the modal */
  type?: ModalType;
  /** Custom icon */
  icon?: ReactNode;
  /** Auto focus the OK button */
  autoFocusButton?: "ok" | "cancel" | null;
}

export interface ModalStaticFunctions {
  confirm: (config: ModalStaticConfig) => ModalReturnType;
  info: (config: ModalStaticConfig) => ModalReturnType;
  success: (config: ModalStaticConfig) => ModalReturnType;
  error: (config: ModalStaticConfig) => ModalReturnType;
  warning: (config: ModalStaticConfig) => ModalReturnType;
}

export interface ModalReturnType {
  destroy: () => void;
  update: (config: Partial<ModalStaticConfig>) => void;
}

export interface ModalHookAPI {
  confirm: (config: ModalStaticConfig) => ModalReturnType;
  info: (config: ModalStaticConfig) => ModalReturnType;
  success: (config: ModalStaticConfig) => ModalReturnType;
  error: (config: ModalStaticConfig) => ModalReturnType;
  warning: (config: ModalStaticConfig) => ModalReturnType;
}
