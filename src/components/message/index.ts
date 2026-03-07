import { messageApi } from "./messageManager";
import { useMessage } from "./useMessage";
import type { MessageAPI } from "./types";

type MessageApiWithHook = MessageAPI & {
  useMessage: typeof useMessage;
};

/**
 * Imperative message API for global toast notifications.
 *
 * Methods: `message.success`, `message.error`, `message.info`,
 * `message.warning`, `message.loading`, `message.open`, `message.destroy`.
 * Hook: `message.useMessage`.
 *
 * @example
 * ```tsx
 * import { message } from '@/components/message';
 * message.success('Operation completed');
 * message.error('Something failed');
 * const close = message.loading('Please wait...');
 * close(); // manually close
 * ```
 */
const message = messageApi as MessageApiWithHook;
(message as MessageApiWithHook).useMessage = useMessage;

export { message };
export type {
  MessageAPI,
  MessageConfig,
  MessageGlobalConfig,
  MessageType,
  MessageClosePromise,
} from "./types";
