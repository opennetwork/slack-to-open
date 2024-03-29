import * as t from "io-ts";
import * as Definitions from "../definitions";

export const Reaction = t.type({
  count: t.union([
    t.string,
    t.Int
  ]),
  name: t.string,
  users: t.array(Definitions.UserId)
}, "DefinitionsObjsReaction");
export type SlackReaction = t.TypeOf<typeof Reaction>;