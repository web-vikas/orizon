import { useConfig } from "./useConfig";

export type ComponentSize = "small" | "middle" | "large";

export function useComponentSize(
  sizeProp?: ComponentSize
): ComponentSize {
  const { componentSize } = useConfig();
  return sizeProp ?? componentSize ?? "middle";
}
