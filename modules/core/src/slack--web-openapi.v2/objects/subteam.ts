import * as t from "io-ts";
import * as Definitions from "../definitions";

export const Subteam = t.intersection([
  t.type({
    auto_provision: t.boolean,
    auto_type: t.array(t.union([
      t.null,
      t.string
    ])),
    created_by: Definitions.UserId,
    date_create: t.Int,
    date_delete: t.Int,
    date_update: t.Int,
    deleted_by: t.array(t.union([
      t.null,
      Definitions.UserId
    ])),
    description: t.string,
    enterprise_subteam_id: t.string,
    handle: t.string,
    id: Definitions.SubteamId,
    is_external: t.boolean,
    is_subteam: t.boolean,
    is_usergroup: t.boolean,
    name: t.string,
    prefs: t.type({
      channels: t.array(Definitions.ChannelId),
      groups: t.array(Definitions.GroupId)
    }),
    team_id: Definitions.TeamReference,
    updated_by: Definitions.UserId
  }),
  t.partial({
    user_count: t.Int,
    users: t.array(Definitions.UserId)
  })
]);