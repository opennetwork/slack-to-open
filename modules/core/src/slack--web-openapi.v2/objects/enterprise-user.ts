import * as t from "io-ts";
import * as Definitions from "../definitions";

export const EnterpriseUser = t.type({
  enterprise_id: Definitions.EnterpriseId,
  enterprise_name: Definitions.EnterpriseName,
  id: Definitions.EnterpriseUserId,
  is_admin: t.boolean,
  is_owner: t.boolean,
  teams: t.array(Definitions.TeamReference)
});