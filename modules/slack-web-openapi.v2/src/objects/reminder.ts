import * as t from "io-ts";
import * as Definitions from "../definitions";

export const Reminder = t.intersection([
  t.type({
    creator: Definitions.UserId,
    id: Definitions.ReminderId,
    text: t.string,
    user: Definitions.UserId
  }),
  t.partial({
    complete_ts: t.union([
      t.string,
      t.Int
    ]),
    recurring: t.boolean,
    time: t.union([
      t.string,
      t.Int
    ])
  })
], "DefinitionsObjsReminder");
export type SlackReminder = t.TypeOf<typeof Reminder>;