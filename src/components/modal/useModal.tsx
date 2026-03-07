"use client";

import * as React from "react";
import { ConfirmModal } from "./ConfirmModal";
import type {
  ModalStaticConfig,
  ModalReturnType,
  ModalType,
  ModalHookAPI,
} from "./types";

interface ModalInstance {
  id: string;
  config: ModalStaticConfig;
  open: boolean;
  type: ModalType;
}

let instanceId = 0;

export function useModal(): [ModalHookAPI, React.ReactElement] {
  const [instances, setInstances] = React.useState<ModalInstance[]>([]);
  const instancesRef = React.useRef<ModalInstance[]>([]);

  instancesRef.current = instances;

  const removeInstance = React.useCallback((id: string) => {
    setInstances((prev) =>
      prev.map((inst) =>
        inst.id === id ? { ...inst, open: false } : inst
      )
    );
    // Remove from DOM after animation
    setTimeout(() => {
      setInstances((prev) => prev.filter((inst) => inst.id !== id));
    }, 300);
  }, []);

  const openModal = React.useCallback(
    (config: ModalStaticConfig, type: ModalType): ModalReturnType => {
      const id = `modal-hook-${++instanceId}`;

      const instance: ModalInstance = {
        id,
        config: { ...config, type },
        open: true,
        type,
      };

      setInstances((prev) => [...prev, instance]);

      return {
        destroy: () => removeInstance(id),
        update: (newConfig: Partial<ModalStaticConfig>) => {
          setInstances((prev) =>
            prev.map((inst) =>
              inst.id === id
                ? { ...inst, config: { ...inst.config, ...newConfig } }
                : inst
            )
          );
        },
      };
    },
    [removeInstance]
  );

  const api: ModalHookAPI = React.useMemo(
    () => ({
      confirm: (config) => openModal(config, "confirm"),
      info: (config) => openModal(config, "info"),
      success: (config) => openModal(config, "success"),
      error: (config) => openModal(config, "error"),
      warning: (config) => openModal(config, "warning"),
    }),
    [openModal]
  );

  const contextHolder = React.useMemo(
    () => (
      <>
        {instances.map((inst) => (
          <ConfirmModal
            key={inst.id}
            {...inst.config}
            open={inst.open}
            onInternalClose={() => removeInstance(inst.id)}
          />
        ))}
      </>
    ),
    [instances, removeInstance]
  );

  return [api, contextHolder];
}
