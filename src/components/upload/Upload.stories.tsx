/**
 * @file Upload Stories
 *
 * Visual test suite for `<Upload>` covering every major prop:
 * - Playground (args)
 * - PictureCard
 * - Dragger
 * - DefaultFileList
 * - MaxCount
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Upload } from "./index";
import type { UploadFile } from "./types";
import { UploadCloud } from "lucide-react";

const meta: Meta<typeof Upload> = {
  title: "Components/Upload",
  component: Upload,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Upload>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    children: (
      <button className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm">
        <UploadCloud className="size-4" />
        Click to Upload
      </button>
    ),
  },
};

// ---------------------------------------------------------------------------
// Picture Card
// ---------------------------------------------------------------------------

export const PictureCard: Story = {
  render: () => {
    const defaultFiles: UploadFile[] = [
      {
        uid: "1",
        name: "photo.png",
        status: "done",
        url: "https://placehold.co/104x104",
      },
    ];
    return (
      <div>
        <h3 className="mb-4 text-sm font-medium">Picture-card list type</h3>
        <Upload listType="picture-card" defaultFileList={defaultFiles} />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Dragger
// ---------------------------------------------------------------------------

export const DraggerStory: Story = {
  name: "Dragger",
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Drag and drop upload zone</h3>
      <Upload.Dragger>
        <div className="flex flex-col items-center gap-2 py-4">
          <UploadCloud className="size-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Click or drag files to this area to upload
          </p>
        </div>
      </Upload.Dragger>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Default File List
// ---------------------------------------------------------------------------

export const DefaultFileList: Story = {
  render: () => {
    const files: UploadFile[] = [
      { uid: "1", name: "report.pdf", status: "done" },
      { uid: "2", name: "photo.png", status: "done" },
      { uid: "3", name: "failed.zip", status: "error" },
    ];
    return (
      <div>
        <h3 className="mb-4 text-sm font-medium">Pre-populated file list</h3>
        <Upload defaultFileList={files}>
          <button className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm">
            <UploadCloud className="size-4" />
            Upload
          </button>
        </Upload>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Max Count
// ---------------------------------------------------------------------------

export const MaxCount: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Maximum 3 files</h3>
      <Upload maxCount={3} listType="picture-card" />
    </div>
  ),
};
