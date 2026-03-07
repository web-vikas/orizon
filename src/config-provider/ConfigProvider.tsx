import * as React from "react";
import { ConfigContext, type ConfigContextValue } from "./context";
import { applyThemeTokens } from "./theme";
import type { ConfigProviderProps } from "./types";

function ConfigProvider({
  theme,
  componentSize,
  direction,
  children,
}: ConfigProviderProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (wrapperRef.current && theme?.token) {
      applyThemeTokens(wrapperRef.current, theme.token);
    }
  }, [theme?.token]);

  const isDark = theme?.algorithm === "dark";

  const contextValue: ConfigContextValue = React.useMemo(
    () => ({ theme, componentSize, direction }),
    [theme, componentSize, direction]
  );

  return (
    <ConfigContext.Provider value={contextValue}>
      <div
        ref={wrapperRef}
        className={isDark ? "dark" : undefined}
        dir={direction}
        style={{ display: "contents" }}
      >
        {children}
      </div>
    </ConfigContext.Provider>
  );
}

function useConfig() {
  return React.useContext(ConfigContext);
}

export { ConfigProvider, useConfig };
