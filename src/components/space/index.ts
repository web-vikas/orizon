import { InternalSpace } from "./Space";
import { SpaceCompact } from "./Compact";

type SpaceComponent = typeof InternalSpace & {
  Compact: typeof SpaceCompact;
};

const Space = InternalSpace as SpaceComponent;
Space.Compact = SpaceCompact;

export { Space };
export type { SpaceProps, SpaceCompactProps, SpaceSize, SpaceDirection, SpaceAlign } from "./types";
