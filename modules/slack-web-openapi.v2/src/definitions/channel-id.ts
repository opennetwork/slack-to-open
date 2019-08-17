import * as t from "io-ts";

export const ChannelId = t.string;
export type SlackChannelId = t.TypeOf<typeof ChannelId>;