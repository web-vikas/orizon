/**
 * @file Button Stories
 *
 * Visual test suite for the `<Button>` component covering every prop
 * and combination. Each story isolates a single concern so regressions
 * are easy to spot.
 *
 * Stories:
 *   Playground        — interactive controls panel (Storybook args)
 *   Types             — primary, default, dashed, text, link
 *   Sizes             — small, middle, large across types
 *   Shapes            — default, round, circle across types
 *   Icons             — icon start, icon end, icon-only
 *   Danger            — danger flag across all types + with icons
 *   Ghost             — transparent bg on dark & light backgrounds
 *   Loading           — spinner replaces icon, button disabled
 *   Disabled          — disabled across all types + danger combo
 *   Block             — full-width layout
 *   Hover & Active    — manual interaction test for hover/active/focus
 *   Complete Matrix   — type x size grid + danger/loading/disabled rows
 *   Hint (Tooltip)    — tooltip on hover via `hint` prop
 *   Icon-Only Sizes   — icon buttons at every size + circle shape
 *   Button Group      — connected buttons with collapsed borders
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";
import {
  Search,
  Download,
  Plus,
  Trash2,
  Settings,
  ChevronRight,
  Heart,
  Mail,
  Power,
} from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "default", "dashed", "link", "text"],
    },
    size: {
      control: "select",
      options: ["small", "middle", "large"],
    },
    shape: {
      control: "select",
      options: ["default", "circle", "round"],
    },
    danger: { control: "boolean" },
    ghost: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    block: { control: "boolean" },
    iconPosition: {
      control: "select",
      options: ["start", "end"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ---------------------------------------------------------------------------
// Playground — use Storybook controls to tweak every prop interactively
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    type: "primary",
    size: "middle",
    children: "Button",
  },
};

// ---------------------------------------------------------------------------
// Types — one button per visual type, side by side for comparison
// ---------------------------------------------------------------------------
export const AllTypes: Story = {
  name: "Types",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Button Types</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary">Primary</Button>
          <Button type="default">Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="text">Text</Button>
          <Button type="link">Link</Button>
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes — small / middle / large shown for primary and default types
// ---------------------------------------------------------------------------
export const AllSizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" size="small">Small</Button>
          <Button type="primary" size="middle">Middle</Button>
          <Button type="primary" size="large">Large</Button>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Sizes — Default Type</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="small">Small</Button>
          <Button size="middle">Middle</Button>
          <Button size="large">Large</Button>
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Shapes — default (rounded-lg), round (pill), circle (1:1 icon-only)
// ---------------------------------------------------------------------------
export const AllShapes: Story = {
  name: "Shapes",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Shapes — Primary</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary">Default</Button>
          <Button type="primary" shape="round">Round</Button>
          <Button type="primary" shape="circle" icon={<Search className="h-4 w-4" />} />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Shapes — Default</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button shape="round">Round</Button>
          <Button shape="circle" icon={<Search className="h-4 w-4" />} />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Shapes — Dashed</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="dashed">Default</Button>
          <Button type="dashed" shape="round">Round</Button>
          <Button type="dashed" shape="circle" icon={<Plus className="h-4 w-4" />} />
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Icons — icon position (start / end) and icon-only buttons
// ---------------------------------------------------------------------------
export const WithIcons: Story = {
  name: "Icons",
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Icon before the label (default iconPosition="start") */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Icon Start (default)</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" icon={<Search className="h-4 w-4" />}>Search</Button>
          <Button icon={<Download className="h-4 w-4" />}>Download</Button>
          <Button type="dashed" icon={<Plus className="h-4 w-4" />}>Add Item</Button>
          <Button type="text" icon={<Settings className="h-4 w-4" />}>Settings</Button>
          <Button type="link" icon={<Mail className="h-4 w-4" />}>Email</Button>
        </div>
      </div>

      {/* Icon after the label */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Icon End</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" icon={<ChevronRight className="h-4 w-4" />} iconPosition="end">Next</Button>
          <Button icon={<ChevronRight className="h-4 w-4" />} iconPosition="end">Continue</Button>
        </div>
      </div>

      {/* No children — renders icon only (no label) */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Icon Only</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" icon={<Search className="h-4 w-4" />} />
          <Button icon={<Download className="h-4 w-4" />} />
          <Button type="dashed" icon={<Plus className="h-4 w-4" />} />
          <Button type="text" icon={<Settings className="h-4 w-4" />} />
          <Button danger icon={<Trash2 className="h-4 w-4" />} />
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Danger — destructive red styling, applied across all types
// ---------------------------------------------------------------------------
export const Danger: Story = {
  name: "Danger",
  render: () => (
    <div className="flex flex-col gap-6">
      {/* danger flag overrides variant to "destructive" regardless of type */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Danger Variants</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" danger>Primary Danger</Button>
          <Button danger>Default Danger</Button>
          <Button type="dashed" danger>Dashed Danger</Button>
          <Button type="text" danger>Text Danger</Button>
          <Button type="link" danger>Link Danger</Button>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Danger with Icons</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" danger icon={<Trash2 className="h-4 w-4" />}>Delete</Button>
          <Button danger icon={<Trash2 className="h-4 w-4" />}>Remove</Button>
          <Button type="text" danger icon={<Trash2 className="h-4 w-4" />} />
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Ghost — transparent background with bordered outline.
// Text color adapts: primary ghost uses teal, danger ghost uses red.
// Shown on both dark and light backgrounds for visual verification.
// ---------------------------------------------------------------------------
export const Ghost: Story = {
  name: "Ghost",
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg bg-zinc-800 p-6">
        <h3 className="mb-3 text-sm font-medium text-zinc-400">Ghost Buttons (on dark bg)</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" ghost>Primary Ghost</Button>
          <Button ghost>Default Ghost</Button>
          <Button type="dashed" ghost>Dashed Ghost</Button>
          <Button danger ghost>Danger Ghost</Button>
        </div>
      </div>
      <div className="rounded-lg  p-6">
        <h3 className="mb-3 text-sm font-medium text-zinc-400">Ghost Buttons (on light bg)</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" ghost>Primary Ghost</Button>
          <Button ghost>Default Ghost</Button>
          <Button type="dashed" ghost>Dashed Ghost</Button>
          <Button danger ghost>Danger Ghost</Button>
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Loading — spinner replaces the icon slot, button becomes disabled.
// Shown across types and sizes.
// ---------------------------------------------------------------------------
export const Loading: Story = {
  name: "Loading",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Loading State</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" loading>Loading</Button>
          <Button loading>Loading</Button>
          <Button type="dashed" loading>Loading</Button>
          <Button type="primary" loading shape="circle" />
          <Button loading shape="circle" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Loading Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" loading size="small">Small</Button>
          <Button type="primary" loading size="middle">Middle</Button>
          <Button type="primary" loading size="large">Large</Button>
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled — pointer-events-none + reduced opacity.
// Verify no hover/active/focus states fire when disabled.
// ---------------------------------------------------------------------------
export const Disabled: Story = {
  name: "Disabled",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Disabled State</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" disabled>Primary</Button>
          <Button disabled>Default</Button>
          <Button type="dashed" disabled>Dashed</Button>
          <Button type="text" disabled>Text</Button>
          <Button type="link" disabled>Link</Button>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Disabled + Danger</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" danger disabled>Danger Primary</Button>
          <Button danger disabled>Danger Default</Button>
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Block — stretches to 100% width of parent container
// ---------------------------------------------------------------------------
export const Block: Story = {
  name: "Block (Full Width)",
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Button type="primary" block>Primary Block</Button>
      <Button block>Default Block</Button>
      <Button type="dashed" block>Dashed Block</Button>
      <Button type="primary" block icon={<Download className="h-4 w-4" />}>Download</Button>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Hover & Active — manually hover, click-hold, and tab through each
// button to verify visual feedback on every type.
// ---------------------------------------------------------------------------
export const HoverActiveTest: Story = {
  name: "Hover & Active States (test by interacting)",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Hover over each button — check for visual feedback
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary">Primary Hover</Button>
          <Button>Default Hover</Button>
          <Button type="dashed">Dashed Hover</Button>
          <Button type="text">Text Hover</Button>
          <Button type="link">Link Hover</Button>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Click and hold — check for press/active feedback
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary">Primary Active</Button>
          <Button>Default Active</Button>
          <Button type="dashed">Dashed Active</Button>
          <Button type="text">Text Active</Button>
          <Button type="link">Link Active</Button>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Tab to each — check for focus ring
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary">Focus Me</Button>
          <Button>Focus Me</Button>
          <Button type="dashed">Focus Me</Button>
          <Button type="text">Focus Me</Button>
          <Button type="link">Focus Me</Button>
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Complete Matrix — every type x size in a table, plus danger / loading /
// disabled rows for at-a-glance regression checking.
// ---------------------------------------------------------------------------
export const CompleteMatrix: Story = {
  name: "Complete Matrix",
  render: () => {
    const types = ["primary", "default", "dashed", "text", "link"] as const;
    const sizes = ["small", "middle", "large"] as const;

    return (
      <div className="flex flex-col gap-8">
        <h3 className="text-sm font-medium text-muted-foreground">
          Every Type x Size combination
        </h3>
        <table className="border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="text-left text-xs text-muted-foreground pr-4">Type \ Size</th>
              {sizes.map((s) => (
                <th key={s} className="text-center text-xs text-muted-foreground px-4">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type}>
                <td className="text-xs text-muted-foreground pr-4 font-mono">{type}</td>
                {sizes.map((size) => (
                  <td key={size} className="text-center px-4 py-1">
                    <Button type={type} size={size}>{type}</Button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="text-sm font-medium text-muted-foreground">
          Danger x Type
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {types.map((type) => (
            <Button key={type} type={type} danger>{type} danger</Button>
          ))}
        </div>

        <h3 className="text-sm font-medium text-muted-foreground">
          Loading x Type
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {types.map((type) => (
            <Button key={type} type={type} loading>{type} loading</Button>
          ))}
        </div>

        <h3 className="text-sm font-medium text-muted-foreground">
          Disabled x Type
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {types.map((type) => (
            <Button key={type} type={type} disabled>{type} disabled</Button>
          ))}
        </div>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Hint — tooltip shown on hover via the `hint` string prop.
// Wraps the button in a TooltipProvider automatically.
// Especially useful for icon-only buttons that lack a visible label.
// ---------------------------------------------------------------------------
export const Hint: Story = {
  name: "Hint (Tooltip)",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Hover over each button to see the tooltip
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" hint="This is a primary action">Primary</Button>
          <Button hint="Click to go back">Default</Button>
          <Button type="dashed" hint="Add a new item">Dashed</Button>
          <Button type="text" hint="Open settings" icon={<Settings className="h-4 w-4" />} />
          <Button type="link" hint="Opens in a new tab">Link</Button>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Icon-only with hints (great for icon buttons)
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" shape="circle" icon={<Search className="h-4 w-4" />} hint="Search" />
          <Button shape="circle" icon={<Download className="h-4 w-4" />} hint="Download file" />
          <Button danger icon={<Trash2 className="h-4 w-4" />} hint="Delete permanently" />
          <Button type="text" icon={<Settings className="h-4 w-4" />} hint="Preferences" />
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Icon-only sizes — verifies icon buttons render at correct dimensions
// across small / middle / large, in both default and circle shapes.
// ---------------------------------------------------------------------------
export const IconOnlySizes: Story = {
  name: "Icon-Only Sizes",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Icon-only Buttons at Different Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" size="small" icon={<Power className="h-3 w-3" />} />
          <Button type="primary" size="middle" icon={<Power className="h-4 w-4" />} />
          <Button type="primary" size="large" icon={<Power className="h-4 w-4" />} />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Circle Icon Buttons</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="primary" shape="circle" size="small" icon={<Plus className="h-3 w-3" />} />
          <Button type="primary" shape="circle" size="middle" icon={<Plus className="h-4 w-4" />} />
          <Button type="primary" shape="circle" size="large" icon={<Plus className="h-4 w-4" />} />
          <Button shape="circle" size="small" icon={<Search className="h-3 w-3" />} />
          <Button shape="circle" size="middle" icon={<Search className="h-4 w-4" />} />
          <Button shape="circle" size="large" icon={<Search className="h-4 w-4" />} />
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Button Group — connected buttons with collapsed borders and shared rounding.
// The group's `size` prop overrides every child's size.
// Covers: default, primary, with icons, group-level sizing.
// ---------------------------------------------------------------------------
export const Group: Story = {
  name: "Button Group",
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Default outline buttons joined together */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Default Group</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button.Group>
            <Button>Left</Button>
            <Button>Center</Button>
            <Button>Right</Button>
          </Button.Group>
          <Button.Group>
            <Button type="primary">Left</Button>
            <Button type="primary">Center</Button>
            <Button type="primary">Right</Button>
          </Button.Group>
        </div>
      </div>

      {/* Icon + label inside a group */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Group with Icons</h3>
        <Button.Group>
          <Button icon={<Heart className="h-4 w-4" />}>Like</Button>
          <Button icon={<Download className="h-4 w-4" />}>Download</Button>
          <Button icon={<Settings className="h-4 w-4" />}>Settings</Button>
        </Button.Group>
      </div>

      {/* Group-level size prop overrides all children */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Group Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button.Group size="small">
            <Button>S1</Button>
            <Button>S2</Button>
            <Button>S3</Button>
          </Button.Group>
          <Button.Group size="middle">
            <Button>M1</Button>
            <Button>M2</Button>
            <Button>M3</Button>
          </Button.Group>
          <Button.Group size="large">
            <Button>L1</Button>
            <Button>L2</Button>
            <Button>L3</Button>
          </Button.Group>
        </div>
      </div>
    </div>
  ),
};
