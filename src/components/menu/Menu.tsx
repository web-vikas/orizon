/**
 * @file Menu component — navigation menu.
 *
 * Renders a list of navigation items as a vertical sidebar, horizontal
 * nav bar, or inline collapsible menu. Supports nested sub-menus, item
 * groups, dividers, icons, danger-styled items, and dark/light themes.
 * Both selected keys and open keys can be controlled or uncontrolled.
 *
 * Key props: `mode`, `items`, `selectedKeys`, `openKeys`, `theme`, `inlineCollapsed`.
 *
 * @example
 * ```tsx
 * <Menu
 *   mode="inline"
 *   items={[
 *     { key: 'home', label: 'Home', icon: <HomeIcon /> },
 *     { key: 'settings', label: 'Settings', icon: <SettingsIcon /> },
 *   ]}
 * />
 * ```
 *
 * @see {@link ./types.ts} for prop type definitions
 * @see {@link ./index.ts} for the public export
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { MenuProps, MenuItemType, MenuInfo } from "./types";

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface MenuContextValue {
  mode: MenuProps["mode"];
  theme: MenuProps["theme"];
  selectedKeys: string[];
  openKeys: string[];
  inlineIndent: number;
  inlineCollapsed: boolean;
  onItemClick: (info: MenuInfo) => void;
  onSubmenuToggle: (key: string) => void;
}

const MenuContext = React.createContext<MenuContextValue>({
  mode: "vertical",
  theme: "light",
  selectedKeys: [],
  openKeys: [],
  inlineIndent: 24,
  inlineCollapsed: false,
  onItemClick: () => {},
  onSubmenuToggle: () => {},
});

// ---------------------------------------------------------------------------
// MenuItem (leaf)
// ---------------------------------------------------------------------------

interface MenuItemProps {
  item: MenuItemType;
  level: number;
  keyPath: string[];
}

function MenuItem({ item, level, keyPath }: MenuItemProps) {
  const { mode, theme, selectedKeys, inlineIndent, inlineCollapsed, onItemClick } =
    React.useContext(MenuContext);

  const isSelected = selectedKeys.includes(item.key);
  const isInline = mode === "inline";

  const paddingLeft = isInline && !inlineCollapsed ? level * inlineIndent : undefined;

  return (
    <li
      data-slot="menu-item"
      data-selected={isSelected || undefined}
      data-disabled={item.disabled || undefined}
      role="menuitem"
      tabIndex={item.disabled ? -1 : 0}
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
        "outline-none select-none",
        isSelected
          ? theme === "dark"
            ? "bg-blue-600/20 text-blue-400"
            : "bg-primary/10 text-primary"
          : theme === "dark"
            ? "text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100"
            : "text-foreground hover:bg-accent hover:text-accent-foreground",
        item.disabled && "pointer-events-none opacity-50",
        item.danger && !isSelected && "text-destructive hover:bg-destructive/10 hover:text-destructive",
        inlineCollapsed && "justify-center px-0",
        item.className
      )}
      style={{ paddingLeft }}
      onClick={(e) => {
        if (item.disabled) return;
        onItemClick({ key: item.key, keyPath, domEvent: e });
      }}
      onKeyDown={(e) => {
        if (item.disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onItemClick({ key: item.key, keyPath, domEvent: e });
        }
      }}
    >
      {item.icon && (
        <span className="inline-flex shrink-0 items-center [&_svg]:size-4">
          {item.icon}
        </span>
      )}
      {(!inlineCollapsed || level > 1) && <span className="truncate">{item.label}</span>}
    </li>
  );
}

// ---------------------------------------------------------------------------
// SubMenu
// ---------------------------------------------------------------------------

interface SubMenuProps {
  item: MenuItemType;
  level: number;
  keyPath: string[];
}

function SubMenu({ item, level, keyPath }: SubMenuProps) {
  const {
    mode,
    theme,
    openKeys,
    inlineIndent,
    inlineCollapsed,
    onSubmenuToggle,
  } = React.useContext(MenuContext);

  const isOpen = openKeys.includes(item.key);
  const isInline = mode === "inline";
  const isHorizontal = mode === "horizontal";

  const [hoverOpen, setHoverOpen] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // For vertical/horizontal modes, submenus open on hover as popups
  const isPopup = !isInline;
  const effectiveOpen = isPopup ? hoverOpen : isOpen;

  const handleMouseEnter = () => {
    if (!isPopup) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoverOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isPopup) return;
    timeoutRef.current = setTimeout(() => setHoverOpen(false), 150);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const paddingLeft = isInline && !inlineCollapsed ? level * inlineIndent : undefined;

  return (
    <li
      data-slot="menu-submenu"
      data-open={effectiveOpen || undefined}
      role="none"
      className={cn("relative", isHorizontal && level === 1 && "inline-flex")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Submenu trigger */}
      <div
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={effectiveOpen}
        tabIndex={item.disabled ? -1 : 0}
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
          "outline-none select-none",
          theme === "dark"
            ? "text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100"
            : "text-foreground hover:bg-accent hover:text-accent-foreground",
          item.disabled && "pointer-events-none opacity-50",
          inlineCollapsed && "justify-center px-0",
          item.className
        )}
        style={{ paddingLeft }}
        onClick={(_e) => {
          if (item.disabled) return;
          if (isInline) {
            onSubmenuToggle(item.key);
          }
        }}
        onKeyDown={(e) => {
          if (item.disabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (isInline) onSubmenuToggle(item.key);
          }
        }}
      >
        {item.icon && (
          <span className="inline-flex shrink-0 items-center [&_svg]:size-4">
            {item.icon}
          </span>
        )}
        {(!inlineCollapsed || level > 1) && (
          <span className="flex-1 truncate">{item.label}</span>
        )}
        {(!inlineCollapsed || level > 1) && (
          <span className="ml-auto inline-flex shrink-0 items-center">
            {isInline ? (
              <ChevronDown
                className={cn(
                  "transition-transform duration-200",
                  effectiveOpen && "rotate-180"
                )}
              />
            ) : (
              <ChevronRight />
            )}
          </span>
        )}
      </div>

      {/* Submenu content */}
      {effectiveOpen && item.children && (
        <ul
          role="menu"
          className={cn(
            isPopup
              ? cn(
                  "absolute z-50 min-w-[160px] rounded-lg border bg-popover p-1 shadow-md",
                  isHorizontal && level === 1
                    ? "left-0 top-full mt-1"
                    : "left-full top-0 ml-1",
                  theme === "dark" &&
                    "border-zinc-700 bg-zinc-800"
                )
              : cn(
                  "overflow-hidden transition-all duration-200",
                  !effectiveOpen && "max-h-0"
                )
          )}
        >
          {renderItems(item.children, level + 1, [...keyPath, item.key])}
        </ul>
      )}
    </li>
  );
}

