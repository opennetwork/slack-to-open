import * as t from "io-ts";

export const BotId = t.string;
export type SlackBotId = t.TypeOf<typeof BotId>;