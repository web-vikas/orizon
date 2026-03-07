import { InternalTag, CheckableTag } from "./Tag";

type TagComponent = typeof InternalTag & {
  CheckableTag: typeof CheckableTag;
};

const Tag = InternalTag as TagComponent;
Tag.CheckableTag = CheckableTag;

export { Tag };
export type { TagProps, CheckableTagProps } from "./types";
