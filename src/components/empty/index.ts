import { InternalEmpty, PRESENTED_IMAGE_DEFAULT, PRESENTED_IMAGE_SIMPLE } from "./Empty";

type EmptyComponent = typeof InternalEmpty & {
  PRESENTED_IMAGE_DEFAULT: typeof PRESENTED_IMAGE_DEFAULT;
  PRESENTED_IMAGE_SIMPLE: typeof PRESENTED_IMAGE_SIMPLE;
};

const Empty = InternalEmpty as EmptyComponent;
Empty.PRESENTED_IMAGE_DEFAULT = PRESENTED_IMAGE_DEFAULT;
Empty.PRESENTED_IMAGE_SIMPLE = PRESENTED_IMAGE_SIMPLE;

export { Empty };
export type { EmptyProps } from "./types";
