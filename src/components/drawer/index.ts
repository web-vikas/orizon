import { InternalDrawer } from "./Drawer";

/**
 * Drawer component — a panel that slides from any edge of the screen.
 *
 * @example
 * ```tsx
 * <Drawer open={open} onClose={() => setOpen(false)} title="Settings">
 *   <p>Content</p>
 * </Drawer>
 * <Drawer placement="left" open={open} onClose={() => setOpen(false)}>
 *   <p>Left drawer</p>
 * </Drawer>
 * ```
 */
const Drawer = InternalDrawer;

export { Drawer };
export type { DrawerProps, DrawerPlacement, DrawerSize } from "./types";
