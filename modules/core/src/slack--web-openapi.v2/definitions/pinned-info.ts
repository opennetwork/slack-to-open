import * as t from "io-ts";
import { UserId } from "./user-id";

export const PinnedInfo = t.exact(t.type({
  pinned_by: UserId,
  pinned_ts: t.Int
}));