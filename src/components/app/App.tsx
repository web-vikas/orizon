/**
 * @file App Component
 *
 * Top-level provider that makes imperative `message`, `notification`,
 * and `modal` APIs available via `App.useApp()`. Wrap your application
 * (or a subtree) with `<App>` and call `const { message } = App.useApp()`
 * to show feedback without prop-drilling.
 *
 * Key props: `children`, `component`, `className`, `style`.
 *
 * @example
 * ```tsx
 * <App>
 *   <MyPage />
 * </App>
 *
 * function MyPage() {
 *   const { message } = App.useApp();
 *   return <button onClick={() => message.success("Saved!")}>Save</button>;
 * }
 * ```
 *
 * @see {@link ./types.ts} — prop definitions
 * @see {@link ./index.ts} — barrel export
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMessage } from "../message/useMessage";
import { useNotification } from "../notification/useNotification";
import { useModal } from "../modal/useModal";
import type { MessageAPI } from "../message/types";
import type { NotificationAPI } from "../notification/types";
import type { ModalHookAPI } from "../modal/types";
import type { AppProps } from "./types";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface AppContextValue {
  message: MessageAPI;
  notification: NotificationAPI;
  modal: ModalHookAPI;
}

const AppContext = React.createContext<AppContextValue | null>(null);

// ---------------------------------------------------------------------------
// useApp hook
// ---------------------------------------------------------------------------

function useApp(): AppContextValue {
  const ctx = React.useContext(AppContext);
  if (!ctx) {
    throw new Error(
      "App.useApp() must be used within an <App> component. " +
        "Wrap your application with <App> to use the useApp hook.",
    );
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// App component
// ---------------------------------------------------------------------------

const InternalApp: React.FC<AppProps> = ({
  children,
  className,
  style,
  component: Component = "div",
}) => {
  const [messageApi, messageContextHolder] = useMessage();
  const [notificationApi, notificationContextHolder] = useNotification();
  const [modalApi, modalContextHolder] = useModal();

  const contextValue = React.useMemo<AppContextValue>(
    () => ({
      message: messageApi,
      notification: notificationApi,
      modal: modalApi,
    }),
    [messageApi, notificationApi, modalApi],
  );

  const content = (
    <AppContext.Provider value={contextValue}>
      {messageContextHolder}
      {notificationContextHolder}
      {modalContextHolder}
      {children}
    </AppContext.Provider>
  );

  if (Component === false) {
    return content;
  }

  return (
    <Component className={cn(className)} style={style}>
      {content}
    </Component>
  );
};

InternalApp.displayName = "App";

export { InternalApp, useApp };
