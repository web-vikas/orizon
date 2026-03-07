import { InternalUpload } from "./Upload";
import { Dragger } from "./Dragger";

type UploadComponent = typeof InternalUpload & {
  Dragger: typeof Dragger;
};

/**
 * Upload component for file selection and upload with progress
 * tracking and multiple display modes.
 *
 * Includes `Upload.Dragger` for drag-and-drop upload zones.
 *
 * @example
 * ```tsx
 * <Upload action="/api/upload">
 *   <button>Click to Upload</button>
 * </Upload>
 *
 * <Upload.Dragger action="/api/upload">
 *   <p>Drag files here or click to upload</p>
 * </Upload.Dragger>
 * ```
 */
const Upload = InternalUpload as UploadComponent;
(Upload as any).Dragger = Dragger;

export { Upload };
export type {
  UploadProps,
  DraggerProps,
  UploadFile,
  UploadChangeInfo,
  UploadListType,
} from "./types";
