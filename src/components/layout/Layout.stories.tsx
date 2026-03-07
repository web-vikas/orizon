/**
 * @file Layout Stories
 *
 * Visual test suite for `<Layout>` covering every sub-component.
 * Stories:
 *   Playground            — interactive controls
 *   BasicLayout           — header + content + footer
 *   LayoutWithSider       — sidebar layout
 *   HeaderContentFooter   — common page structure
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Layout } from "./index";

const meta: Meta<typeof Layout> = {
  title: "Components/Layout",
  component: Layout,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof Layout>;

const headerStyle: React.CSSProperties = {
  background: "var(--color-primary)",
  color: "white",
  display: "flex",
  alignItems: "center",
  paddingInline: 24,
};

const contentStyle: React.CSSProperties = {
  minHeight: 200,
  background: "#f0f2f5",
  padding: 24,
};

const siderStyle: React.CSSProperties = {
  background: "#001529",
  color: "#fff",
  padding: 16,
  minWidth: 200,
};

const footerStyle: React.CSSProperties = {
  background: "#f0f2f5",
  textAlign: "center" as const,
  padding: "12px 24px",
};

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  render: () => (
    <Layout style={{ minHeight: 400 }}>
      <Layout.Header style={headerStyle}>Header</Layout.Header>
      <Layout.Content style={contentStyle}>Content</Layout.Content>
      <Layout.Footer style={footerStyle}>Footer</Layout.Footer>
    </Layout>
  ),
};

// ---------------------------------------------------------------------------
// BasicLayout — header + content + footer
// ---------------------------------------------------------------------------

export const BasicLayout: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 p-4 text-sm font-medium">Basic Layout</h3>
      <Layout style={{ minHeight: 300 }}>
        <Layout.Header>
          <span className="font-semibold">Application</span>
        </Layout.Header>
        <Layout.Content>
          <p>Main content area</p>
        </Layout.Content>
        <Layout.Footer>
          <span className="text-sm text-muted-foreground">Footer text</span>
        </Layout.Footer>
      </Layout>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// LayoutWithSider — sidebar layout
// ---------------------------------------------------------------------------

export const LayoutWithSider: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 p-4 text-sm font-medium">Layout with Sider</h3>
      <Layout style={{ minHeight: 400 }}>
        <Layout.Header style={headerStyle}>Header</Layout.Header>
        <Layout>
          <Layout.Sider width={200} style={siderStyle}>
            <div className="space-y-2">
              <div>Nav Item 1</div>
              <div>Nav Item 2</div>
              <div>Nav Item 3</div>
            </div>
          </Layout.Sider>
          <Layout.Content style={contentStyle}>Main Content</Layout.Content>
        </Layout>
        <Layout.Footer style={footerStyle}>Footer</Layout.Footer>
      </Layout>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// HeaderContentFooter — common page structure
// ---------------------------------------------------------------------------

export const HeaderContentFooter: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 p-4 text-sm font-medium">Top-Side-Content Layout</h3>
      <Layout style={{ minHeight: 400 }}>
        <Layout.Sider width={200} style={siderStyle}>
          Sidebar
        </Layout.Sider>
        <Layout>
          <Layout.Header style={headerStyle}>Header</Layout.Header>
          <Layout.Content style={contentStyle}>Content</Layout.Content>
          <Layout.Footer style={footerStyle}>Footer</Layout.Footer>
        </Layout>
      </Layout>
    </div>
  ),
};
