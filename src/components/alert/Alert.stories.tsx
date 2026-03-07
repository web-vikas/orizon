/**
 * @file Alert Stories
 *
 * Visual test suite for `<Alert>` covering every prop.
 * Stories:
 *   Playground   — interactive controls
 *   Types        — success, info, warning, error
 *   WithIcon     — showIcon for each type
 *   Closable     — dismiss with animation
 *   Description  — title + description layout
 *   Banner       — full-width banner mode
 *   Actions      — action slot on the right
 *   ErrorBoundary — Alert.ErrorBoundary wrapper
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./index";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: { layout: "padded" },
  argTypes: {
    type: {
      control: "select",
      options: ["success", "info", "warning", "error"],
    },
    closable: { control: "boolean" },
    showIcon: { control: "boolean" },
    banner: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    type: "info",
    message: "This is an alert",
    description: "Additional description text",
    showIcon: true,
    closable: true,
  },
};

// ---------------------------------------------------------------------------
// Types — one alert per type for comparison
// ---------------------------------------------------------------------------
export const Types: Story = {
  name: "Types",
  render: () => (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-muted-foreground">Alert Types</h3>
      <Alert type="success" message="Success — operation completed" />
      <Alert type="info" message="Info — general information" />
      <Alert type="warning" message="Warning — proceed with caution" />
      <Alert type="error" message="Error — something went wrong" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithIcon — showIcon renders a matching icon per type
// ---------------------------------------------------------------------------
export const WithIcon: Story = {
  name: "With Icon",
  render: () => (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-muted-foreground">Show Icon</h3>
      <Alert type="success" message="Success" showIcon />
      <Alert type="info" message="Information" showIcon />
      <Alert type="warning" message="Warning" showIcon />
      <Alert type="error" message="Error" showIcon />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Closable — close button with fade-out animation
// ---------------------------------------------------------------------------
export const Closable: Story = {
  name: "Closable",
  render: () => (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-muted-foreground">
        Click the X to dismiss
      </h3>
      <Alert type="success" message="Closable success" closable showIcon />
      <Alert
        type="warning"
        message="Closable warning"
        description="With extra description"
        closable
        showIcon
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Description — title + description layout
// ---------------------------------------------------------------------------
export const Description: Story = {
  name: "With Description",
  render: () => (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-muted-foreground">
        Message + Description
      </h3>
      <Alert
        type="info"
        message="Informational Title"
        description="This is additional helper text providing more context about the alert."
        showIcon
      />
      <Alert
        type="error"
        message="Error Title"
        description="A detailed explanation of what went wrong and how to fix it."
        showIcon
        closable
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Banner — full-width, no border, auto closable + icon
// ---------------------------------------------------------------------------
export const Banner: Story = {
  name: "Banner Mode",
  render: () => (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-muted-foreground">
        Banner mode (no side borders, rounded corners removed)
      </h3>
      <Alert type="info" message="This is a banner alert" banner />
      <Alert type="warning" message="Warning banner" banner />
      <Alert type="error" message="Error banner" banner />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Actions — action slot rendered beside the close button
// ---------------------------------------------------------------------------
export const Actions: Story = {
  name: "With Action",
  render: () => (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-muted-foreground">
        Action slot on the right
      </h3>
      <Alert
        type="info"
        message="Update available"
        description="A new version is available for download."
        showIcon
        action={
          <button className="rounded-md bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700">
            Update
          </button>
        }
        closable
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// ErrorBoundary — catches React errors and renders an error alert
// ---------------------------------------------------------------------------
export const ErrorBoundaryStory: Story = {
  name: "Error Boundary",
  render: () => (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-muted-foreground">
        Alert.ErrorBoundary wrapping safe content
      </h3>
      <Alert.ErrorBoundary message="Something broke">
        <div className="rounded-lg border p-4 text-sm">
          This content is safely wrapped. Errors would show as an alert.
        </div>
      </Alert.ErrorBoundary>
    </div>
  ),
};
