import * as t from "io-ts";

export const Comment = t.exact(t.intersection([
  t.type({
    comment: t.string,
    created: t.Int,
    id: Definitions.CommentId,
    is_intro: t.boolean,
    timestamp: t.Int,
    user: Definitions.UserId
  }),
  t.partial({
    is_starred: t.boolean,
    num_stars: t.Int,
    pinned_info: Definitions.PinnedInfo,
    pinned_to: t.array(Definitions.Channel),
    reactions: t.array(Objects.Reaction)
  })
]));