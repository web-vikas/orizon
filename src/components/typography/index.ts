import { InternalTypography, Title, Text, Paragraph, Link } from "./Typography";

type TypographyComponent = typeof InternalTypography & {
  Title: typeof Title;
  Text: typeof Text;
  Paragraph: typeof Paragraph;
  Link: typeof Link;
};

/**
 * Typography component family for rich text display.
 *
 * Sub-components: `Typography.Title`, `Typography.Text`,
 * `Typography.Paragraph`, `Typography.Link`.
 *
 * @example
 * ```tsx
 * <Typography.Title level={3}>Heading</Typography.Title>
 * <Typography.Text type="secondary">Muted text</Typography.Text>
 * <Typography.Paragraph copyable>Copy me</Typography.Paragraph>
 * <Typography.Link href="/docs">Documentation</Typography.Link>
 * ```
 */
const Typography = InternalTypography as TypographyComponent;
Typography.Title = Title;
Typography.Text = Text;
Typography.Paragraph = Paragraph;
Typography.Link = Link;

export { Typography };
export type {
  TypographyType,
  EllipsisConfig,
  CopyableConfig,
  EditableConfig,
  TypographyTitleProps,
  TypographyTextProps,
  TypographyParagraphProps,
  TypographyLinkProps,
} from "./types";
