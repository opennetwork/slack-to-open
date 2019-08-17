import * as t from "io-ts";
import { UserId } from "./user-id";

export const PinnedInfo = t.type({
  pinned_by: UserId,
  pinned_ts: t.union([
    t.string,
    t.Int
  ])
}, "DefinitionsDefsPinnedInfo");
export type SlackPinnedInfo = t.TypeOf<typeof PinnedInfo>;