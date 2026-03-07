"use client";

import { createContext, useContext } from "react";
import type { FormContextValue } from "./types";

const defaultFormContext: FormContextValue = {
  layout: "vertical",
  colon: true,
  disabled: false,
  size: "middle",
  variant: "outlined",
  requiredMark: true,
};

export const FormContext = createContext<FormContextValue>(defaultFormContext);

export function useFormContext() {
  return useContext(FormContext);
}
