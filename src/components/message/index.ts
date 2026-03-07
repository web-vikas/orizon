import { messageApi } from "./messageManager";
import { useMessage } from "./useMessage";
import type { MessageAPI } from "./types";

type MessageApiWithHook = MessageAPI & {
  useMessage: typeof useMessage;
};

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
