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
