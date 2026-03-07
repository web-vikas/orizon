/**
 * @file Tabs Stories
 *
 * Visual test suite for `<Tabs>` covering every major prop:
 * - Playground (args)
 * - CardType
 * - EditableCard
 * - Centered
 * - WithIcons
 * - Sizes
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./index";
import { Home, Settings, User } from "lucide-react";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

const defaultItems = [
  { key: "1", label: "Tab 1", children: "Content of Tab 1" },
  { key: "2", label: "Tab 2", children: "Content of Tab 2" },
  { key: "3", label: "Tab 3", children: "Content of Tab 3" },
];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    items: defaultItems,
    defaultActiveKey: "1",
  },
};

// ---------------------------------------------------------------------------
// Card Type
// ---------------------------------------------------------------------------

export const CardType: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Card-style tabs</h3>
      <Tabs type="card" items={defaultItems} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Editable Card
// ---------------------------------------------------------------------------

export const EditableCard: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Editable card (add / remove)</h3>
      <Tabs
        type="editable-card"
        items={[
          { key: "1", label: "Tab 1", children: "Content 1" },
          { key: "2", label: "Tab 2", children: "Content 2" },
          { key: "3", label: "Unclosable", children: "Content 3", closable: false },
        ]}
        onEdit={(key, action) => console.log(action, key)}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Centered
// ---------------------------------------------------------------------------

export const Centered: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Centered tab bar</h3>
      <Tabs centered items={defaultItems} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Icons
// ---------------------------------------------------------------------------

export const WithIcons: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Tabs with icons</h3>
      <Tabs
        items={[
          { key: "home", label: "Home", icon: <Home className="size-4" />, children: "Home content" },
          { key: "profile", label: "Profile", icon: <User className="size-4" />, children: "Profile content" },
          { key: "settings", label: "Settings", icon: <Settings className="size-4" />, children: "Settings content" },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">Small</h3>
        <Tabs size="small" items={defaultItems} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Middle (default)</h3>
        <Tabs size="middle" items={defaultItems} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Large</h3>
        <Tabs size="large" items={defaultItems} />
      </div>
    </div>
  ),
};
