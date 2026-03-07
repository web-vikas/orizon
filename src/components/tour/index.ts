import { InternalTour } from "./Tour";

/**
 * Tour component for guided product walkthroughs with
 * a spotlight mask and step-by-step popover navigation.
 *
 * @example
 * ```tsx
 * <Tour
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   steps={[
 *     { target: ref1, title: "Step 1", description: "Hello!" },
 *     { target: ref2, title: "Step 2", description: "Check this." },
 *   ]}
 * />
 * ```
 */
const Tour = InternalTour;

export { Tour };
export type { TourProps, TourStepConfig, TourPlacement, TourType } from "./types";
