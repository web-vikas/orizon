"use client";

import * as React from "react";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  CircleXIcon,
  Loader2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  MessageAPI,
  MessageConfig,
  MessageGlobalConfig,
  MessageType,
  MessageInstance,
  MessageClosePromise,
} from "./types";

const TYPE_ICON_MAP: Record<MessageType, React.ReactNode> = {
  success: <CircleCheckIcon className="size-4 text-green-500" />,
  info: <InfoIcon className="size-4 text-blue-500" />,
  warning: <TriangleAlertIcon className="size-4 text-yellow-500" />,
  error: <CircleXIcon className="size-4 text-red-500" />,
  loading: <Loader2Icon className="size-4 animate-spin text-blue-500" />,
};

let hookMsgId = 0;

export function useMessage(): [MessageAPI, React.ReactElement] {
  const [instances, setInstances] = React.useState<MessageInstance[]>([]);
  const timersRef = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );
  const configRef = React.useRef<MessageGlobalConfig>({
    top: 8,
    duration: 3,
  });

  const closeMsg = React.useCallback((id: string) => {
    setInstances((prev) =>
      prev.map((m) => (m.id === id ? { ...m, closing: true } : m))
    );
    setTimeout(() => {
      setInstances((prev) => {
        const inst = prev.find((m) => m.id === id);
        inst?.config.onClose?.();
        return prev.filter((m) => m.id !== id);
      });
    }, 200);
  }, []);

  const addMsg = React.useCallback(
    (type: MessageType, config: MessageConfig): MessageClosePromise => {
      const id = config.key?.toString() ?? `hook-msg-${++hookMsgId}`;
      const duration = config.duration ?? configRef.current.duration ?? 3;

      const instance: MessageInstance = {
        id,
        config,
        type,
        closing: false,
      };

      setInstances((prev) => {
        const existingIdx = prev.findIndex((m) => m.id === id);
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

      // Clear existing timer for this id
      const existingTimer = timersRef.current.get(id);
      if (existingTimer) clearTimeout(existingTimer);

      if (duration > 0) {
        const timer = setTimeout(() => closeMsg(id), duration * 1000);
        timersRef.current.set(id, timer);
      }

      const closeFn = (() => {
        const t = timersRef.current.get(id);
        if (t) clearTimeout(t);
        closeMsg(id);
      }) as MessageClosePromise;

      closeFn.then = (resolve: () => void) =>
        new Promise<void>((res) => {
          const check = setInterval(() => {
            setInstances((prev) => {
              if (!prev.find((m) => m.id === id)) {
                clearInterval(check);
                resolve();
                res();
              }
              return prev;
            });
          }, 50);
        });

      return closeFn;
    },
    [closeMsg]
  );

  const normalizeArgs = React.useCallback(
    (
      contentOrConfig: React.ReactNode | MessageConfig,
      duration?: number,
      onClose?: () => void
    ): MessageConfig => {
      if (
        typeof contentOrConfig === "object" &&
        contentOrConfig !== null &&
        !React.isValidElement(contentOrConfig) &&
        "content" in (contentOrConfig as unknown as Record<string, unknown>)
      ) {
        return contentOrConfig as MessageConfig;
      }
      return { content: contentOrConfig as React.ReactNode, duration, onClose };
    },
    []
  );

  const api: MessageAPI = React.useMemo(
    () => ({
      success: (c, d, o) => addMsg("success", normalizeArgs(c, d, o)),
      error: (c, d, o) => addMsg("error", normalizeArgs(c, d, o)),
      info: (c, d, o) => addMsg("info", normalizeArgs(c, d, o)),
      warning: (c, d, o) => addMsg("warning", normalizeArgs(c, d, o)),
      loading: (c, d, o) => addMsg("loading", normalizeArgs(c, d, o)),
      open: (config) => addMsg(config.type ?? "info", config),
      destroy: (key) => {
        if (key !== undefined) {
          closeMsg(key.toString());
        } else {
          setInstances((prev) => prev.map((m) => ({ ...m, closing: true })));
          setTimeout(() => setInstances([]), 200);
        }
      },
      config: (options) => {
        configRef.current = { ...configRef.current, ...options };
      },
    }),
    [addMsg, normalizeArgs, closeMsg]
  );

  const contextHolder = React.useMemo(
    () => (
      <div
        className="pointer-events-none fixed inset-x-0 z-[1010] flex flex-col items-center gap-2"
        style={{ top: configRef.current.top ?? 8 }}
      >
        {instances.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "pointer-events-auto flex items-center gap-2 rounded-lg bg-background px-4 py-2.5 text-sm shadow-lg ring-1 ring-foreground/10 transition-all duration-200",
              msg.closing
                ? "translate-y-[-10px] opacity-0"
                : "translate-y-0 opacity-100 animate-in fade-in-0 slide-in-from-top-2"
            )}
            style={msg.config.style}
            onClick={msg.config.onClick}
          >
            {msg.config.icon ?? TYPE_ICON_MAP[msg.type]}
            <span>{msg.config.content}</span>
          </div>
        ))}
      </div>
    ),
    [instances]
  );

  return [api, contextHolder];
}
