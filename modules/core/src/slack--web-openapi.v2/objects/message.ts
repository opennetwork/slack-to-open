import * as t from "io-ts";
import { Blocks } from "./blocks";
import * as Definitions from "../definitions";
import { Comment } from "./comment";
import { File } from "./file";
import { Reaction } from "./reaction";
import { User } from "./user";
import { UserProfile } from "./user-profile";
import { UserProfileShort } from "./user-profile-short";

export const Message = t.exact(t.intersection([
  t.type({
    text: t.string,
    ts: Definitions.Ts,
    type: t.string
  }),
  t.partial({
    attachments: t.array(t.exact(t.intersection([
      t.type({
        id: t.Int
      }),
      t.partial({
        fallback: t.string,
        image_bytes: t.Int,
        image_height: t.Int,
        image_url: t.string,
        image_width: t.Int
      })
    ]))),
    blocks: Blocks,
    bot_id: t.array(t.union([
      Definitions.BotId,
      t.null
    ])),
    client_msg_id: t.string,
    comment: Comment,
    display_as_bot: t.boolean,
    file: Objects.File,
    files: t.array(Objects.File),
    icons: t.exact(t.partial({
      emoji: t.string
    })),
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
    pinned_to: t.array(Definitions.Channel),
    purpose: t.string,
    reactions: t.array(Objects.Reaction),
    replies: t.array(t.exact(t.type({
      ts: Definitions.Ts,
      user: Definitions.UserId
    }))),
    reply_count: t.Int,
    reply_users: t.array(Definitions.UserId),
    reply_users_count: t.Int,
    source_team: Definitions.WorkspaceId,
    subscribed: t.boolean,
    subtype: t.string,
    team: Definitions.WorkspaceId,
    thread_ts: Definitions.Ts,
    topic: t.string,
    unread_count: t.Int,
    upload: t.boolean,
    user: Definitions.UserId,
    user_profile: Objects.UserProfileShort,
    user_team: Definitions.WorkspaceId,
    username: t.string
  })
]));