import * as t from "io-ts";

export const ReminderId = t.string;
export type SlackReminderId = t.TypeOf<typeof ReminderId>;