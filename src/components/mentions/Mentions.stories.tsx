/**
 * @file Mentions Stories
 *
 * Visual test suite for `<Mentions>` covering every prop.
 * Stories:
 *   Playground        — interactive controls
 *   BasicMentions     — default @-mention usage
 *   CustomPrefix      — custom trigger prefix
 *   Placement         — dropdown placement top/bottom
 *   WithClear         — allow clear button
 *   StatusVariants    — error / warning
 *   ReadOnlyDisabled  — read-only and disabled states
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Mentions } from "./index";

const meta: Meta<typeof Mentions> = {
  title: "Components/Mentions",
  component: Mentions,
  parameters: { layout: "padded" },
  argTypes: {
    placement: { control: "radio", options: ["top", "bottom"] },
    status: { control: "radio", options: [undefined, "error", "warning"] },
    variant: { control: "radio", options: ["outlined", "borderless", "filled"] },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    allowClear: { control: "boolean" },
    placeholder: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Mentions>;

const defaultOptions = [
  { value: "alice", label: "Alice" },
  { value: "bob", label: "Bob" },
  { value: "charlie", label: "Charlie" },
  { value: "diana", label: "Diana" },
];

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    placeholder: "Type @ to mention someone",
    options: defaultOptions,
    allowClear: false,
    disabled: false,
  },
};

// ---------------------------------------------------------------------------
// BasicMentions — default @-mention usage
// ---------------------------------------------------------------------------

export const BasicMentions: Story = {
  render: () => (
    <div className="max-w-md">
      <h3 className="mb-2 text-sm font-medium">Basic @Mentions</h3>
      <Mentions
        options={defaultOptions}
        placeholder="Type @ to mention"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// CustomPrefix — custom trigger prefix
// ---------------------------------------------------------------------------

export const CustomPrefix: Story = {
  render: () => (
    <div className="max-w-md">
      <h3 className="mb-2 text-sm font-medium">Custom Prefix (@ and #)</h3>
      <Mentions
        prefix={["@", "#"]}
        options={[
          { value: "alice", label: "Alice" },
          { value: "bob", label: "Bob" },
          { value: "feature", label: "#feature" },
          { value: "bug", label: "#bug" },
        ]}
        placeholder="Type @ for people, # for tags"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Placement — dropdown placement top/bottom
// ---------------------------------------------------------------------------

export const Placement: Story = {
  render: () => (
    <div className="mt-48 max-w-md">
      <h3 className="mb-2 text-sm font-medium">Placement: top</h3>
      <Mentions
        options={defaultOptions}
        placement="top"
        placeholder="Suggestions appear above"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithClear — allow clear button
// ---------------------------------------------------------------------------

export const WithClear: Story = {
  render: () => (
    <div className="max-w-md">
      <h3 className="mb-2 text-sm font-medium">Allow Clear</h3>
      <Mentions
        options={defaultOptions}
        allowClear
        defaultValue="Hello @alice"
        placeholder="Type something..."
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// StatusVariants — error / warning
// ---------------------------------------------------------------------------

export const StatusVariants: Story = {
  render: () => (
    <div className="max-w-md space-y-3">
      <h3 className="text-sm font-medium">Validation Status</h3>
      <Mentions options={defaultOptions} status="error" placeholder="Error" />
      <Mentions options={defaultOptions} status="warning" placeholder="Warning" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// ReadOnlyDisabled — read-only and disabled states
// ---------------------------------------------------------------------------

export const ReadOnlyDisabled: Story = {
  render: () => (
    <div className="max-w-md space-y-3">
      <h3 className="text-sm font-medium">Read-only & Disabled</h3>
      <Mentions options={defaultOptions} readOnly defaultValue="Read-only text" />
      <Mentions options={defaultOptions} disabled defaultValue="Disabled text" />
    </div>
  ),
};
