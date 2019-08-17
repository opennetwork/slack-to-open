import * as t from "io-ts";

export const UserId = t.string;
export type SlackUserId = t.TypeOf<typeof UserId>;