// ---------------------------------------------------------------------------
// MenuGroup
// ---------------------------------------------------------------------------

interface MenuGroupProps {
  item: MenuItemType;
  level: number;
  keyPath: string[];
}

function MenuGroup({ item, level, keyPath }: MenuGroupProps) {
  const { theme, inlineIndent, inlineCollapsed } = React.useContext(MenuContext);
  const paddingLeft = !inlineCollapsed ? level * inlineIndent : undefined;

  return (
    <li data-slot="menu-group" role="none" className="my-1">
      <div
        className={cn(
          "px-3 py-1.5 text-xs font-medium",
          theme === "dark" ? "text-zinc-500" : "text-muted-foreground"
        )}
        style={{ paddingLeft }}
      >
        {item.label}
      </div>
      <ul role="group">
        {item.children && renderItems(item.children, level, keyPath)}
      </ul>
    </li>
  );
}

// ---------------------------------------------------------------------------
// Shared renderer
// ---------------------------------------------------------------------------

function renderItems(
  items: MenuItemType[],
  level: number,
  keyPath: string[]
): React.ReactNode {
  return items.map((item, index) => {
    if (item.type === "divider") {
      return (
        <li
          key={item.key || `divider-${index}`}
          data-slot="menu-divider"
          role="separator"
          className="my-1 h-px bg-border"
        />
      );
    }

    if (item.type === "group") {
      return (
        <MenuGroup
          key={item.key}
          item={item}
          level={level}
          keyPath={[...keyPath, item.key]}
        />
      );
    }

    if (item.children && item.children.length > 0) {
      return (
        <SubMenu
          key={item.key}
          item={item}
          level={level}
          keyPath={[...keyPath, item.key]}
        />
      );
    }

    return (
      <MenuItem
        key={item.key}
        item={item}
        level={level}
        keyPath={[...keyPath, item.key]}
      />
    );
  });
}

