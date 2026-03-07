/**
 * @file Steps Stories
 *
 * Visual test suite for `<Steps>` covering every major prop:
 * - Playground (args)
 * - Vertical
 * - SmallSize
 * - DotType
 * - ErrorStatus
 * - WithDescriptions
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Steps } from "./index";
import { User, CreditCard, CheckCircle } from "lucide-react";

const meta: Meta<typeof Steps> = {
  title: "Components/Steps",
  component: Steps,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Steps>;

const basicItems = [
  { title: "Login" },
  { title: "Verification" },
  { title: "Pay" },
  { title: "Done" },
];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    current: 1,
    items: basicItems,
  },
};

// ---------------------------------------------------------------------------
// Vertical
// ---------------------------------------------------------------------------

export const Vertical: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Vertical direction</h3>
      <Steps
        current={1}
        direction="vertical"
        items={[
          { title: "Create account", description: "Enter your email" },
          { title: "Verify identity", description: "Upload documents" },
          { title: "Start using", description: "Explore the dashboard" },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Small Size
// ---------------------------------------------------------------------------

export const SmallSize: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Small size</h3>
      <Steps current={2} size="small" items={basicItems} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Dot Type
// ---------------------------------------------------------------------------

export const DotType: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Dot type</h3>
      <Steps
        current={1}
        type="dot"
        items={[
          { title: "Waiting", description: "Queued" },
          { title: "In Progress", description: "Processing" },
          { title: "Complete", description: "All done" },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Error Status
// ---------------------------------------------------------------------------

export const ErrorStatus: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Error status on current step</h3>
      <Steps
        current={1}
        status="error"
        items={[
          { title: "Order Placed" },
          { title: "Payment", description: "Card declined" },
          { title: "Ship" },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Custom Icons
// ---------------------------------------------------------------------------

export const WithCustomIcons: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Custom icons per step</h3>
      <Steps
        current={1}
        items={[
          { title: "Account", icon: <User className="size-4" /> },
          { title: "Payment", icon: <CreditCard className="size-4" /> },
          { title: "Done", icon: <CheckCircle className="size-4" /> },
        ]}
      />
    </div>
  ),
};
