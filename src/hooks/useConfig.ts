import { useContext } from "react";
import { ConfigContext } from "@/config-provider/context";

export function useConfig() {
  return useContext(ConfigContext);
}
