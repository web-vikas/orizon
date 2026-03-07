import { InternalDropdown } from "./Dropdown";
import { DropdownButton } from "./DropdownButton";

type DropdownComponent = typeof InternalDropdown & {
  Button: typeof DropdownButton;
};

/**
 * Dropdown component with contextual overlay menu.
 *
 * Sub-components: `Dropdown.Button`.
 *
 * @example
 * ```tsx
 * <Dropdown menu={{ items: [{ key: '1', label: 'Edit' }] }}>
 *   <a>Hover me</a>
 * </Dropdown>
 *
 * <Dropdown.Button menu={{ items }}>Actions</Dropdown.Button>
 * ```
 */
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
