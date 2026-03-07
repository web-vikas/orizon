/**
 * @file Public API for the Splitter component.
 *
 * Re-exports `<Splitter>` with the `.Panel` sub-component.
 *
 * @see ./Splitter.tsx - implementation
 * @see ./Panel.tsx    - panel sub-component
 */
import { InternalSplitter } from "./Splitter";
import { Panel } from "./Panel";

type SplitterComponent = typeof InternalSplitter & {
  Panel: typeof Panel;
};

/**
 * Resizable split-pane layout container.
 *
 * Use `Splitter.Panel` as children to define resizable sections.
 *
 * @example
 * ```tsx
 * <Splitter>
 *   <Splitter.Panel defaultSize={50} min={20}>Left</Splitter.Panel>
 *   <Splitter.Panel defaultSize={50}>Right</Splitter.Panel>
 * </Splitter>
 *
 * <Splitter layout="vertical" style={{ height: 400 }}>
 *   <Splitter.Panel>Top</Splitter.Panel>
 *   <Splitter.Panel>Bottom</Splitter.Panel>
 * </Splitter>
 * ```
 */
const Splitter = InternalSplitter as SplitterComponent;
Splitter.Panel = Panel;

export { Splitter };
export type {
  SplitterProps,
  SplitterPanelProps,
  SplitterLayout,
} from "./types";
