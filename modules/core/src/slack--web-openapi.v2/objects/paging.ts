import * as t from "io-ts";

export const Paging = t.intersection([
  t.type({
    page: t.union([
      t.string,
      t.Int
    ]),
    total: t.union([
      t.string,
      t.Int
    ])
  }),
  t.partial({
    count: t.union([
      t.string,
      t.Int
    ]),
    pages: t.union([
      t.string,
      t.Int
    ]),
    per_page: t.union([
      t.string,
      t.Int
    ]),
    spill: t.union([
      t.string,
      t.Int
    ])
  })
], "DefinitionsObjsPaging");