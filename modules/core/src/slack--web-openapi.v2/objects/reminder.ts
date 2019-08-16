import * as t from "io-ts";
import * as Definitions from "../definitions";

export const Reminder = t.intersection([
  t.type({
    creator: Definitions.UserId,
    id: Definitions.ReminderId,
    recurring: t.boolean,
    text: t.string,
    user: Definitions.UserId
  }),
  t.partial({
    complete_ts: t.Int,
    time: t.Int
  })
]);