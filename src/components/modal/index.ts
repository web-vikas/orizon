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
