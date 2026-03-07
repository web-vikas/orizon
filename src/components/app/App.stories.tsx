/**
 * @file App Stories
 *
 * Visual test suite for `<App>` context provider.
 * Stories:
 *   Playground      — basic wrapper
 *   CustomComponent — change the root element
 *   NoWrapper       — component={false} renders no extra DOM
 */

import type { Meta, StoryObj } from "@storybook/react";
import { App } from "./index";

const meta: Meta<typeof App> = {
  title: "Components/App",
  component: App,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof App>;

// ---------------------------------------------------------------------------
// Playground — basic wrapper with default div
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    children: (
      <div className="rounded-lg border p-4 text-sm">
        Content wrapped by App provider. Use <code>App.useApp()</code> to
        access message, notification, and modal APIs.
      </div>
    ),
  },
};

// ---------------------------------------------------------------------------
// CustomComponent — renders as a <section> instead of <div>
// ---------------------------------------------------------------------------
export const CustomComponent: Story = {
  name: "Custom Root Element",
  render: () => (
    <App component="section" className="rounded-lg border p-4">
      <p className="text-sm">This App renders as a &lt;section&gt; element.</p>
    </App>
  ),
};

// ---------------------------------------------------------------------------
// NoWrapper — component={false} skips the wrapper DOM element
// ---------------------------------------------------------------------------
export const NoWrapper: Story = {
  name: "No Wrapper (component=false)",
  render: () => (
    <App component={false}>
      <div className="rounded-lg border p-4 text-sm">
        No extra wrapper element in the DOM.
      </div>
    </App>
  ),
};
