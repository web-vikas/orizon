import { InternalWatermark } from "./Watermark";

/**
 * Watermark component for overlaying repeating text or image
 * watermarks on child content.
 *
 * @example
 * ```tsx
 * <Watermark content="Draft">
 *   <div style={{ height: 300 }}>Protected content</div>
 * </Watermark>
 * ```
 */
const Watermark = InternalWatermark;

export { Watermark };
export type { WatermarkProps, WatermarkFont } from "./types";
