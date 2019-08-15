import * as t from "io-ts";

export const Team = t.exact(t.intersection([
  t.type({
    domain: t.string,
    email_domain: t.string,
    icon: Objects.Icon,
    id: Definitions.Team,
    name: t.string
  }),
  t.partial({
    archived: t.boolean,
    avatar_base_url: t.string,
    created: t.Int,
    date_create: t.Int,
    deleted: t.boolean,
    description: t.string,
    discoverable: t.string,
    enterprise_id: Definitions.EnterpriseId,
    enterprise_name: Definitions.EnterpriseName,
    has_compliance_export: t.boolean,
    is_assigned: t.boolean,
    is_enterprise: t.Int,
    limit_ts: t.Int,
    messages_count: t.Int,
    msg_edit_window_mins: t.Int,
    over_integrations_limit: t.boolean,
    over_storage_limit: t.boolean,
    plan: t.string
  })
]));