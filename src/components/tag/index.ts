import { InternalTag, CheckableTag } from "./Tag";

type TagComponent = typeof InternalTag & {
  CheckableTag: typeof CheckableTag;
};

/**
 * Tag component for displaying small coloured labels / badges.
 *
 * Includes a `Tag.CheckableTag` sub-component for toggleable tags.
 *
 * @example
 * ```tsx
 * <Tag color="green">Success</Tag>
 * <Tag closable>Removable</Tag>
 * <Tag.CheckableTag checked={true} onChange={(v) => console.log(v)}>
 *   Option
 * </Tag.CheckableTag>
 * ```
 */
const Tag = InternalTag as TagComponent;
Tag.CheckableTag = CheckableTag;

export { Tag };
export type { TagProps, CheckableTagProps } from "./types";
