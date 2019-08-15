import * as t from "io-ts";

export const Group = t.exact(t.intersection([
  t.type({
    created: t.Int,
    creator: Definitions.UserId,
    id: Definitions.GroupId,
    is_group: t.boolean,
    members: t.array(Definitions.UserId),
    name: t.string,
    name_normalized: t.string,
    purpose: t.exact(t.type({
      creator: Definitions.TopicPurposeCreator,
      last_set: t.Int,
      value: t.string
    })),
    topic: t.exact(t.type({
      creator: Definitions.TopicPurposeCreator,
      last_set: t.Int,
      value: t.string
    }))
  }),
  t.partial({
    is_archived: t.boolean,
    is_deleted: t.boolean,
    is_moved: t.Int,
    is_mpim: t.boolean,
    is_open: t.boolean,
    is_pending_ext_shared: t.boolean,
    last_read: Definitions.Ts,
    latest: t.array(t.union([
      Objects.Message,
      t.null
    ])),
    num_members: t.Int,
    priority: t.number,
    unread_count: t.Int,
    unread_count_display: t.Int
  })
]));