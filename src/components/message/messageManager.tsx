"use client";

import * as React from "react";
import { createRoot, type Root } from "react-dom/client";
import { MessageContainer } from "./MessageContainer";
import type {
  MessageAPI,
  MessageConfig,
  MessageGlobalConfig,
  MessageType,
  MessageInstance,
  MessageClosePromise,
} from "./types";

let globalConfig: MessageGlobalConfig = {
  top: 8,
  duration: 3,
  maxCount: undefined,
};

let messageInstances: MessageInstance[] = [];
let messageId = 0;
let root: Root | null = null;
let containerDiv: HTMLDivElement | null = null;

function getContainer(): HTMLDivElement {
  if (containerDiv && containerDiv.parentNode) return containerDiv;

  containerDiv = document.createElement("div");
  containerDiv.setAttribute("data-message-container", "true");

  const mountPoint = globalConfig.getContainer?.() ?? document.body;
  mountPoint.appendChild(containerDiv);

  return containerDiv;
}

function render() {
  const container = getContainer();
  if (!root) {
    root = createRoot(container);
  }

  root.render(
    <MessageContainer
      messages={[...messageInstances]}
      top={globalConfig.top}
    />
  );
}

function closeMessage(id: string) {
  // Find the instance and trigger closing animation
  const instance = messageInstances.find((m) => m.id === id);
  if (instance) {
    instance.closing = true;
    render();

    // Remove after animation
    setTimeout(() => {
      messageInstances = messageInstances.filter((m) => m.id !== id);
      instance.config.onClose?.();
      render();
    }, 200);
  }
}

function addMessage(
  type: MessageType,
  config: MessageConfig
): MessageClosePromise {
  const id = config.key?.toString() ?? `msg-${++messageId}`;
  const duration = config.duration ?? globalConfig.duration ?? 3;

  // If same key exists, update it
  const existingIndex = messageInstances.findIndex(
    (m) => m.id === id
  );

  const instance: MessageInstance = {
    id,
    config,
    type,
    closing: false,
  };

  if (existingIndex >= 0) {
    messageInstances[existingIndex] = instance;
  } else {
    // Respect maxCount
    if (
      globalConfig.maxCount &&
      messageInstances.length >= globalConfig.maxCount
    ) {
      const oldest = messageInstances[0];
      if (oldest) {
        closeMessage(oldest.id);
      }
    }
    messageInstances.push(instance);
  }

  render();

  // Auto close
  let timer: ReturnType<typeof setTimeout> | null = null;
  if (duration > 0) {
    timer = setTimeout(() => {
      closeMessage(id);
    }, duration * 1000);
  }

  // Build the close/promise return
  const closeFn = (() => {
    if (timer) clearTimeout(timer);
    closeMessage(id);
  }) as MessageClosePromise;

  closeFn.then = (resolve: () => void) => {
    return new Promise<void>((res) => {
      const checkClose = setInterval(() => {
        if (!messageInstances.find((m) => m.id === id)) {
          clearInterval(checkClose);
          resolve();
          res();
        }
      }, 50);
    });
  };

  return closeFn;
}

function normalizeArgs(
  contentOrConfig: React.ReactNode | MessageConfig,
  duration?: number,
  onClose?: () => void
): MessageConfig {
  if (
    typeof contentOrConfig === "object" &&
    contentOrConfig !== null &&
    !React.isValidElement(contentOrConfig) &&
    "content" in (contentOrConfig as unknown as Record<string, unknown>)
  ) {
    return contentOrConfig as MessageConfig;
  }

  return {
    content: contentOrConfig as React.ReactNode,
    duration,
    onClose,
  };
}

const messageApi: MessageAPI = {
  success: (content, duration, onClose) =>
    addMessage("success", normalizeArgs(content, duration, onClose)),

  error: (content, duration, onClose) =>
    addMessage("error", normalizeArgs(content, duration, onClose)),

  info: (content, duration, onClose) =>
    addMessage("info", normalizeArgs(content, duration, onClose)),

  warning: (content, duration, onClose) =>
    addMessage("warning", normalizeArgs(content, duration, onClose)),

  loading: (content, duration, onClose) =>
    addMessage("loading", normalizeArgs(content, duration, onClose)),

  open: (config) => addMessage(config.type ?? "info", config),

  destroy: (key) => {
    if (key !== undefined) {
      closeMessage(key.toString());
    } else {
      // Destroy all
      messageInstances.forEach((m) => {
        m.closing = true;
      });
      render();
      setTimeout(() => {
        messageInstances = [];
        render();
      }, 200);
    }
  },

  config: (options) => {
    globalConfig = { ...globalConfig, ...options };
  },
};

export { messageApi };
