import * as t from "io-ts";
import * as Definitions from "../definitions";

export const Subteam = t.intersection([
  t.type({
    auto_type: t.union([
      t.null,
      t.string
    ], "#/definitions/objs_subteam_properties_auto_type"),
    created_by: Definitions.UserId,
    date_create: t.union([
      t.string,
      t.Int
    ]),
    date_delete: t.union([
      t.string,
      t.Int
    ]),
    date_update: t.union([
      t.string,
      t.Int
    ]),
    deleted_by: t.union([
      t.null,
      Definitions.UserId
    ], "#/definitions/objs_subteam_properties_deleted_by"),
    description: t.string,
    enterprise_subteam_id: t.string,
    handle: t.string,
    id: Definitions.SubteamId,
    name: t.string,
    prefs: t.type({
      channels: t.array(Definitions.ChannelId),
      groups: t.array(Definitions.GroupId)
    }, "DefinitionsObjsSubteamPropertiesPrefs"),
    team_id: Definitions.TeamReference,
    updated_by: Definitions.UserId
  }),
  t.partial({
    auto_provision: t.boolean,
    is_external: t.boolean,
    is_subteam: t.boolean,
    is_usergroup: t.boolean,
    user_count: t.union([
      t.string,
      t.Int
    ]),
    users: t.array(Definitions.UserId)
  })
], "DefinitionsObjsSubteam");
export type SlackSubteam = t.TypeOf<typeof Subteam>;