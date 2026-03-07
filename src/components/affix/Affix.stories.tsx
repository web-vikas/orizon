/**
 * @file Affix Stories
 *
 * Visual test suite for the `<Affix>` component.
 * Stories:
 *   Playground       — interactive controls
 *   OffsetTop        — pin with a top offset
 *   OffsetBottom     — pin to bottom of viewport
 *   OnChange         — callback when affix state toggles
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Affix } from "./index";

const meta: Meta<typeof Affix> = {
  title: "Components/Affix",
  component: Affix,
  parameters: { layout: "padded" },
  argTypes: {
    offsetTop: { control: "number" },
    offsetBottom: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Affix>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    offsetTop: 10,
    children: (
      <div
        style={{
          padding: "8px 16px",
          background: "var(--color-primary)",
          color: "white",
          borderRadius: 8,
        }}
      >
        Affix: scroll to pin me
      </div>
    ),
  },
};

// ---------------------------------------------------------------------------
// OffsetTop — pins 80px from the top of the viewport
// ---------------------------------------------------------------------------
export const OffsetTop: Story = {
  name: "Offset Top",
  render: () => (
    <div style={{ height: 2000 }}>
      <p className="mb-4 text-sm text-muted-foreground">
        Scroll down to see the element pin at 80px from top.
      </p>
      <div style={{ marginTop: 200 }}>
        <Affix offsetTop={80}>
          <div className="inline-block rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
            Pinned 80px from top
          </div>
        </Affix>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// OffsetBottom — pins to the bottom of the viewport
// ---------------------------------------------------------------------------
export const OffsetBottom: Story = {
  name: "Offset Bottom",
  render: () => (
    <div style={{ height: 2000 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Scroll down — the element pins 20px from the bottom
      </h3>
      <div style={{ marginTop: 600 }}>
        <Affix offsetBottom={20}>
          <div className="inline-block rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
            Pinned 20px from bottom
          </div>
        </Affix>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// OnChange — logs affix state changes
// ---------------------------------------------------------------------------
export const OnChange: Story = {
  name: "onChange Callback",
  render: () => (
    <div style={{ height: 2000 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Check the Actions panel for onChange events
      </h3>
      <div style={{ marginTop: 200 }}>
        <Affix
          offsetTop={10}
          onChange={(affixed) => console.log("Affixed:", affixed)}
        >
          <div className="inline-block rounded-lg border bg-background px-4 py-2 text-sm">
            I log onChange
          </div>
        </Affix>
      </div>
    </div>
  ),
};
