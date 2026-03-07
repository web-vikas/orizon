/**
 * Menu component for navigation menus.
 *
 * @example
 * ```tsx
 * <Menu
 *   mode="inline"
 *   items={[
 *     { key: 'home', label: 'Home', icon: <HomeIcon /> },
 *     { key: 'about', label: 'About' },
 *   ]}
 *   defaultSelectedKeys={['home']}
 * />
 * ```
 */
export { Menu } from "./Menu";
export type { MenuProps, MenuItemType, MenuInfo, MenuMode, MenuTheme } from "./types";
