/**
 * @file Result Stories
 *
 * Visual test suite for `<Result>` covering every prop.
 *
 * Stories:
 *   Playground       -- interactive controls
 *   SuccessResult    -- success status with extra actions
 *   ErrorResult      -- error status
 *   InfoResult       -- info status
 *   WarningResult    -- warning status
 *   HttpErrorCodes   -- 403, 404, 500 presets
 *   CustomIcon       -- custom icon override
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Result } from "./index";
import { Button } from "../button";
import { RocketIcon } from "lucide-react";

const meta: Meta<typeof Result> = {
  title: "Components/Result",
  component: Result,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Result>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    status: "success",
    title: "Playground Result",
    subTitle: "Adjust props in the controls panel.",
  },
};

// ---------------------------------------------------------------------------
// Success
// ---------------------------------------------------------------------------
export const SuccessResult: Story = {
  name: "Success",
  render: () => (
    <Result
      status="success"
      title="Successfully Purchased"
      subTitle="Order number: 2024-0512-3456. Check your email for confirmation."
      extra={
        <>
          <Button type="primary">Go Console</Button>
          <Button>Buy Again</Button>
        </>
      }
    />
  ),
};

// ---------------------------------------------------------------------------
// Error
// ---------------------------------------------------------------------------
export const ErrorResult: Story = {
  name: "Error",
  render: () => (
    <Result
      status="error"
      title="Submission Failed"
      subTitle="Please check your input and try again."
      extra={<Button type="primary">Try Again</Button>}
    />
  ),
};

// ---------------------------------------------------------------------------
// Info
// ---------------------------------------------------------------------------
export const InfoResult: Story = {
  name: "Info",
  render: () => (
    <Result
      status="info"
      title="Your operation is in progress"
      subTitle="We will notify you once the process completes."
    />
  ),
};

// ---------------------------------------------------------------------------
// Warning
// ---------------------------------------------------------------------------
export const WarningResult: Story = {
  name: "Warning",
  render: () => (
    <Result
      status="warning"
      title="There are some problems with your operation"
    />
  ),
};

// ---------------------------------------------------------------------------
// HTTP Error Codes
// ---------------------------------------------------------------------------
export const HttpErrorCodes: Story = {
  name: "HTTP Error Codes (403, 404, 500)",
  render: () => (
    <div className="flex flex-col gap-8">
      <Result status={403} extra={<Button type="primary">Back Home</Button>} />
      <Result status={404} extra={<Button type="primary">Back Home</Button>} />
      <Result status={500} extra={<Button type="primary">Back Home</Button>} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Custom Icon
// ---------------------------------------------------------------------------
export const CustomIcon: Story = {
  name: "Custom Icon",
  render: () => (
    <Result
      icon={<RocketIcon className="size-16 text-blue-500" />}
      title="Launched!"
      subTitle="Your project has been deployed."
      extra={<Button type="primary">View Dashboard</Button>}
    />
  ),
};
