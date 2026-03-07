import { InternalLayout, Header, Content, Footer } from "./Layout";
import { Sider } from "./Sider";

type LayoutComponent = typeof InternalLayout & {
  Header: typeof Header;
  Sider: typeof Sider;
  Content: typeof Content;
  Footer: typeof Footer;
};

/**
 * Layout component for page scaffolding.
 *
 * Sub-components: `Layout.Header`, `Layout.Sider`, `Layout.Content`, `Layout.Footer`.
 *
 * @example
 * ```tsx
 * <Layout>
 *   <Layout.Header>Header</Layout.Header>
 *   <Layout>
 *     <Layout.Sider>Sidebar</Layout.Sider>
 *     <Layout.Content>Content</Layout.Content>
 *   </Layout>
 *   <Layout.Footer>Footer</Layout.Footer>
 * </Layout>
 * ```
 */
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
