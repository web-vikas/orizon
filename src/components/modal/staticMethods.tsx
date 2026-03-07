"use client";

import { createRoot, type Root } from "react-dom/client";
import { ConfirmModal } from "./ConfirmModal";
import type {
  ModalStaticConfig,
  ModalReturnType,
  ModalType,
} from "./types";

function openStaticModal(
  config: ModalStaticConfig,
  type: ModalType
): ModalReturnType {
  const div = document.createElement("div");
  document.body.appendChild(div);

  let root: Root | null = null;
  let currentConfig: ModalStaticConfig = { ...config, type };
  let open = true;

  function renderModal() {
    if (!root) {
      root = createRoot(div);
    }

    root.render(
      <ConfirmModal
        {...currentConfig}
        open={open}
        onInternalClose={() => {
          open = false;
          renderModal();
          // Cleanup after animation
          setTimeout(() => {
            root?.unmount();
            root = null;
            if (div.parentNode) {
              div.parentNode.removeChild(div);
            }
            currentConfig.afterClose?.();
          }, 300);
        }}
      />
    );
  }

  renderModal();

  return {
    destroy: () => {
      open = false;
      renderModal();
      setTimeout(() => {
        root?.unmount();
        root = null;
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
      }, 300);
    },
    update: (newConfig: Partial<ModalStaticConfig>) => {
      currentConfig = { ...currentConfig, ...newConfig };
      renderModal();
    },
  };
}

export function confirm(config: ModalStaticConfig): ModalReturnType {
  return openStaticModal(config, "confirm");
}

export function info(config: ModalStaticConfig): ModalReturnType {
  return openStaticModal(config, "info");
}

export function success(config: ModalStaticConfig): ModalReturnType {
  return openStaticModal(config, "success");
}

export function error(config: ModalStaticConfig): ModalReturnType {
  return openStaticModal(config, "error");
}

export function warning(config: ModalStaticConfig): ModalReturnType {
  return openStaticModal(config, "warning");
}
