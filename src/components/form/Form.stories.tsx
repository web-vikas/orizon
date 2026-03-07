/**
 * @file Form Stories
 *
 * Visual test suite for `<Form>` covering key props.
 * Stories:
 *   Playground        — interactive controls
 *   BasicForm         — simple form with validation
 *   LayoutVariants    — horizontal / vertical / inline layouts
 *   FormSizes         — small / middle / large
 *   DisabledForm      — disabled state
 */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Form } from "./index";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  parameters: { layout: "padded" },
  argTypes: {
    layout: {
      control: "radio",
      options: ["horizontal", "vertical", "inline"],
    },
    size: { control: "radio", options: ["small", "middle", "large"] },
    disabled: { control: "boolean" },
    colon: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Form>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    layout: "vertical",
    size: "middle",
    disabled: false,
    colon: true,
  },
  render: (args) => (
    <Form {...args} onFinish={(values) => console.log("Submitted:", values)}>
      <Form.Item name="username" label="Username" rules={[{ required: true, message: "Required" }]}>
        <input className="w-full rounded border px-3 py-1.5 text-sm" placeholder="Enter username" />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <input className="w-full rounded border px-3 py-1.5 text-sm" placeholder="Enter email" />
      </Form.Item>
      <button type="submit" className="rounded bg-primary px-4 py-1.5 text-sm text-primary-foreground">
        Submit
      </button>
    </Form>
  ),
};

// ---------------------------------------------------------------------------
// BasicForm — simple form with validation
// ---------------------------------------------------------------------------

export const BasicForm: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Basic Form with Validation</h3>
      <Form onFinish={(values) => alert(JSON.stringify(values))}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <input className="w-full rounded border px-3 py-1.5 text-sm" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter a password" }]}
        >
          <input type="password" className="w-full rounded border px-3 py-1.5 text-sm" />
        </Form.Item>
        <button type="submit" className="rounded bg-primary px-4 py-1.5 text-sm text-primary-foreground">
          Log In
        </button>
      </Form>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// LayoutVariants — horizontal / vertical / inline layouts
// ---------------------------------------------------------------------------

export const LayoutVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <h3 className="text-sm font-medium">Layout Variants</h3>
      {(["vertical", "horizontal", "inline"] as const).map((layout) => (
        <div key={layout}>
          <span className="mb-2 block text-xs text-muted-foreground">{layout}</span>
          <Form layout={layout}>
            <Form.Item name="field1" label="Field 1">
              <input className="w-full rounded border px-3 py-1.5 text-sm" />
            </Form.Item>
            <Form.Item name="field2" label="Field 2">
              <input className="w-full rounded border px-3 py-1.5 text-sm" />
            </Form.Item>
          </Form>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FormSizes — small / middle / large
// ---------------------------------------------------------------------------

export const FormSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-sm font-medium">Size Variants</h3>
      {(["small", "middle", "large"] as const).map((size) => (
        <div key={size}>
          <span className="mb-2 block text-xs text-muted-foreground">{size}</span>
          <Form size={size} layout="inline">
            <Form.Item name="input" label="Input">
              <input className="rounded border px-3 py-1 text-sm" />
            </Form.Item>
          </Form>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// DisabledForm — disabled state
// ---------------------------------------------------------------------------

export const DisabledForm: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Disabled Form</h3>
      <Form disabled>
        <Form.Item name="name" label="Name">
          <input className="w-full rounded border px-3 py-1.5 text-sm" defaultValue="Read-only" />
        </Form.Item>
        <button type="submit" className="rounded bg-primary px-4 py-1.5 text-sm text-primary-foreground">
          Submit
        </button>
      </Form>
    </div>
  ),
};
