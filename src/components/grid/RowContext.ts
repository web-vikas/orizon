import { createContext } from "react";

export interface RowContextValue {
  gutter: [number, number];
}

export const RowContext = createContext<RowContextValue>({
  gutter: [0, 0],
});
