/**
 * @file Dropdown component type definitions.
 *
 * Defines props for `<Dropdown>` and `<Dropdown.Button>`, which render
 * a contextual overlay menu triggered by hover, click, or right-click.
 *
 * @see {@link ./Dropdown.tsx} for the component implementation
 * @see {@link ./DropdownButton.tsx} for the split-button variant
 */
import type { ReactNode, MouseEventHandler } from "react";

export type DropdownTrigger = "hover" | "click" | "contextMenu";
export type DropdownPlacement =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight";

export interface DropdownMenuItemType {
  /** Unique key */
  key: string;
  /** Label text or node */
  label: ReactNode;
  /** Icon for the item */
  icon?: ReactNode;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Whether the item is danger-styled */
  danger?: boolean;
  /** Click handler */
  onClick?: (info: { key: string; domEvent: React.MouseEvent }) => void;
  /** Type of item */
  type?: "divider" | "group";
  /** Children (for group type) */
  children?: DropdownMenuItemType[];
}

export interface DropdownMenuType {
  items: DropdownMenuItemType[];
  onClick?: (info: { key: string; domEvent: React.MouseEvent }) => void;
  selectedKeys?: string[];
}

export interface DropdownProps {
  /** Menu configuration */
  menu?: DropdownMenuType;
  /** How the dropdown is triggered */
  trigger?: DropdownTrigger[];
  /** Placement of the dropdown */
  placement?: DropdownPlacement;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** The trigger element */
  children?: ReactNode;
  /** Extra class name for the content */
  overlayClassName?: string;
  /** Arrow display */
  arrow?: boolean;
  /** Destroy popup on hide */
  destroyPopupOnHide?: boolean;
  /** Auto-adjust overflow */
  autoAdjustOverflow?: boolean;
  /** Extra class name */
  className?: string;
}

export type DropdownButtonType = "primary" | "default" | "dashed" | "link" | "text";
export type DropdownButtonSize = "small" | "middle" | "large";

export interface DropdownButtonProps extends Omit<DropdownProps, "children"> {
  /** Icon for the dropdown trigger button */
  icon?: ReactNode;
  /** Size of the buttons */
  size?: DropdownButtonSize;
  /** Type of the left button */
  type?: DropdownButtonType;
  /** Click handler for the left button */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Danger styling */
  danger?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Content of the left button */
  children?: ReactNode;
}
