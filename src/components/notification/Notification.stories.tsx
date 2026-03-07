/**
 * @file Notification Stories
 *
 * Visual test suite for the imperative `notification` API.
 *
 * Stories:
 *   TypeVariants   -- success / error / info / warning triggers
 *   Placement      -- all six placement positions
 *   Duration       -- auto-close vs persistent (duration=0)
 *   CustomIcon     -- notification with a custom icon
 *   WithActions    -- action buttons in the notification
 */
import type { Meta, StoryObj } from "@storybook/react";
import { notification } from "./index";
import { Button } from "../button";
import { RocketIcon } from "lucide-react";

const meta: Meta = {
  title: "Components/Notification",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Click to trigger a notification</h3>
      <Button
        type="primary"
        onClick={() =>
          notification.success({
            message: "Playground Notification",
            description: "This is a success notification from the playground.",
          })
        }
      >
        Show Notification
      </Button>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Type Variants
// ---------------------------------------------------------------------------
export const TypeVariants: Story = {
  name: "Type Variants",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Notification types</h3>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => notification.success({ message: "Success", description: "Operation completed." })}>
          Success
        </Button>
        <Button onClick={() => notification.error({ message: "Error", description: "Something went wrong." })}>
          Error
        </Button>
        <Button onClick={() => notification.info({ message: "Info", description: "Here is some information." })}>
          Info
        </Button>
        <Button onClick={() => notification.warning({ message: "Warning", description: "Proceed with caution." })}>
          Warning
        </Button>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Placement
// ---------------------------------------------------------------------------
export const Placement: Story = {
  name: "Placement",
  render: () => {
    const placements = ["topLeft", "topRight", "bottomLeft", "bottomRight", "top", "bottom"] as const;
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">Notification placement</h3>
        <div className="flex flex-wrap gap-3">
          {placements.map((p) => (
            <Button
              key={p}
              onClick={() =>
                notification.info({ message: p, description: `Placed at ${p}.`, placement: p })
              }
            >
              {p}
            </Button>
          ))}
        </div>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Duration
// ---------------------------------------------------------------------------
export const Duration: Story = {
  name: "Duration (persistent vs auto-close)",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Duration control</h3>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => notification.info({ message: "Auto-close", description: "Closes in 2s.", duration: 2 })}>
          2s Duration
        </Button>
        <Button onClick={() => notification.info({ message: "Persistent", description: "Will not auto-close.", duration: 0 })}>
          Persistent (duration=0)
        </Button>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Custom Icon
// ---------------------------------------------------------------------------
export const CustomIcon: Story = {
  name: "Custom Icon",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Custom icon in notification</h3>
      <Button
        onClick={() =>
          notification.open({
            message: "Launched!",
            description: "Your rocket has been deployed.",
            icon: <RocketIcon className="size-5 text-blue-500" />,
          })
        }
      >
        Custom Icon
      </Button>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Actions
// ---------------------------------------------------------------------------
export const WithActions: Story = {
  name: "With Action Buttons",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Action buttons area</h3>
      <Button
        onClick={() =>
          notification.info({
            message: "Update Available",
            description: "A new version is ready to install.",
            key: "update-notif",
            actions: (
              <div className="flex gap-2">
                <Button size="small" type="primary" onClick={() => notification.destroy("update-notif")}>
                  Update Now
                </Button>
                <Button size="small" onClick={() => notification.destroy("update-notif")}>
                  Later
                </Button>
              </div>
            ),
          })
        }
      >
        Show with Actions
      </Button>
    </div>
  ),
};