// ---------------------------------------------------------------------------
// Menu
// ---------------------------------------------------------------------------

const Menu = React.forwardRef<HTMLUListElement, MenuProps>((props, ref) => {
  const {
    mode = "vertical",
    items = [],
    selectedKeys: selectedKeysProp,
    defaultSelectedKeys = [],
    openKeys: openKeysProp,
    defaultOpenKeys = [],
    onClick,
    onOpenChange,
    onSelect,
    onDeselect,
    theme = "light",
    multiple = false,
    inlineIndent = 24,
    inlineCollapsed = false,
    className,
    style,
  } = props;

  // Selected keys
  const [internalSelectedKeys, setInternalSelectedKeys] =
    React.useState<string[]>(defaultSelectedKeys);
  const isSelectedControlled = selectedKeysProp !== undefined;
  const selectedKeys = isSelectedControlled
    ? selectedKeysProp
    : internalSelectedKeys;

  // Open keys
  const [internalOpenKeys, setInternalOpenKeys] =
    React.useState<string[]>(defaultOpenKeys);
  const isOpenControlled = openKeysProp !== undefined;
  const openKeys = isOpenControlled ? openKeysProp : internalOpenKeys;

  const handleItemClick = (info: MenuInfo) => {
    onClick?.(info);

    const key = info.key;
    let newSelectedKeys: string[];

    if (multiple) {
      const idx = selectedKeys.indexOf(key);
      if (idx >= 0) {
        newSelectedKeys = selectedKeys.filter((k) => k !== key);
        if (!isSelectedControlled) setInternalSelectedKeys(newSelectedKeys);
        onDeselect?.({ ...info, selectedKeys: newSelectedKeys });
      } else {
        newSelectedKeys = [...selectedKeys, key];
        if (!isSelectedControlled) setInternalSelectedKeys(newSelectedKeys);
        onSelect?.({ ...info, selectedKeys: newSelectedKeys });
      }
    } else {
      newSelectedKeys = [key];
      if (!isSelectedControlled) setInternalSelectedKeys(newSelectedKeys);
      onSelect?.({ ...info, selectedKeys: newSelectedKeys });
    }
  };

  const handleSubmenuToggle = (key: string) => {
    const newOpenKeys = openKeys.includes(key)
      ? openKeys.filter((k) => k !== key)
      : [...openKeys, key];
    if (!isOpenControlled) setInternalOpenKeys(newOpenKeys);
    onOpenChange?.(newOpenKeys);
  };

  const contextValue: MenuContextValue = {
    mode,
    theme,
    selectedKeys,
    openKeys,
    inlineIndent,
    inlineCollapsed,
    onItemClick: handleItemClick,
    onSubmenuToggle: handleSubmenuToggle,
  };

  return (
    <MenuContext.Provider value={contextValue}>
      <ul
        ref={ref}
        data-slot="menu"
        data-mode={mode}
        data-theme={theme}
        role="menu"
        className={cn(
          "list-none p-1",
          mode === "horizontal"
            ? "flex flex-row items-center gap-0.5"
            : "flex flex-col gap-0.5",
          theme === "dark"
            ? "bg-zinc-900 text-zinc-100"
            : "bg-background text-foreground",
          inlineCollapsed && mode === "inline" && "w-fit",
          className
        )}
        style={style}
      >
        {renderItems(items, 1, [])}
      </ul>
    </MenuContext.Provider>
  );
});

Menu.displayName = "Menu";

export { Menu };
