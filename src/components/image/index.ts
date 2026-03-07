import { InternalImage, PreviewGroup } from "./Image";

type ImageComponent = typeof InternalImage & {
  PreviewGroup: typeof PreviewGroup;
};

const Image = InternalImage as ImageComponent;
Image.PreviewGroup = PreviewGroup;

export { Image };
export type { ImageProps, PreviewGroupProps, PreviewConfig } from "./types";
