import * as t from "io-ts";

export const PinnedInfo = t.exact(t.type({
  pinned_by: Definitions.UserId,
  pinned_ts: t.Int
}));