import * as t from "io-ts";
import * as Definitions from "../definitions";
import { Message } from "./message";

export const Channel = t.intersection([
  t.type({
    created: t.union([
      t.string,
      t.Int
    ]),
    creator: Definitions.UserId,
    id: Definitions.ChannelId,
    members: t.array(Definitions.UserId),
    name: t.string,
    purpose: t.type({
      creator: Definitions.TopicPurposeCreator,
      last_set: t.union([
        t.string,
        t.Int
      ]),
      value: t.string
    }, "DefinitionsObjsChannelPropertiesPurpose"),
    topic: t.type({
      creator: Definitions.TopicPurposeCreator,
      last_set: t.union([
        t.string,
        t.Int
      ]),
      value: t.string
    }, "DefinitionsObjsChannelPropertiesTopic")
  }),
  t.partial({
    accepted_user: Definitions.UserId,
    is_archived: t.boolean,
    is_channel: t.boolean,
    is_general: t.boolean,
    is_member: t.boolean,
    is_moved: t.union([
      t.string,
      t.Int
    ]),
    is_mpim: t.boolean,
    is_org_shared: t.boolean,
    is_pending_ext_shared: t.boolean,
    is_private: t.boolean,
    is_read_only: t.boolean,
    is_shared: t.boolean,
    last_read: Definitions.Ts,
    latest: t.array(t.union([
      Message,
      t.null
    ])),
    name_normalized: t.string,
    num_members: t.union([
      t.string,
      t.Int
    ]),
    pending_shared: t.array(Definitions.TeamReference),
    previous_names: t.array(Definitions.ChannelName),
    priority: t.number,
    unlinked: t.union([
      t.string,
      t.Int
    ]),
    unread_count: t.union([
      t.string,
      t.Int
    ]),
    unread_count_display: t.union([
      t.string,
      t.Int
    ])
  })
], "DefinitionsObjsChannel");