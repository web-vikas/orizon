/**
 * @file Message Stories
 *
 * Visual test suite for the imperative `message` API.
 * Stories:
 *   Playground        — interactive message types
 *   MessageTypes      — success / error / info / warning / loading
 *   CustomDuration    — custom auto-close duration
 *   ManualClose       — manually close a message
 */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { message } from "./index";

const meta: Meta = {
  title: "Components/Message",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Playground — interactive message types
// ---------------------------------------------------------------------------

export const Playground: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Click to trigger messages</h3>
      <div className="flex flex-wrap gap-2">
        <button
          className="rounded bg-green-500 px-3 py-1.5 text-sm text-white"
          onClick={() => message.success("Operation successful!")}
        >
          Success
        </button>
        <button
          className="rounded bg-red-500 px-3 py-1.5 text-sm text-white"
          onClick={() => message.error("Something went wrong")}
        >
          Error
        </button>
        <button
          className="rounded bg-blue-500 px-3 py-1.5 text-sm text-white"
          onClick={() => message.info("Here is some information")}
        >
          Info
        </button>
        <button
          className="rounded bg-yellow-500 px-3 py-1.5 text-sm text-white"
          onClick={() => message.warning("This is a warning")}
        >
          Warning
        </button>
        <button
          className="rounded bg-blue-400 px-3 py-1.5 text-sm text-white"
          onClick={() => message.loading("Loading...", 2)}
        >
          Loading
        </button>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// MessageTypes — success / error / info / warning / loading
// ---------------------------------------------------------------------------

export const MessageTypes: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">All Message Types</h3>
      <div className="flex flex-wrap gap-2">
        {(["success", "error", "info", "warning", "loading"] as const).map((type) => (
          <button
            key={type}
            className="rounded border px-3 py-1.5 text-sm capitalize"
            onClick={() => message[type](`This is a ${type} message`)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// CustomDuration — custom auto-close duration
// ---------------------------------------------------------------------------

export const CustomDuration: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Custom Duration</h3>
      <div className="flex flex-wrap gap-2">
        <button
          className="rounded border px-3 py-1.5 text-sm"
          onClick={() => message.info("Closes in 1 second", 1)}
        >
          1s
        </button>
        <button
          className="rounded border px-3 py-1.5 text-sm"
          onClick={() => message.info("Closes in 5 seconds", 5)}
        >
          5s
        </button>
        <button
          className="rounded border px-3 py-1.5 text-sm"
          onClick={() => message.info("Closes in 10 seconds", 10)}
        >
          10s
        </button>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// ManualClose — manually close a message
// ---------------------------------------------------------------------------

export const ManualClose: Story = {
  render: () => {
    const closeRef = React.useRef<(() => void) | null>(null);
    return (
      <div>
        <h3 className="mb-4 text-sm font-medium">Manual Close</h3>
        <div className="flex gap-2">
          <button
            className="rounded border px-3 py-1.5 text-sm"
            onClick={() => {
              closeRef.current = message.loading("Loading forever...", 0);
            }}
          >
            Show Loading
          </button>
          <button
            className="rounded border px-3 py-1.5 text-sm"
            onClick={() => closeRef.current?.()}
          >
            Close It
          </button>
          <button
            className="rounded border px-3 py-1.5 text-sm"
            onClick={() => message.destroy()}
          >
            Destroy All
          </button>
        </div>
      </div>
    );
  },
};
