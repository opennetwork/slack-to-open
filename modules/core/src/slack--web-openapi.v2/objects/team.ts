import * as t from "io-ts";
import * as Definitions from "../definitions";
import { Icon } from "./icon";

export const Team = t.intersection([
  t.type({
    domain: t.string,
    email_domain: t.string,
    icon: Icon,
    id: Definitions.TeamReference,
    name: t.string
  }),
  t.partial({
    archived: t.boolean,
    avatar_base_url: t.string,
    created: t.union([
      t.string,
      t.Int
    ]),
    date_create: t.union([
      t.string,
      t.Int
    ]),
    deleted: t.boolean,
    description: t.string,
    discoverable: t.string,
    enterprise_id: Definitions.EnterpriseId,
    enterprise_name: Definitions.EnterpriseName,
    has_compliance_export: t.boolean,
    is_assigned: t.boolean,
    is_enterprise: t.union([
      t.string,
      t.Int
    ]),
    limit_ts: t.union([
      t.string,
      t.Int
    ]),
    messages_count: t.union([
      t.string,
      t.Int
    ]),
    msg_edit_window_mins: t.union([
      t.string,
      t.Int
    ]),
    over_integrations_limit: t.boolean,
    over_storage_limit: t.boolean,
    plan: t.string
  })
], "DefinitionsObjsTeam");