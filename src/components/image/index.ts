import { InternalImage, PreviewGroup } from "./Image";

type ImageComponent = typeof InternalImage & {
  PreviewGroup: typeof PreviewGroup;
};

/**
 * Image component with built-in preview modal.
 *
 * Sub-components: `Image.PreviewGroup`.
 *
 * @example
 * ```tsx
 * <Image src="/photo.jpg" width={200} />
 * <Image.PreviewGroup items={['/a.jpg', '/b.jpg']}>
 *   <Image src="/a.jpg" />
 *   <Image src="/b.jpg" />
 * </Image.PreviewGroup>
 * ```
 */
const Image = InternalImage as ImageComponent;
Image.PreviewGroup = PreviewGroup;

export { Image };
export type { ImageProps, PreviewGroupProps, PreviewConfig } from "./types";
