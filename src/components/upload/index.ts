import { InternalUpload } from "./Upload";
import { Dragger } from "./Dragger";

type UploadComponent = typeof InternalUpload & {
  Dragger: typeof Dragger;
};

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
