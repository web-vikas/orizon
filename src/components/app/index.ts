/**
 * @file App — Public Barrel Export
 *
 * Composes `InternalApp` + `useApp` hook into a single `App` export
 * with a `.useApp` static property.
 */

import { InternalApp, useApp } from "./App";

type AppComponent = typeof InternalApp & {
  useApp: typeof useApp;
};

/**
 * App provider component for imperative feedback APIs.
 *
 * Wrap your application with `<App>` to gain access to
 * `message`, `notification`, and `modal` via the `App.useApp()` hook.
 *
 * @example
 * ```tsx
 * <App>
 *   <MyPage />
 * </App>
 *
 * function MyPage() {
 *   const { message, notification, modal } = App.useApp();
 *   return <button onClick={() => message.info("Hello!")}>Greet</button>;
 * }
 * ```
 */
const App = InternalApp as AppComponent;
App.useApp = useApp;

export { App };
export type { AppProps } from "./types";
