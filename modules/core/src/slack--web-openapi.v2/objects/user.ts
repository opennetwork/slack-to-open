import * as t from "io-ts";

export const User = t.array(t.union([
  t.exact(t.intersection([
    t.type({
      deleted: t.boolean,
      id: Definitions.UserId,
      is_app_user: t.boolean,
      is_bot: t.boolean,
      name: t.string,
      profile: Objects.UserProfile,
      updated: t.number
    }),
    t.partial({
      color: t.string,
      enterprise_user: Objects.EnterpriseUser,
      has_2fa: t.boolean,
      is_admin: t.boolean,
      is_invited_user: t.boolean,
      is_owner: t.boolean,
      is_primary_owner: t.boolean,
      is_restricted: t.boolean,
      is_ultra_restricted: t.boolean,
      locale: t.string,
      presence: t.string,
      real_name: t.string,
      team: Definitions.Team,
      team_id: Definitions.Team,
      team_profile: t.exact(t.type({
        fields: t.array(Objects.TeamProfileField)
      })),
      two_factor_type: t.string,
      tz: t.array(t.union([
        t.null,
        t.string
      ])),
      tz_label: t.string,
      tz_offset: t.number
    })
  ])),
  t.exact(t.intersection([
    t.type({
      deleted: t.boolean,
      id: Definitions.UserId,
      is_app_user: t.boolean,
      is_bot: t.boolean,
      is_restricted: t.boolean,
      is_ultra_restricted: t.boolean,
      name: t.string,
      profile: Objects.UserProfile,
      updated: t.number
    }),
    t.partial({
      color: t.string,
      enterprise_user: Objects.EnterpriseUser,
      has_2fa: t.boolean,
      is_admin: t.boolean,
      is_owner: t.boolean,
      is_primary_owner: t.boolean,
      locale: t.string,
      presence: t.string,
      real_name: t.string,
      team_id: Definitions.Team,
      team_profile: t.exact(t.type({
        fields: t.array(Objects.TeamProfileField)
      })),
      teams: t.array(Definitions.WorkspaceId),
      two_factor_type: t.string,
      tz: t.array(t.union([
        t.null,
        t.string
      ])),
      tz_label: t.string,
      tz_offset: t.number
    })
  ]))
]));