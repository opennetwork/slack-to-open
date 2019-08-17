import * as t from "io-ts";
import { Blocks } from "../blocks";
import * as Definitions from "../definitions";
import { Comment } from "./comment";
import { File } from "./file";
import { Reaction } from "./reaction";
import { UserProfileShort } from "./user-profile-short";

export const Message = t.intersection([
  t.type({
    text: t.string,
    ts: Definitions.Ts,
    type: t.string
  }),
  t.partial({
    attachments: t.array(t.intersection([
      t.type({
        id: t.union([
          t.string,
          t.Int
        ])
      }),
      t.partial({
        fallback: t.string,
        image_bytes: t.union([
          t.string,
          t.Int
        ]),
        image_height: t.union([
          t.string,
          t.Int
        ]),
        image_url: t.string,
        image_width: t.union([
          t.string,
          t.Int
        ])
      })
    ], "DefinitionsObjsMessagePropertiesAttachmentsItems")),
    blocks: Blocks,
    bot_id: t.union([
      Definitions.BotId,
      t.null
    ], "#/definitions/objs_message_properties_bot_id"),
    client_msg_id: t.string,
    comment: Comment,
    display_as_bot: t.boolean,
    file: File,
    files: t.array(File),
    icons: t.partial({
      emoji: t.string
    }, "DefinitionsObjsMessagePropertiesIcons"),
    inviter: Definitions.UserId,
    is_delayed_message: t.boolean,
    is_intro: t.boolean,
    is_starred: t.boolean,
    last_read: Definitions.Ts,
    latest_reply: Definitions.Ts,
    name: t.string,
    old_name: t.string,
    parent_user_id: Definitions.UserId,
    permalink: t.string,
    pinned_to: t.array(Definitions.ChannelReference),
    purpose: t.string,
    reactions: t.array(Reaction),
    replies: t.array(t.type({
      ts: Definitions.Ts,
      user: Definitions.UserId
    }, "DefinitionsObjsMessagePropertiesRepliesItems")),
    reply_count: t.union([
      t.string,
      t.Int
    ]),
    reply_users: t.array(Definitions.UserId),
    reply_users_count: t.union([
      t.string,
      t.Int
    ]),
    source_team: Definitions.WorkspaceId,
    subscribed: t.boolean,
    subtype: t.string,
    team: Definitions.WorkspaceId,
    thread_ts: Definitions.Ts,
    topic: t.string,
    unread_count: t.union([
      t.string,
      t.Int
    ]),
    upload: t.boolean,
    user: Definitions.UserId,
    user_profile: UserProfileShort,
    user_team: Definitions.WorkspaceId,
    username: t.string
  })
], "DefinitionsObjsMessage");