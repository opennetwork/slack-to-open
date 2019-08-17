import * as t from "io-ts";

export const EnterpriseName = t.string;
export type SlackEnterpriseName = t.TypeOf<typeof EnterpriseName>;