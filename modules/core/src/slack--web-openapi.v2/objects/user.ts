import * as t from "io-ts";
import * as Definitions from "../definitions";
import { EnterpriseUser } from "./enterprise-user";
import { TeamProfileField } from "./team-profile-field";
import { UserProfile } from "./user-profile";

export const User = t.array(t.union([
  t.intersection([
    t.type({
      id: Definitions.UserId,
      name: t.string,
      profile: UserProfile,
      updated: t.number
    }),
    t.partial({
      color: t.string,
      deleted: t.boolean,
      enterprise_user: EnterpriseUser,
      has_2fa: t.boolean,
      is_admin: t.boolean,
      is_app_user: t.boolean,
      is_bot: t.boolean,
      is_invited_user: t.boolean,
      is_owner: t.boolean,
      is_primary_owner: t.boolean,
      is_restricted: t.boolean,
      is_ultra_restricted: t.boolean,
      locale: t.string,
      presence: t.string,
      real_name: t.string,
      team: Definitions.TeamReference,
      team_id: Definitions.TeamReference,
      team_profile: t.type({
        fields: t.array(TeamProfileField)
      }, "DefinitionsObjsUserItemsPropertiesTeamProfile"),
      two_factor_type: t.string,
      tz: t.array(t.union([
        t.null,
        t.string
      ])),
      tz_label: t.string,
      tz_offset: t.number
    })
  ], "DefinitionsObjsUserItems"),
  t.intersection([
    t.type({
      id: Definitions.UserId,
      name: t.string,
      profile: UserProfile,
      updated: t.number
    }),
    t.partial({
      color: t.string,
      deleted: t.boolean,
      enterprise_user: EnterpriseUser,
      has_2fa: t.boolean,
      is_admin: t.boolean,
      is_app_user: t.boolean,
      is_bot: t.boolean,
      is_owner: t.boolean,
      is_primary_owner: t.boolean,
      is_restricted: t.boolean,
      is_ultra_restricted: t.boolean,
      locale: t.string,
      presence: t.string,
      real_name: t.string,
      team_id: Definitions.TeamReference,
      team_profile: t.type({
        fields: t.array(TeamProfileField)
      }, "DefinitionsObjsUserItemsPropertiesTeamProfile"),
      teams: t.array(Definitions.WorkspaceId),
      two_factor_type: t.string,
      tz: t.array(t.union([
        t.null,
        t.string
      ])),
      tz_label: t.string,
      tz_offset: t.number
    })
  ], "DefinitionsObjsUserItems")
]));