/**
 * @file Upload component type definitions.
 *
 * Provides `UploadProps` for the file upload trigger and list,
 * `DraggerProps` for the drag-and-drop variant, `UploadFile` for
 * individual file records, and `UploadChangeInfo` for change events.
 *
 * @see {@link ./Upload.tsx} for the implementation.
 * @see {@link ./Dragger.tsx} for the drag-and-drop variant.
 * @see {@link ./index.ts} for the public export.
 */
import type { CSSProperties, ReactNode } from "react";

export type UploadListType =
  | "text"
  | "picture"
  | "picture-card"
  | "picture-circle";

export interface UploadFile {
  uid: string;
  name: string;
  status?: "uploading" | "done" | "error" | "removed";
  percent?: number;
  url?: string;
  thumbUrl?: string;
  size?: number;
  type?: string;
  response?: unknown;
  error?: unknown;
  originFileObj?: File;
}

export interface UploadChangeInfo {
  file: UploadFile;
  fileList: UploadFile[];
  event?: { percent: number };
}

export interface UploadProps {
  accept?: string;
  action?: string | ((file: File) => Promise<string>);
  beforeUpload?: (
    file: File,
    fileList: File[],
  ) => boolean | Promise<File | boolean>;
  customRequest?: (options: {
    file: File;
    onSuccess?: (response: unknown) => void;
    onError?: (error: Error) => void;
    onProgress?: (event: { percent: number }) => void;
  }) => void;
  fileList?: UploadFile[];
  defaultFileList?: UploadFile[];
  onChange?: (info: UploadChangeInfo) => void;
  onRemove?: (file: UploadFile) => boolean | Promise<boolean> | void;
  onPreview?: (file: UploadFile) => void;
  listType?: UploadListType;
  multiple?: boolean;
  maxCount?: number;
  disabled?: boolean;
  showUploadList?:
    | boolean
    | {
        showPreviewIcon?: boolean;
        showRemoveIcon?: boolean;
        showDownloadIcon?: boolean;
      };
  directory?: boolean;
  name?: string;
  headers?: Record<string, string>;
  data?:
    | Record<string, string>
    | ((file: UploadFile) => Record<string, string>);
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface DraggerProps extends UploadProps {
  height?: number;
}
