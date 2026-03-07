/**
 * @file Public API for the Modal component.
 *
 * Re-exports the declarative `<Modal>` component with imperative static
 * methods (`Modal.confirm`, `Modal.info`, etc.) and the `useModal` hook.
 *
 * @see ./Modal.tsx         - core component
 * @see ./staticMethods.tsx - imperative API
 * @see ./useModal.tsx      - hook-based API
 */
import { InternalModal } from "./Modal";
import {
  confirm,
  info,
  success,
  error,
  warning,
} from "./staticMethods";
import { useModal } from "./useModal";
import type { ModalStaticFunctions } from "./types";

type ModalComponent = typeof InternalModal &
  ModalStaticFunctions & {
    useModal: typeof useModal;
  };

/**
 * Dialog overlay for confirmations, forms, and content display.
 *
 * Supports both declarative (`<Modal open>`) and imperative
 * (`Modal.confirm()`) usage patterns.
 *
 * @example
 * ```tsx
 * // Declarative
 * <Modal open={isOpen} title="Edit" onOk={save} onCancel={close}>
 *   <p>Form content here</p>
 * </Modal>
 *
 * // Imperative
 * Modal.confirm({ title: "Delete?", content: "This cannot be undone." });
 * ```
 */
const Modal = InternalModal as ModalComponent;
Modal.confirm = confirm;
Modal.info = info;
Modal.success = success;
Modal.error = error;
Modal.warning = warning;
Modal.useModal = useModal;

export { Modal };
export type {
  ModalProps,
  ModalStaticConfig,
  ModalStaticFunctions,
  ModalReturnType,
  ModalHookAPI,
  ModalType,
} from "./types";
