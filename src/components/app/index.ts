import { InternalApp, useApp } from "./App";

type AppComponent = typeof InternalApp & {
  useApp: typeof useApp;
};

const App = InternalApp as AppComponent;
App.useApp = useApp;

export { App };
export type { AppProps } from "./types";
