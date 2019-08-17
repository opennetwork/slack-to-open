import * as t from "io-ts";

export const DmId = t.string;
export type SlackDmId = t.TypeOf<typeof DmId>;