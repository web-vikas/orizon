/**
 * @file Breadcrumb Stories
 *
 * Visual test suite for `<Breadcrumb>`.
 * Stories:
 *   Playground        — interactive controls
 *   Basic             — simple linked breadcrumb trail
 *   CustomSeparator   — custom separator character
 *   WithMenu          — dropdown menu on a breadcrumb item
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./index";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    items: [
      { title: "Home", href: "/" },
      { title: "Products", href: "/products" },
      { title: "Widget" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Basic — simple linked breadcrumb trail
// ---------------------------------------------------------------------------
export const Basic: Story = {
  name: "Basic",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Basic Breadcrumb</h3>
      <Breadcrumb
        items={[
          { title: "Home", href: "#" },
          { title: "Category", href: "#" },
          { title: "Sub-category", href: "#" },
          { title: "Current Page" },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// CustomSeparator — use a custom separator
// ---------------------------------------------------------------------------
export const CustomSeparator: Story = {
  name: "Custom Separator",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Arrow Separator</h3>
      <Breadcrumb
        separator=">"
        items={[
          { title: "Home", href: "#" },
          { title: "Settings", href: "#" },
          { title: "Profile" },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithMenu — dropdown menu on a breadcrumb item
// ---------------------------------------------------------------------------
export const WithMenu: Story = {
  name: "With Dropdown Menu",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">
        Click &quot;Category&quot; to see the dropdown
      </h3>
      <Breadcrumb
        items={[
          { title: "Home", href: "#" },
          {
            title: "Category",
            menu: {
              items: [
                { key: "1", label: "Electronics", href: "#electronics" },
                { key: "2", label: "Clothing", href: "#clothing" },
                { key: "3", label: "Books", href: "#books" },
              ],
            },
          },
          { title: "Product Detail" },
        ]}
      />
    </div>
  ),
};
