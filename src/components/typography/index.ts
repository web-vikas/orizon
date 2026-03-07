import { InternalTypography, Title, Text, Paragraph, Link } from "./Typography";

type TypographyComponent = typeof InternalTypography & {
  Title: typeof Title;
  Text: typeof Text;
  Paragraph: typeof Paragraph;
  Link: typeof Link;
};

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
