import * as t from "io-ts";

export const Reaction = t.type({
  count: t.Int,
  name: t.string,
  users: t.array(Definitions.UserId)
});