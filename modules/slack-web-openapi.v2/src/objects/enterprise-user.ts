import * as t from "io-ts";
import * as Definitions from "../definitions";

export const EnterpriseUser = t.intersection([
  t.type({
    enterprise_id: Definitions.EnterpriseId,
    enterprise_name: Definitions.EnterpriseName,
    id: Definitions.EnterpriseUserId,
    teams: t.array(Definitions.TeamReference)
  }),
  t.partial({
    is_admin: t.boolean,
    is_owner: t.boolean
  })
], "DefinitionsObjsEnterpriseUser");
export type SlackEnterpriseUser = t.TypeOf<typeof EnterpriseUser>;