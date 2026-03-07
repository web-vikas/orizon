/**
 * @file Breadcrumb — Public Barrel Export
 *
 * Re-exports the `<Breadcrumb>` navigation component.
 */

/**
 * Breadcrumb navigation trail.
 *
 * Renders a list of `items` as linked crumbs with an automatic
 * separator. Supports dropdown `menu` per item and a custom
 * `separator` node.
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { title: "Home", href: "/" },
 *     { title: "Settings", href: "/settings" },
 *     { title: "Profile" },
 *   ]}
 * />
 *
 * <Breadcrumb separator=">" items={[{ title: "A" }, { title: "B" }]} />
 * ```
 */
export { Breadcrumb } from "./Breadcrumb";
export type { BreadcrumbProps, BreadcrumbItemType, BreadcrumbMenuItemType } from "./types";
