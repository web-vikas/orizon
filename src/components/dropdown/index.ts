import { InternalDropdown } from "./Dropdown";
import { DropdownButton } from "./DropdownButton";

type DropdownComponent = typeof InternalDropdown & {
  Button: typeof DropdownButton;
};

const Dropdown = InternalDropdown as DropdownComponent;
Dropdown.Button = DropdownButton;

export { Dropdown };
export type {
  DropdownProps,
  DropdownButtonProps,
  DropdownMenuType,
  DropdownMenuItemType,
  DropdownTrigger,
  DropdownPlacement,
  DropdownButtonType,
  DropdownButtonSize,
} from "./types";
