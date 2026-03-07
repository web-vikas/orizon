/**
 * @file Input Stories
 *
 * Visual test suite for `<Input>` covering every prop.
 * Stories:
 *   Playground        — interactive controls
 *   Sizes             — small / middle / large
 *   PrefixSuffix      — prefix and suffix icons
 *   Addons            — addonBefore / addonAfter
 *   AllowClear        — clear button
 *   StatusVariants    — error / warning status
 *   Variants          — outlined / borderless / filled / underlined
 *   Password          — Input.Password toggle
 *   SearchInput       — Input.Search with button
 */
import type { Meta, StoryObj } from "@storybook/react";
import { UserIcon, SearchIcon, MailIcon, LockIcon, GlobeIcon } from "lucide-react";
import { Input } from "./index";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: { layout: "padded" },
  argTypes: {
    size: { control: "radio", options: ["small", "middle", "large"] },
    variant: {
      control: "radio",
      options: ["outlined", "borderless", "filled", "underlined"],
    },
    status: { control: "radio", options: [undefined, "error", "warning"] },
    disabled: { control: "boolean" },
    allowClear: { control: "boolean" },
    showCount: { control: "boolean" },
    maxLength: { control: "number" },
    placeholder: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    placeholder: "Enter text...",
    size: "middle",
    variant: "outlined",
    disabled: false,
    allowClear: false,
  },
};

// ---------------------------------------------------------------------------
// Sizes — small / middle / large
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <h3 className="text-sm font-medium">Size Variants</h3>
      <Input size="small" placeholder="Small" />
      <Input size="middle" placeholder="Middle (default)" />
      <Input size="large" placeholder="Large" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// PrefixSuffix — prefix and suffix icons
// ---------------------------------------------------------------------------

export const PrefixSuffix: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <h3 className="text-sm font-medium">Prefix & Suffix</h3>
      <Input prefix={<UserIcon className="size-4" />} placeholder="Username" />
      <Input suffix={<MailIcon className="size-4" />} placeholder="Email" />
      <Input
        prefix={<LockIcon className="size-4" />}
        suffix={<SearchIcon className="size-4" />}
        placeholder="Both"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Addons — addonBefore / addonAfter
// ---------------------------------------------------------------------------

export const Addons: Story = {
  render: () => (
    <div className="space-y-3 max-w-md">
      <h3 className="text-sm font-medium">Addons</h3>
      <Input addonBefore="https://" placeholder="domain" />
      <Input addonAfter=".com" placeholder="site" />
      <Input addonBefore="https://" addonAfter=".com" placeholder="mysite" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// AllowClear — clear button
// ---------------------------------------------------------------------------

export const AllowClear: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <h3 className="text-sm font-medium">Allow Clear</h3>
      <Input allowClear defaultValue="Clear me" />
      <Input allowClear prefix={<SearchIcon className="size-4" />} defaultValue="With prefix" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// StatusVariants — error / warning status
// ---------------------------------------------------------------------------

export const StatusVariants: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <h3 className="text-sm font-medium">Validation Status</h3>
      <Input status="error" placeholder="Error" />
      <Input status="warning" placeholder="Warning" />
      <Input status="error" prefix={<MailIcon className="size-4" />} placeholder="Error with prefix" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Variants — outlined / borderless / filled / underlined
// ---------------------------------------------------------------------------

export const Variants: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <h3 className="text-sm font-medium">Visual Variants</h3>
      <Input variant="outlined" placeholder="Outlined (default)" />
      <Input variant="borderless" placeholder="Borderless" />
      <Input variant="filled" placeholder="Filled" />
      <Input variant="underlined" placeholder="Underlined" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Password — Input.Password toggle
// ---------------------------------------------------------------------------

export const Password: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <h3 className="text-sm font-medium">Input.Password</h3>
      <Input.Password placeholder="Enter password" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// SearchInput — Input.Search with button
// ---------------------------------------------------------------------------

export const SearchInput: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <h3 className="text-sm font-medium">Input.Search</h3>
      <Input.Search placeholder="Search..." onSearch={(v) => console.log("Search:", v)} />
      <Input.Search enterButton placeholder="With button" onSearch={(v) => console.log("Search:", v)} />
    </div>
  ),
};
