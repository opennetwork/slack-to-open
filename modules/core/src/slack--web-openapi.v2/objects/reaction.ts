import * as t from "io-ts";
import * as Definitions from "../definitions";

export const Reaction = t.type({
  count: t.Int,
  name: t.string,
  users: t.array(Definitions.UserId)
});