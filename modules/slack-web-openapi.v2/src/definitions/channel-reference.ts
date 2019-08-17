import * as t from "io-ts";

export const ChannelReference = t.string;
export type SlackChannelReference = t.TypeOf<typeof ChannelReference>;