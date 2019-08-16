import * as t from "io-ts";
import * as Definitions from "../definitions";
import { Reaction } from "./reaction";

export const Comment = t.intersection([
  t.type({
    comment: t.string,
    created: t.union([
      t.string,
      t.Int
    ]),
    id: Definitions.CommentId,
    timestamp: t.union([
      t.string,
      t.Int
    ]),
    user: Definitions.UserId
  }),
  t.partial({
    is_intro: t.boolean,
    is_starred: t.boolean,
    num_stars: t.union([
      t.string,
      t.Int
    ]),
    pinned_info: Definitions.PinnedInfo,
    pinned_to: t.array(Definitions.ChannelReference),
    reactions: t.array(Reaction)
  })
], "DefinitionsObjsComment");