import { InternalAvatar, InternalAvatarGroup } from "./Avatar";

type AvatarComponent = typeof InternalAvatar & {
  Group: typeof InternalAvatarGroup;
};

const Avatar = InternalAvatar as AvatarComponent;
Avatar.Group = InternalAvatarGroup;

export { Avatar };
export type { AvatarProps, AvatarGroupProps, AvatarSize, AvatarShape, AvatarGroupMaxConfig } from "./types";
