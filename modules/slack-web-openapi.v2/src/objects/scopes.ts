import * as t from "io-ts";

export const Scopes = t.array(t.string);
export type SlackScopes = t.TypeOf<typeof Scopes>;