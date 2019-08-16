import * as t from "io-ts";
import * as Definitions from "../definitions";
import { Message } from "./message";
import { Team } from "./team";

export const Conversation = t.array(t.union([
  t.intersection([
    t.type({
      created: t.union([
        t.string,
        t.Int
      ]),
      creator: Definitions.UserId,
      id: Definitions.ChannelReference,
      name: t.string,
      name_normalized: t.string,
      purpose: t.type({
        creator: Definitions.TopicPurposeCreator,
        last_set: t.union([
          t.string,
          t.Int
        ]),
        value: t.string
      }, "DefinitionsObjsConversationItemsPropertiesPurpose"),
      topic: t.type({
        creator: Definitions.TopicPurposeCreator,
        last_set: t.union([
          t.string,
          t.Int
        ]),
        value: t.string
      }, "DefinitionsObjsConversationItemsPropertiesTopic")
    }),
    t.partial({
      accepted_user: Definitions.UserId,
      connected_team_ids: t.array(Definitions.TeamReference),
      conversation_host_id: Definitions.WorkspaceId,
      display_counts: t.type({
        display_counts: t.union([
          t.string,
          t.Int
        ]),
        guest_counts: t.union([
          t.string,
          t.Int
        ])
      }, "DefinitionsObjsConversationItemsPropertiesDisplayCounts"),
      enterprise_id: Definitions.EnterpriseId,
      external_connections: t.type({

      }, "DefinitionsObjsConversationItemsPropertiesExternalConnections"),
      has_pins: t.boolean,
      internal_team_ids: t.array(Definitions.TeamReference),
      is_archived: t.boolean,
      is_channel: t.boolean,
      is_ext_shared: t.boolean,
      is_general: t.boolean,
      is_global_shared: t.boolean,
      is_group: t.boolean,
      is_im: t.boolean,
      is_member: t.boolean,
      is_moved: t.union([
        t.string,
        t.Int
      ]),
      is_mpim: t.boolean,
      is_non_threadable: t.boolean,
      is_open: t.boolean,
      is_org_default: t.boolean,
      is_org_mandatory: t.boolean,
      is_org_shared: t.boolean,
      is_pending_ext_shared: t.boolean,
      is_private: t.boolean,
      is_read_only: t.boolean,
      is_shared: t.boolean,
      is_starred: t.boolean,
      is_thread_only: t.boolean,
      last_read: Definitions.Ts,
      latest: t.array(t.union([
        Message,
        t.null
      ])),
      members: t.array(Definitions.UserId),
      num_members: t.union([
        t.string,
        t.Int
      ]),
      parent_conversation: t.array(t.union([
        Definitions.ChannelReference,
        t.null
      ])),
      pending_connected_team_ids: t.array(Definitions.TeamReference),
      pending_shared: t.array(Definitions.TeamReference),
      pin_count: t.union([
        t.string,
        t.Int
      ]),
      previous_names: t.array(Definitions.ChannelName),
      priority: t.number,
      shared_team_ids: t.array(Definitions.TeamReference),
      shares: t.array(t.intersection([
        t.type({
          team: Team,
          user: Definitions.UserId
        }),
        t.partial({
          accepted_user: Definitions.UserId,
          is_active: t.boolean
        })
      ], "DefinitionsObjsConversationItemsPropertiesSharesItems")),
      timezone_count: t.union([
        t.string,
        t.Int
      ]),
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
      ]),
      user: Definitions.UserId,
      version: t.union([
        t.string,
        t.Int
      ])
    })
  ], "DefinitionsObjsConversationItems"),
  t.intersection([
    t.type({
      created: t.union([
        t.string,
        t.Int
      ]),
      creator: Definitions.UserId,
      id: Definitions.ChannelReference,
      name: t.string,
      name_normalized: t.string,
      purpose: t.type({
        creator: Definitions.TopicPurposeCreator,
        last_set: t.union([
          t.string,
          t.Int
        ]),
        value: t.string
      }, "DefinitionsObjsConversationItemsPropertiesPurpose"),
      topic: t.type({
        creator: Definitions.TopicPurposeCreator,
        last_set: t.union([
          t.string,
          t.Int
        ]),
        value: t.string
      }, "DefinitionsObjsConversationItemsPropertiesTopic")
    }),
    t.partial({
      accepted_user: Definitions.UserId,
      connected_team_ids: t.array(Definitions.TeamReference),
      conversation_host_id: Definitions.WorkspaceId,
      display_counts: t.type({
        display_counts: t.union([
          t.string,
          t.Int
        ]),
        guest_counts: t.union([
          t.string,
          t.Int
        ])
      }, "DefinitionsObjsConversationItemsPropertiesDisplayCounts"),
      internal_team_ids: t.array(Definitions.TeamReference),
      is_archived: t.boolean,
      is_channel: t.boolean,
      is_ext_shared: t.boolean,
      is_general: t.boolean,
      is_group: t.boolean,
      is_im: t.boolean,
      is_member: t.boolean,
      is_moved: t.union([
        t.string,
        t.Int
      ]),
      is_mpim: t.boolean,
      is_open: t.boolean,
      is_org_shared: t.boolean,
      is_pending_ext_shared: t.boolean,
      is_private: t.boolean,
      is_read_only: t.boolean,
      is_shared: t.boolean,
      is_starred: t.boolean,
      last_read: Definitions.Ts,
      latest: t.array(t.union([
        Message,
        t.null
      ])),
      members: t.array(Definitions.UserId),
      num_members: t.union([
        t.string,
        t.Int
      ]),
      parent_conversation: t.array(t.union([
        Definitions.ChannelReference,
        t.null
      ])),
      pending_connected_team_ids: t.array(Definitions.TeamReference),
      pending_shared: t.array(Definitions.TeamReference),
      pin_count: t.union([
        t.string,
        t.Int
      ]),
      previous_names: t.array(Definitions.ChannelName),
      priority: t.number,
      shared_team_ids: t.array(Definitions.TeamReference),
      shares: t.array(t.intersection([
        t.type({
          team: Team,
          user: Definitions.UserId
        }),
        t.partial({
          accepted_user: Definitions.UserId,
          is_active: t.boolean
        })
      ], "DefinitionsObjsConversationItemsPropertiesSharesItems")),
      timezone_count: t.union([
        t.string,
        t.Int
      ]),
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
      ]),
      user: Definitions.UserId,
      version: t.union([
        t.string,
        t.Int
      ])
    })
  ], "DefinitionsObjsConversationItems"),
  t.intersection([
    t.type({
      created: t.union([
        t.string,
        t.Int
      ]),
      id: Definitions.DmId,
      priority: t.number,
      user: Definitions.UserId
    }),
    t.partial({
      has_pins: t.boolean,
      is_ext_shared: t.boolean,
      is_im: t.boolean,
      is_open: t.boolean,
      is_org_shared: t.boolean,
      is_shared: t.boolean,
      is_starred: t.boolean,
      is_user_deleted: t.boolean,
      last_read: Definitions.Ts,
      latest: t.array(t.union([
        Message,
        t.null
      ])),
      parent_conversation: t.array(t.union([
        Definitions.ChannelReference,
        t.null
      ])),
      pin_count: t.union([
        t.string,
        t.Int
      ]),
      shares: t.array(t.intersection([
        t.type({
          date_create: t.union([
            t.string,
            t.Int
          ]),
          id: Definitions.TeamReference,
          name: t.string,
          team: Team
        }),
        t.partial({
          is_active: t.boolean
        })
      ], "DefinitionsObjsConversationItemsPropertiesSharesItems")),
      unread_count: t.union([
        t.string,
        t.Int
      ]),
      unread_count_display: t.union([
        t.string,
        t.Int
      ]),
      version: t.union([
        t.string,
        t.Int
      ])
    })
  ], "DefinitionsObjsConversationItems")
]));