import * as t from "io-ts";
import * as Definitions from "../definitions";
import { Message } from "./message";
import { Team } from "./team";

export const Conversation = t.array(t.union([
  t.exact(t.intersection([
    t.type({
      created: t.Int,
      creator: Definitions.UserId,
      id: Definitions.Channel,
      is_archived: t.boolean,
      is_channel: t.boolean,
      is_general: t.boolean,
      is_group: t.boolean,
      is_im: t.boolean,
      is_mpim: t.boolean,
      is_org_shared: t.boolean,
      is_private: t.boolean,
      is_shared: t.boolean,
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
      connected_team_ids: t.array(Definitions.Team),
      conversation_host_id: Definitions.WorkspaceId,
      display_counts: t.exact(t.type({
        display_counts: t.Int,
        guest_counts: t.Int
      })),
      enterprise_id: Definitions.EnterpriseId,
      external_connections: t.exact(t.type({

      })),
      has_pins: t.boolean,
      internal_team_ids: t.array(Definitions.Team),
      is_ext_shared: t.boolean,
      is_global_shared: t.boolean,
      is_member: t.boolean,
      is_moved: t.Int,
      is_non_threadable: t.boolean,
      is_open: t.boolean,
      is_org_default: t.boolean,
      is_org_mandatory: t.boolean,
      is_pending_ext_shared: t.boolean,
      is_read_only: t.boolean,
      is_starred: t.boolean,
      is_thread_only: t.boolean,
      last_read: Definitions.Ts,
      latest: t.array(t.union([
        Message,
        t.null
      ])),
      members: t.array(Definitions.UserId),
      num_members: t.Int,
      parent_conversation: t.array(t.union([
        Definitions.Channel,
        t.null
      ])),
      pending_connected_team_ids: t.array(Definitions.Team),
      pending_shared: t.array(Definitions.Team),
      pin_count: t.Int,
      previous_names: t.array(Definitions.ChannelName),
      priority: t.number,
      shared_team_ids: t.array(Definitions.Team),
      shares: t.array(t.exact(t.intersection([
        t.type({
          is_active: t.boolean,
          team: Objects.Team,
          user: Definitions.UserId
        }),
        t.partial({
          accepted_user: Definitions.UserId
        })
      ]))),
      timezone_count: t.Int,
      unlinked: t.Int,
      unread_count: t.Int,
      unread_count_display: t.Int,
      user: Definitions.UserId,
      version: t.Int
    })
  ])),
  t.exact(t.intersection([
    t.type({
      created: t.Int,
      creator: Definitions.UserId,
      id: Definitions.Channel,
      is_archived: t.boolean,
      is_channel: t.boolean,
      is_general: t.boolean,
      is_group: t.boolean,
      is_im: t.boolean,
      is_mpim: t.boolean,
      is_org_shared: t.boolean,
      is_private: t.boolean,
      is_shared: t.boolean,
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
      connected_team_ids: t.array(Definitions.Team),
      conversation_host_id: Definitions.WorkspaceId,
      display_counts: t.exact(t.type({
        display_counts: t.Int,
        guest_counts: t.Int
      })),
      internal_team_ids: t.array(Definitions.Team),
      is_ext_shared: t.boolean,
      is_member: t.boolean,
      is_moved: t.Int,
      is_open: t.boolean,
      is_pending_ext_shared: t.boolean,
      is_read_only: t.boolean,
      is_starred: t.boolean,
      last_read: Definitions.Ts,
      latest: t.array(t.union([
        Objects.Message,
        t.null
      ])),
      members: t.array(Definitions.UserId),
      num_members: t.Int,
      parent_conversation: t.array(t.union([
        Definitions.Channel,
        t.null
      ])),
      pending_connected_team_ids: t.array(Definitions.Team),
      pending_shared: t.array(Definitions.Team),
      pin_count: t.Int,
      previous_names: t.array(Definitions.ChannelName),
      priority: t.number,
      shared_team_ids: t.array(Definitions.Team),
      shares: t.array(t.exact(t.intersection([
        t.type({
          is_active: t.boolean,
          team: Objects.Team,
          user: Definitions.UserId
        }),
        t.partial({
          accepted_user: Definitions.UserId
        })
      ]))),
      timezone_count: t.Int,
      unlinked: t.Int,
      unread_count: t.Int,
      unread_count_display: t.Int,
      user: Definitions.UserId,
      version: t.Int
    })
  ])),
  t.exact(t.intersection([
    t.type({
      created: t.Int,
      id: Definitions.DmId,
      is_im: t.boolean,
      is_org_shared: t.boolean,
      priority: t.number,
      user: Definitions.UserId
    }),
    t.partial({
      has_pins: t.boolean,
      is_ext_shared: t.boolean,
      is_open: t.boolean,
      is_shared: t.boolean,
      is_starred: t.boolean,
      is_user_deleted: t.boolean,
      last_read: Definitions.Ts,
      latest: t.array(t.union([
        Objects.Message,
        t.null
      ])),
      parent_conversation: t.array(t.union([
        Definitions.Channel,
        t.null
      ])),
      pin_count: t.Int,
      shares: t.array(t.exact(t.type({
        date_create: t.Int,
        id: Definitions.Team,
        is_active: t.boolean,
        name: t.string,
        team: Objects.Team
      }))),
      unread_count: t.Int,
      unread_count_display: t.Int,
      version: t.Int
    })
  ]))
]));