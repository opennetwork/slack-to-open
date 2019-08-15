import * as t from "io-ts";

export const EnterpriseUser = t.exact(t.type({
  enterprise_id: Definitions.EnterpriseId,
  enterprise_name: Definitions.EnterpriseName,
  id: Definitions.EnterpriseUserId,
  is_admin: t.boolean,
  is_owner: t.boolean,
  teams: t.array(Definitions.Team)
}));