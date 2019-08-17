import * as t from "io-ts";

export const ChannelName = t.string;
export type SlackChannelName = t.TypeOf<typeof ChannelName>;