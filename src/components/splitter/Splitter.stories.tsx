/**
 * @file Splitter Stories
 *
 * Visual test suite for `<Splitter>` covering every prop.
 *
 * Stories:
 *   Playground           -- interactive controls
 *   HorizontalSplitter   -- default horizontal layout
 *   VerticalSplitter     -- vertical layout
 *   ThreePanels          -- three-panel split
 *   WithMinMax           -- min/max size constraints
 *   Collapsible          -- collapsible panel
 *   NestedSplitter       -- splitter inside splitter
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Splitter } from "./index";

const meta: Meta<typeof Splitter> = {
  title: "Components/Splitter",
  component: Splitter,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Splitter>;

const PanelContent = ({ label }: { label: string }) => (
  <div className="flex h-full min-h-[100px] items-center justify-center p-4 text-sm text-muted-foreground">
    {label}
  </div>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  render: () => (
    <Splitter style={{ height: 200 }}>
      <Splitter.Panel defaultSize={50}>
        <PanelContent label="Panel 1" />
      </Splitter.Panel>
      <Splitter.Panel defaultSize={50}>
        <PanelContent label="Panel 2" />
      </Splitter.Panel>
    </Splitter>
  ),
};

// ---------------------------------------------------------------------------
// Horizontal Splitter
// ---------------------------------------------------------------------------
export const HorizontalSplitter: Story = {
  name: "Horizontal",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Default horizontal layout</h3>
      <Splitter style={{ height: 200 }}>
        <Splitter.Panel defaultSize={30}>
          <PanelContent label="Sidebar" />
        </Splitter.Panel>
        <Splitter.Panel defaultSize={70}>
          <PanelContent label="Content" />
        </Splitter.Panel>
      </Splitter>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Vertical Splitter
// ---------------------------------------------------------------------------
export const VerticalSplitter: Story = {
  name: "Vertical",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Vertical layout</h3>
      <Splitter layout="vertical" style={{ height: 400 }}>
        <Splitter.Panel defaultSize={40}>
          <PanelContent label="Top" />
        </Splitter.Panel>
        <Splitter.Panel defaultSize={60}>
          <PanelContent label="Bottom" />
        </Splitter.Panel>
      </Splitter>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Three Panels
// ---------------------------------------------------------------------------
export const ThreePanels: Story = {
  name: "Three Panels",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Three resizable panels</h3>
      <Splitter style={{ height: 200 }}>
        <Splitter.Panel defaultSize={25}>
          <PanelContent label="Nav" />
        </Splitter.Panel>
        <Splitter.Panel defaultSize={50}>
          <PanelContent label="Main" />
        </Splitter.Panel>
        <Splitter.Panel defaultSize={25}>
          <PanelContent label="Aside" />
        </Splitter.Panel>
      </Splitter>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Min/Max
// ---------------------------------------------------------------------------
export const WithMinMax: Story = {
  name: "Min/Max Constraints",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Left panel: min 20%, max 60%</h3>
      <Splitter style={{ height: 200 }}>
        <Splitter.Panel defaultSize={40} min={20} max={60}>
          <PanelContent label="Constrained (20-60%)" />
        </Splitter.Panel>
        <Splitter.Panel defaultSize={60}>
          <PanelContent label="Flexible" />
        </Splitter.Panel>
      </Splitter>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Collapsible
// ---------------------------------------------------------------------------
export const Collapsible: Story = {
  name: "Collapsible",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">
        Double-click handle or use arrows to collapse
      </h3>
      <Splitter style={{ height: 200 }}>
        <Splitter.Panel defaultSize={30} collapsible min={0}>
          <PanelContent label="Collapsible Sidebar" />
        </Splitter.Panel>
        <Splitter.Panel defaultSize={70}>
          <PanelContent label="Content" />
        </Splitter.Panel>
      </Splitter>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Nested Splitter
// ---------------------------------------------------------------------------
export const NestedSplitter: Story = {
  name: "Nested Splitters",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Splitter inside splitter</h3>
      <Splitter style={{ height: 300 }}>
        <Splitter.Panel defaultSize={30}>
          <PanelContent label="Sidebar" />
        </Splitter.Panel>
        <Splitter.Panel defaultSize={70}>
          <Splitter layout="vertical" style={{ height: "100%" }}>
            <Splitter.Panel defaultSize={50}>
              <PanelContent label="Editor" />
            </Splitter.Panel>
            <Splitter.Panel defaultSize={50}>
              <PanelContent label="Console" />
            </Splitter.Panel>
          </Splitter>
        </Splitter.Panel>
      </Splitter>
    </div>
  ),
};
