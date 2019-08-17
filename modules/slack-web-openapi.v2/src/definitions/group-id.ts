import * as t from "io-ts";

export const GroupId = t.string;
export type SlackGroupId = t.TypeOf<typeof GroupId>;