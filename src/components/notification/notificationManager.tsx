/**
 * @file Notification manager -- imperative API for toast-style notifications.
 *
 * Provides `notification.success()`, `notification.error()`, etc. that render
 * floating notifications at configurable placements. Manages auto-close timers,
 * maxCount limits, and per-placement React render roots.
 *
 * Key API: `notification.success(config)`, `notification.error(config)`,
 * `notification.info(config)`, `notification.warning(config)`,
 * `notification.open(config)`, `notification.destroy(key?)`.
 *
 * @example
 * ```tsx
 * notification.success({ message: "Saved!", description: "Your changes were saved." });
 * notification.error({ message: "Error", duration: 0 }); // stays until closed
 * ```
 *
 * @see ./types.ts                 - NotificationConfig, NotificationAPI
 * @see ./NotificationContainer.tsx - UI rendering
 * @see ./index.ts                  - public export
 */
"use client";

import { createRoot, type Root } from "react-dom/client";
import { NotificationContainer } from "./NotificationContainer";
import type {
  NotificationAPI,
  NotificationConfig,
  NotificationGlobalConfig,
  NotificationType,
  NotificationInstance,
  NotificationPlacement,
} from "./types";

let globalConfig: NotificationGlobalConfig = {
  top: 24,
  bottom: 24,
  placement: "topRight",
  maxCount: undefined,
  stack: true,
};

// Group instances by placement
let instancesByPlacement: Record<string, NotificationInstance[]> = {};
let notifId = 0;
let roots: Record<string, Root> = {};
let containers: Record<string, HTMLDivElement> = {};

function getContainer(placement: string): HTMLDivElement {
  if (containers[placement] && containers[placement].parentNode) {
    return containers[placement];
  }
  const div = document.createElement("div");
  div.setAttribute("data-notification-container", placement);
  document.body.appendChild(div);
  containers[placement] = div;
  return div;
}

function renderPlacement(placement: NotificationPlacement) {
  const container = getContainer(placement);
  if (!roots[placement]) {
    roots[placement] = createRoot(container);
  }

  const instances = instancesByPlacement[placement] ?? [];

  roots[placement].render(
    <NotificationContainer
      notifications={[...instances]}
      placement={placement}
      top={globalConfig.top}
      bottom={globalConfig.bottom}
      onClose={closeNotification}
    />
  );
}

function closeNotification(id: string) {
  // Find and mark as closing
  for (const placement of Object.keys(instancesByPlacement)) {
    const instances = instancesByPlacement[placement];
    const inst = instances.find((n) => n.id === id);
    if (inst) {
      inst.closing = true;
      renderPlacement(placement as NotificationPlacement);

      setTimeout(() => {
        instancesByPlacement[placement] = instancesByPlacement[
          placement
        ].filter((n) => n.id !== id);
        inst.config.onClose?.();
        renderPlacement(placement as NotificationPlacement);
      }, 200);
      break;
    }
  }
}

function addNotification(
  config: NotificationConfig,
  type?: NotificationType
) {
  const placement = config.placement ?? globalConfig.placement ?? "topRight";
  const id = config.key?.toString() ?? `notif-${++notifId}`;
  const duration = config.duration ?? 4.5;

  if (!instancesByPlacement[placement]) {
    instancesByPlacement[placement] = [];
  }

  const instance: NotificationInstance = {
    id,
    config: { ...config, type },
    type,
    closing: false,
    createdAt: Date.now(),
  };

  // Check for existing
  const existingIdx = instancesByPlacement[placement].findIndex(
    (n) => n.id === id
  );
  if (existingIdx >= 0) {
    instancesByPlacement[placement][existingIdx] = instance;
  } else {
    if (
      globalConfig.maxCount &&
      instancesByPlacement[placement].length >= globalConfig.maxCount
    ) {
      const oldest = instancesByPlacement[placement][0];
      if (oldest) closeNotification(oldest.id);
    }
    instancesByPlacement[placement].push(instance);
  }

  renderPlacement(placement);

  // Auto close
  if (duration > 0) {
    setTimeout(() => closeNotification(id), duration * 1000);
  }
}

const notificationApi: NotificationAPI = {
  success: (config) => addNotification(config, "success"),
  error: (config) => addNotification(config, "error"),
  info: (config) => addNotification(config, "info"),
  warning: (config) => addNotification(config, "warning"),
  open: (config) => addNotification(config, config.type),
  destroy: (key) => {
    if (key !== undefined) {
      closeNotification(key.toString());
    } else {
      for (const placement of Object.keys(instancesByPlacement)) {
        instancesByPlacement[placement].forEach((n) => {
          n.closing = true;
        });
        renderPlacement(placement as NotificationPlacement);
        setTimeout(() => {
          instancesByPlacement[placement] = [];
          renderPlacement(placement as NotificationPlacement);
        }, 200);
      }
    }
  },
  config: (options) => {
    globalConfig = { ...globalConfig, ...options };
  },
};

export { notificationApi };
