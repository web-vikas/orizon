import { InternalSplitter } from "./Splitter";
import { Panel } from "./Panel";

type SplitterComponent = typeof InternalSplitter & {
  Panel: typeof Panel;
};

const Splitter = InternalSplitter as SplitterComponent;
Splitter.Panel = Panel;

export { Splitter };
export type {
  SplitterProps,
  SplitterPanelProps,
  SplitterLayout,
} from "./types";
