import * as t from "io-ts";

export const TeamReference = t.string;
export type SlackTeamReference = t.TypeOf<typeof TeamReference>;