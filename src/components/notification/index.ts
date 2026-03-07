/**
 * @file Public API for the Notification system.
 *
 * Re-exports the imperative `notification` object with typed methods and
 * the `useNotification` hook for context-aware usage.
 *
 * @see ./notificationManager.tsx - imperative manager
 * @see ./useNotification.tsx     - hook-based API
 */
import { notificationApi } from "./notificationManager";
import { useNotification } from "./useNotification";
import type { NotificationAPI } from "./types";

type NotificationApiWithHook = NotificationAPI & {
  useNotification: typeof useNotification;
};

/**
 * Imperative notification API for toast-style messages.
 *
 * Call `notification.success()`, `.error()`, `.info()`, `.warning()`,
 * or `.open()` to show floating notifications. Use `.destroy()` to
 * dismiss by key or clear all.
 *
 * @example
 * ```tsx
 * notification.success({ message: "Done!", description: "File uploaded." });
 * notification.error({ message: "Failed", duration: 0 });
 * notification.destroy(); // clear all
 * ```
 */
const notification = notificationApi as NotificationApiWithHook;
(notification as NotificationApiWithHook).useNotification = useNotification;

export { notification };
export type {
  NotificationAPI,
  NotificationConfig,
  NotificationGlobalConfig,
  NotificationType,
  NotificationPlacement,
} from "./types";
