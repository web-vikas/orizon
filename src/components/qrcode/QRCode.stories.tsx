/**
 * @file QRCode Stories
 *
 * Visual test suite for `<QRCode>` covering every prop.
 *
 * Stories:
 *   Playground      -- interactive controls
 *   BasicQRCode     -- simple URL encoding
 *   CustomColors    -- foreground and background color
 *   StatusOverlays  -- active / loading / expired / scanned
 *   WithIcon        -- center icon overlay
 *   NoBorder        -- borderless variant
 */
import type { Meta, StoryObj } from "@storybook/react";
import { QRCode } from "./index";
import { Button } from "../button";

const meta: Meta<typeof QRCode> = {
  title: "Components/QRCode",
  component: QRCode,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof QRCode>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    value: "https://example.com",
    size: 160,
  },
};

// ---------------------------------------------------------------------------
// Basic QRCode
// ---------------------------------------------------------------------------
export const BasicQRCode: Story = {
  name: "Basic",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Simple URL encoding</h3>
      <QRCode value="https://example.com" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Custom Colors
// ---------------------------------------------------------------------------
export const CustomColors: Story = {
  name: "Custom Colors",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Custom foreground and background</h3>
      <div className="flex flex-wrap gap-4">
        <QRCode value="https://example.com" color="#1677ff" bgColor="#f0f5ff" />
        <QRCode value="https://example.com" color="#52c41a" bgColor="#f6ffed" />
        <QRCode value="https://example.com" color="#ff4d4f" bgColor="#fff2f0" />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Status Overlays
// ---------------------------------------------------------------------------
export const StatusOverlays: Story = {
  name: "Status Overlays",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">QR code status states</h3>
      <div className="flex flex-wrap gap-4">
        <div className="text-center">
          <QRCode value="https://example.com" status="active" />
          <p className="mt-2 text-xs text-muted-foreground">Active</p>
        </div>
        <div className="text-center">
          <QRCode value="https://example.com" status="loading" />
          <p className="mt-2 text-xs text-muted-foreground">Loading</p>
        </div>
        <div className="text-center">
          <QRCode
            value="https://example.com"
            status="expired"
            onRefresh={() => console.log("Refresh clicked")}
          />
          <p className="mt-2 text-xs text-muted-foreground">Expired</p>
        </div>
        <div className="text-center">
          <QRCode value="https://example.com" status="scanned" />
          <p className="mt-2 text-xs text-muted-foreground">Scanned</p>
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Icon
// ---------------------------------------------------------------------------
export const WithIcon: Story = {
  name: "With Center Icon",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Center icon overlay</h3>
      <QRCode value="https://example.com" icon="https://via.placeholder.com/40" iconSize={40} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// No Border
// ---------------------------------------------------------------------------
export const NoBorder: Story = {
  name: "No Border",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Borderless QR code</h3>
      <QRCode value="https://example.com" bordered={false} />
    </div>
  ),
};
