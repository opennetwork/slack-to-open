import * as t from "io-ts";

export const UserProfile = t.exact(t.intersection([
  t.type({
    avatar_hash: t.string,
    display_name: t.string,
    display_name_normalized: t.string,
    real_name: t.string,
    real_name_normalized: t.string
  }),
  t.partial({
    always_active: t.boolean,
    api_app_id: Definitions.AppId,
    bot_id: Definitions.BotId,
    email: t.string,
    fields: t.union([
      t.type({

      }),
      t.null,
      t.array(t.type({

      }))
    ]),
    first_name: t.string,
    guest_channels: t.string,
    guest_expiration_ts: t.Int,
    guest_invited_by: t.string,
    image_1024: t.string,
    image_192: t.string,
    image_24: t.string,
    image_32: t.string,
    image_48: t.string,
    image_512: t.string,
    image_72: t.string,
    image_original: t.string,
    is_custom_image: t.boolean,
    last_name: t.string,
    phone: t.string,
    skype: t.string,
    status_emoji: t.string,
    status_expiration: t.Int,
    status_text: t.string,
    status_text_canonical: t.string,
    team: Definitions.WorkspaceId,
    teams: Definitions.WorkspaceId,
    title: t.string
  })
]));