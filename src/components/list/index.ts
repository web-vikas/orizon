import { InternalList, ListItem as InternalListItem, ListItemMeta } from "./List";

type ListItemComponent = typeof InternalListItem & {
  Meta: typeof ListItemMeta;
};

const ListItemWithMeta = InternalListItem as ListItemComponent;
ListItemWithMeta.Meta = ListItemMeta;

type ListComponent = typeof InternalList & {
  Item: typeof ListItemWithMeta;
};

const List = InternalList as unknown as ListComponent;
(List as unknown as Record<string, unknown>).Item = ListItemWithMeta;

export { List };
export type {
  ListProps,
  ListItemProps,
  ListItemMetaProps,
  ListSize,
  ListItemLayout,
  ListGridConfig,
  ListPaginationConfig,
} from "./types";
