import * as t from "io-ts";

export const Ts = t.string;
export type SlackTs = t.TypeOf<typeof Ts>;