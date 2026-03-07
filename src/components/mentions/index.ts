import { InternalMentions } from "./Mentions";

/**
 * Mentions component for textarea with @-mention auto-complete.
 *
 * @example
 * ```tsx
 * <Mentions
 *   options={[{ value: 'alice' }, { value: 'bob' }]}
 *   placeholder="Type @ to mention someone"
 * />
 * ```
 */
const Mentions = InternalMentions;

export { Mentions };
export type {
  MentionsProps,
  MentionOption,
  MentionsPlacement,
  MentionsStatus,
  MentionsVariant,
} from "./types";
