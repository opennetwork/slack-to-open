import * as t from "io-ts";
import * as Definitions from "../definitions";

export const Resources = t.intersection([
  t.type({
    ids: t.array(t.array(t.union([
      Definitions.ChannelReference,
      Definitions.TeamReference
    ])))
  }),
  t.partial({
    excluded_ids: t.array(t.array(t.union([
      Definitions.ChannelReference,
      Definitions.TeamReference
    ]))),
    wildcard: t.boolean
  })
], "DefinitionsObjsResources");