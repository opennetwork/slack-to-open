import * as t from "io-ts";

export const EnterpriseId = t.string;
export type SlackEnterpriseId = t.TypeOf<typeof EnterpriseId>;