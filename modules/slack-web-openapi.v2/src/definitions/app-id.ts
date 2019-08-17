import * as t from "io-ts";

export const AppId = t.string;
export type SlackAppId = t.TypeOf<typeof AppId>;