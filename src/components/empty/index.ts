import { InternalEmpty, PRESENTED_IMAGE_DEFAULT, PRESENTED_IMAGE_SIMPLE } from "./Empty";

type EmptyComponent = typeof InternalEmpty & {
  PRESENTED_IMAGE_DEFAULT: typeof PRESENTED_IMAGE_DEFAULT;
  PRESENTED_IMAGE_SIMPLE: typeof PRESENTED_IMAGE_SIMPLE;
};

/**
 * Empty state component for displaying placeholder content when no data exists.
 *
 * Static properties: `Empty.PRESENTED_IMAGE_DEFAULT`, `Empty.PRESENTED_IMAGE_SIMPLE`.
 *
 * @example
 * ```tsx
 * <Empty />
 * <Empty description="No items found" />
 * <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
 *   <button>Create</button>
 * </Empty>
 * ```
 */
const Empty = InternalEmpty as EmptyComponent;
Empty.PRESENTED_IMAGE_DEFAULT = PRESENTED_IMAGE_DEFAULT;
Empty.PRESENTED_IMAGE_SIMPLE = PRESENTED_IMAGE_SIMPLE;

export { Empty };
export type { EmptyProps } from "./types";
