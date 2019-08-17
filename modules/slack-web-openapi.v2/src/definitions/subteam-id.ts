import * as t from "io-ts";

export const SubteamId = t.string;
export type SlackSubteamId = t.TypeOf<typeof SubteamId>;