/**
 * @file Avatar — Public Barrel Export
 *
 * Composes `InternalAvatar` + `InternalAvatarGroup` into a single
 * `Avatar` export with a `.Group` static property.
 */

import { InternalAvatar, InternalAvatarGroup } from "./Avatar";

type AvatarComponent = typeof InternalAvatar & {
  Group: typeof InternalAvatarGroup;
};

/**
 * Avatar component for user profile images, icons, or text initials.
 *
 * Supports `src` image, `icon` fallback, text `children` with
 * auto-scaling, `shape` (circle / square), and `size`.
 *
 * Use `Avatar.Group` to display a stacked group with overflow count.
 *
 * @example
 * ```tsx
 * <Avatar src="/photo.jpg" alt="User" />
 * <Avatar shape="square" size={48}>AB</Avatar>
 *
 * <Avatar.Group max={{ count: 3 }}>
 *   <Avatar src="/a.jpg" />
 *   <Avatar src="/b.jpg" />
 *   <Avatar src="/c.jpg" />
 *   <Avatar src="/d.jpg" />
 * </Avatar.Group>
 * ```
 */
const Avatar = InternalAvatar as AvatarComponent;
Avatar.Group = InternalAvatarGroup;

export { Avatar };
export type { AvatarProps, AvatarGroupProps, AvatarSize, AvatarShape, AvatarGroupMaxConfig } from "./types";
