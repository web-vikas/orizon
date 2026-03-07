/**
 * @file Modal Stories
 *
 * Visual test suite for `<Modal>` covering declarative and imperative usage.
 *
 * Stories:
 *   Playground      -- interactive controls panel
 *   BasicModal      -- simple open/close with title and content
 *   Centered        -- vertically centered dialog
 *   CustomFooter    -- custom footer with render function
 *   ConfirmLoading  -- OK button in loading state
 *   StaticMethods   -- Modal.confirm / info / success / error / warning
 *   NoFooter        -- footer={null} hides the action bar
 */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./index";
import { Button } from "../button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Modal>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    open: true,
    title: "Playground Modal",
    children: "Some content inside the modal.",
  },
};

// ---------------------------------------------------------------------------
// Basic Modal
// ---------------------------------------------------------------------------
export const BasicModal: Story = {
  name: "Basic Modal",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">Basic open/close</h3>
        <Button type="primary" onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          title="Basic Modal"
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <p>This is a basic modal with a title and default OK/Cancel footer.</p>
        </Modal>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Centered
// ---------------------------------------------------------------------------
export const Centered: Story = {
  name: "Centered",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">Vertically centered modal</h3>
        <Button onClick={() => setOpen(true)}>Open Centered</Button>
        <Modal
          open={open}
          title="Centered Modal"
          centered
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <p>This modal is vertically centered in the viewport.</p>
        </Modal>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Custom Footer
// ---------------------------------------------------------------------------
export const CustomFooter: Story = {
  name: "Custom Footer",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">Render-function footer</h3>
        <Button onClick={() => setOpen(true)}>Custom Footer</Button>
        <Modal
          open={open}
          title="Custom Footer"
          onCancel={() => setOpen(false)}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <Button type="link" onClick={() => setOpen(false)}>Skip</Button>
              <CancelBtn />
              <OkBtn />
            </>
          )}
        >
          <p>The footer is rendered via a function giving you full control.</p>
        </Modal>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Confirm Loading
// ---------------------------------------------------------------------------
export const ConfirmLoading: Story = {
  name: "Confirm Loading",
  render: () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleOk = () => {
      setLoading(true);
      setTimeout(() => { setLoading(false); setOpen(false); }, 2000);
    };
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">OK button shows spinner</h3>
        <Button onClick={() => setOpen(true)}>Open with Loading</Button>
        <Modal
          open={open}
          title="Async Submit"
          confirmLoading={loading}
          onOk={handleOk}
          onCancel={() => setOpen(false)}
        >
          <p>Click OK to simulate a 2-second async operation.</p>
        </Modal>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Static Methods
// ---------------------------------------------------------------------------
export const StaticMethods: Story = {
  name: "Static Methods (confirm / info / success / error / warning)",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Imperative API triggers</h3>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => Modal.confirm({ title: "Confirm", content: "Are you sure?" })}>
          Modal.confirm
        </Button>
        <Button onClick={() => Modal.info({ title: "Info", content: "Here is some info." })}>
          Modal.info
        </Button>
        <Button onClick={() => Modal.success({ title: "Success", content: "Operation completed." })}>
          Modal.success
        </Button>
        <Button onClick={() => Modal.error({ title: "Error", content: "Something went wrong." })}>
          Modal.error
        </Button>
        <Button onClick={() => Modal.warning({ title: "Warning", content: "Proceed with caution." })}>
          Modal.warning
        </Button>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// No Footer
// ---------------------------------------------------------------------------
export const NoFooter: Story = {
  name: "No Footer",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">footer=null hides action bar</h3>
        <Button onClick={() => setOpen(true)}>No Footer</Button>
        <Modal
          open={open}
          title="No Footer"
          footer={null}
          onCancel={() => setOpen(false)}
        >
          <p>This modal has no footer at all.</p>
        </Modal>
      </div>
    );
  },
};
