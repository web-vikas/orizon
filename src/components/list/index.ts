import { InternalList, ListItem as InternalListItem, ListItemMeta } from "./List";

type ListItemComponent = typeof InternalListItem & {
  Meta: typeof ListItemMeta;
};

const ListItemWithMeta = InternalListItem as ListItemComponent;
ListItemWithMeta.Meta = ListItemMeta;

type ListComponent = typeof InternalList & {
  Item: typeof ListItemWithMeta;
};

/**
 * List component for rendering data source items with pagination.
 *
 * Sub-components: `List.Item`, `List.Item.Meta`.
 *
 * @example
 * ```tsx
 * <List
 *   dataSource={data}
 *   renderItem={(item) => (
 *     <List.Item>
 *       <List.Item.Meta title={item.title} description={item.desc} />
 *     </List.Item>
 *   )}
 *   bordered
 * />
 * ```
 */
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
