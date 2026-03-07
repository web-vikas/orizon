"use client";

import * as React from "react";
import { NotificationContainer } from "./NotificationContainer";
import type {
  NotificationAPI,
  NotificationConfig,
  NotificationGlobalConfig,
  NotificationType,
  NotificationInstance,
  NotificationPlacement,
} from "./types";

let hookNotifId = 0;

export function useNotification(): [NotificationAPI, React.ReactElement] {
  const [instances, setInstances] = React.useState<NotificationInstance[]>([]);
  const configRef = React.useRef<NotificationGlobalConfig>({
    top: 24,
    bottom: 24,
    placement: "topRight",
  });

  const closeNotif = React.useCallback((id: string) => {
    setInstances((prev) =>
      prev.map((n) => (n.id === id ? { ...n, closing: true } : n))
    );
    setTimeout(() => {
      setInstances((prev) => {
        const inst = prev.find((n) => n.id === id);
        inst?.config.onClose?.();
        return prev.filter((n) => n.id !== id);
      });
    }, 200);
  }, []);

  const addNotif = React.useCallback(
    (config: NotificationConfig, type?: NotificationType) => {
      const id = config.key?.toString() ?? `hook-notif-${++hookNotifId}`;
      const duration = config.duration ?? 4.5;

      const instance: NotificationInstance = {
        id,
        config: { ...config, type },
        type,
        closing: false,
        createdAt: Date.now(),
      };

      setInstances((prev) => {
        const existingIdx = prev.findIndex((n) => n.id === id);
        if (existingIdx >= 0) {
          const next = [...prev];
          next[existingIdx] = instance;
          return next;
        }
        if (
          configRef.current.maxCount &&
          prev.length >= configRef.current.maxCount
        ) {
          return [...prev.slice(1), instance];
        }
        return [...prev, instance];
      });

      if (duration > 0) {
        setTimeout(() => closeNotif(id), duration * 1000);
      }
    },
    [closeNotif]
  );

  const api: NotificationAPI = React.useMemo(
    () => ({
      success: (config) => addNotif(config, "success"),
      error: (config) => addNotif(config, "error"),
      info: (config) => addNotif(config, "info"),
      warning: (config) => addNotif(config, "warning"),
      open: (config) => addNotif(config, config.type),
      destroy: (key) => {
        if (key !== undefined) {
          closeNotif(key.toString());
        } else {
          setInstances((prev) => prev.map((n) => ({ ...n, closing: true })));
          setTimeout(() => setInstances([]), 200);
        }
      },
      config: (options) => {
        configRef.current = { ...configRef.current, ...options };
      },
    }),
    [addNotif, closeNotif]
  );

  // Group by placement for rendering
  const groupedByPlacement = React.useMemo(() => {
    const groups: Record<string, NotificationInstance[]> = {};
    for (const inst of instances) {
      const p =
        inst.config.placement ??
        configRef.current.placement ??
        "topRight";
      if (!groups[p]) groups[p] = [];
      groups[p].push(inst);
    }
    return groups;
  }, [instances]);

  const contextHolder = React.useMemo(
    () => (
      <>
        {Object.entries(groupedByPlacement).map(([placement, notifs]) => (
          <NotificationContainer
            key={placement}
            notifications={notifs}
            placement={placement as NotificationPlacement}
            top={configRef.current.top}
            bottom={configRef.current.bottom}
            onClose={closeNotif}
          />
        ))}
      </>
    ),
    [groupedByPlacement, closeNotif]
  );

  return [api, contextHolder];
}
