import type { CSSProperties, ReactNode } from "react";

export interface MentionOption {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
}

export type MentionsPlacement = "top" | "bottom";
export type MentionsStatus = "error" | "warning";
export type MentionsVariant = "outlined" | "borderless" | "filled";

export interface MentionsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (text: string) => void;
  onSelect?: (option: MentionOption, prefix: string) => void;
  onSearch?: (text: string, prefix: string) => void;
  options?: MentionOption[];
  prefix?: string | string[];
  split?: string;
  placement?: MentionsPlacement;
  status?: MentionsStatus;
  variant?: MentionsVariant;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  rows?: number;
  className?: string;
  style?: CSSProperties;
}
