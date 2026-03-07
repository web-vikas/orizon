import { InternalLayout, Header, Content, Footer } from "./Layout";
import { Sider } from "./Sider";

type LayoutComponent = typeof InternalLayout & {
  Header: typeof Header;
  Sider: typeof Sider;
  Content: typeof Content;
  Footer: typeof Footer;
};

const Layout = InternalLayout as LayoutComponent;
Layout.Header = Header;
Layout.Sider = Sider;
Layout.Content = Content;
Layout.Footer = Footer;

export { Layout };
export type {
  LayoutProps,
  HeaderProps,
  ContentProps,
  FooterProps,
  SiderProps,
  SiderTheme,
  SiderBreakpoint,
} from "./types";
