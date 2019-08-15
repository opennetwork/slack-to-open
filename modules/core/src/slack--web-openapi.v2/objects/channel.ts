import * as t from "io-ts";
import * as Definitions from "../definitions";
import { Message } from "./message";

export const Channel = t.exact(t.intersection([
  t.type({
    created: t.Int,
    creator: Definitions.UserId,
    id: Definitions.ChannelId,
    is_channel: t.boolean,
    is_mpim: t.boolean,
    is_org_shared: t.boolean,
    is_private: t.boolean,
    is_shared: t.boolean,
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
    accepted_user: Definitions.UserId,
    is_archived: t.boolean,
    is_general: t.boolean,
    is_member: t.boolean,
    is_moved: t.Int,
    is_pending_ext_shared: t.boolean,
    is_read_only: t.boolean,
    last_read: Definitions.Ts,
    latest: t.array(t.union([
      Message,
      t.null
    ])),
    num_members: t.Int,
    pending_shared: t.array(Definitions.Team),
    previous_names: t.array(Definitions.ChannelName),
    priority: t.number,
    unlinked: t.Int,
    unread_count: t.Int,
    unread_count_display: t.Int
  })
]));