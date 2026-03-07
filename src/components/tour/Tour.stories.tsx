/**
 * @file Tour Stories
 *
 * Visual test suite for `<Tour>` covering every major prop:
 * - Playground (args)
 * - PrimaryType
 * - CenteredNoTarget
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Tour } from "./index";
import { useRef, useState } from "react";

const meta: Meta<typeof Tour> = {
  title: "Components/Tour",
  component: Tour,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Tour>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

function TourDemo() {
  const ref1 = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Click the button to start the tour</h3>
      <div className="flex gap-4">
        <button
          ref={ref1}
          className="rounded-md border px-4 py-2 text-sm"
          onClick={() => setOpen(true)}
        >
          Start Tour
        </button>
        <div ref={ref2} className="rounded-md border px-4 py-2 text-sm">
          Feature Area
        </div>
        <button ref={ref3} className="rounded-md border px-4 py-2 text-sm">
          Save
        </button>
      </div>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        onFinish={() => setOpen(false)}
        steps={[
          {
            target: ref1,
            title: "Welcome",
            description: "Click this button any time to replay the tour.",
          },
          {
            target: ref2,
            title: "Feature Area",
            description: "This is where the main content lives.",
          },
          {
            target: ref3,
            title: "Save",
            description: "Remember to save your work.",
          },
        ]}
      />
    </div>
  );
}

export const Playground: Story = {
  render: () => <TourDemo />,
};

// ---------------------------------------------------------------------------
// Primary Type
// ---------------------------------------------------------------------------

function PrimaryTourDemo() {
  const ref1 = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Primary style tour</h3>
      <button
        ref={ref1}
        className="rounded-md border px-4 py-2 text-sm"
        onClick={() => setOpen(true)}
      >
        Start Primary Tour
      </button>
      <Tour
        open={open}
        type="primary"
        onClose={() => setOpen(false)}
        onFinish={() => setOpen(false)}
        steps={[
          {
            target: ref1,
            title: "Primary Step",
            description: "This step uses the primary colour scheme.",
          },
        ]}
      />
    </div>
  );
}

export const PrimaryType: Story = {
  render: () => <PrimaryTourDemo />,
};

// ---------------------------------------------------------------------------
// Centered (no target)
// ---------------------------------------------------------------------------

function CenteredTourDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Centered step without a target element</h3>
      <button
        className="rounded-md border px-4 py-2 text-sm"
        onClick={() => setOpen(true)}
      >
        Start Centered Tour
      </button>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        onFinish={() => setOpen(false)}
        steps={[
          {
            target: null,
            title: "Welcome!",
            description: "This step appears in the centre of the viewport.",
            placement: "center",
          },
        ]}
      />
    </div>
  );
}

export const CenteredNoTarget: Story = {
  render: () => <CenteredTourDemo />,
};
