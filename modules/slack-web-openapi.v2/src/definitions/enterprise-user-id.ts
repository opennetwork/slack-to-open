import * as t from "io-ts";

export const EnterpriseUserId = t.string;
export type SlackEnterpriseUserId = t.TypeOf<typeof EnterpriseUserId>;