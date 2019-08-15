import * as t from "io-ts";

export const Resources = t.exact(t.intersection([
  t.type({
    ids: t.array(t.array(t.union([
      Definitions.Channel,
      Definitions.Team
    ])))
  }),
  t.partial({
    excluded_ids: t.array(t.array(t.union([
      Definitions.Channel,
      Definitions.Team
    ]))),
    wildcard: t.boolean
  })
]));