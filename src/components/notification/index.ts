import { notificationApi } from "./notificationManager";
import { useNotification } from "./useNotification";
import type { NotificationAPI } from "./types";

type NotificationApiWithHook = NotificationAPI & {
  useNotification: typeof useNotification;
};

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
