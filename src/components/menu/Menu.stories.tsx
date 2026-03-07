/**
 * @file Menu Stories
 *
 * Visual test suite for `<Menu>` covering every prop.
 * Stories:
 *   Playground         — interactive controls
 *   VerticalMenu       — vertical sidebar menu
 *   HorizontalMenu     — horizontal nav bar
 *   InlineMenu         — inline collapsible menu
 *   WithSubmenus       — nested submenus
 *   DarkTheme          — dark theme variant
 *   DisabledDanger     — disabled and danger items
 */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { HomeIcon, SettingsIcon, UsersIcon, MailIcon, FileTextIcon } from "lucide-react";
import { Menu } from "./index";
import type { MenuItemType } from "./index";

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  parameters: { layout: "padded" },
  argTypes: {
    mode: { control: "radio", options: ["horizontal", "vertical", "inline"] },
    theme: { control: "radio", options: ["light", "dark"] },
    multiple: { control: "boolean" },
    inlineCollapsed: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Menu>;

const basicItems: MenuItemType[] = [
  { key: "home", label: "Home", icon: <HomeIcon /> },
  { key: "users", label: "Users", icon: <UsersIcon /> },
  { key: "mail", label: "Mail", icon: <MailIcon /> },
  { key: "settings", label: "Settings", icon: <SettingsIcon /> },
];

const nestedItems: MenuItemType[] = [
  { key: "home", label: "Home", icon: <HomeIcon /> },
  {
    key: "users",
    label: "Users",
    icon: <UsersIcon />,
    children: [
      { key: "users-list", label: "User List" },
      { key: "users-add", label: "Add User" },
    ],
  },
  {
    key: "docs",
    label: "Documents",
    icon: <FileTextIcon />,
    children: [
      { key: "docs-all", label: "All Documents" },
      { key: "docs-shared", label: "Shared with Me" },
    ],
  },
  { key: "settings", label: "Settings", icon: <SettingsIcon /> },
];

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    mode: "inline",
    theme: "light",
    items: basicItems,
    defaultSelectedKeys: ["home"],
    multiple: false,
  },
};

// ---------------------------------------------------------------------------
// VerticalMenu — vertical sidebar menu
// ---------------------------------------------------------------------------

export const VerticalMenu: Story = {
  render: () => (
    <div className="w-56">
      <h3 className="mb-2 text-sm font-medium">Vertical Menu</h3>
      <Menu
        mode="vertical"
        items={basicItems}
        defaultSelectedKeys={["home"]}
        className="rounded-lg border"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// HorizontalMenu — horizontal nav bar
// ---------------------------------------------------------------------------

export const HorizontalMenu: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Horizontal Menu</h3>
      <Menu
        mode="horizontal"
        items={basicItems}
        defaultSelectedKeys={["home"]}
        className="border-b"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// InlineMenu — inline collapsible menu
// ---------------------------------------------------------------------------

export const InlineMenu: Story = {
  render: () => (
    <div className="w-56">
      <h3 className="mb-2 text-sm font-medium">Inline Menu with Submenus</h3>
      <Menu
        mode="inline"
        items={nestedItems}
        defaultSelectedKeys={["home"]}
        defaultOpenKeys={["users"]}
        className="rounded-lg border"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithSubmenus — nested submenus
// ---------------------------------------------------------------------------

export const WithSubmenus: Story = {
  render: () => (
    <div className="w-56">
      <h3 className="mb-2 text-sm font-medium">Nested Submenus</h3>
      <Menu
        mode="inline"
        items={nestedItems}
        defaultOpenKeys={["users", "docs"]}
        className="rounded-lg border"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// DarkTheme — dark theme variant
// ---------------------------------------------------------------------------

export const DarkTheme: Story = {
  render: () => (
    <div className="w-56">
      <h3 className="mb-2 text-sm font-medium">Dark Theme</h3>
      <Menu
        mode="inline"
        theme="dark"
        items={nestedItems}
        defaultSelectedKeys={["home"]}
        defaultOpenKeys={["users"]}
        className="rounded-lg"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// DisabledDanger — disabled and danger items
// ---------------------------------------------------------------------------

export const DisabledDanger: Story = {
  render: () => (
    <div className="w-56">
      <h3 className="mb-2 text-sm font-medium">Disabled & Danger Items</h3>
      <Menu
        mode="vertical"
        items={[
          { key: "1", label: "Normal" },
          { key: "2", label: "Disabled", disabled: true },
          { key: "3", label: "Danger", danger: true },
          { key: "d", label: "", type: "divider" },
          { key: "4", label: "Another" },
        ]}
        className="rounded-lg border"
      />
    </div>
  ),
};
