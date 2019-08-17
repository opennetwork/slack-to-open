import * as t from "io-ts";
import * as Definitions from "../definitions";

export const Resources = t.intersection([
  t.type({
    ids: t.array(t.union([
      Definitions.ChannelReference,
      Definitions.TeamReference
    ], "#/definitions/objs_resources_properties_ids_items"))
  }),
  t.partial({
    excluded_ids: t.array(t.union([
      Definitions.ChannelReference,
      Definitions.TeamReference
    ], "#/definitions/objs_resources_properties_excluded_ids_items")),
    wildcard: t.boolean
  })
], "DefinitionsObjsResources");
export type SlackResources = t.TypeOf<typeof Resources>;