import * as t from "io-ts";

export const Paging = t.intersection([
  t.type({
    page: t.Int,
    total: t.Int
  }),
  t.partial({
    count: t.Int,
    pages: t.Int,
    per_page: t.Int,
    spill: t.Int
  })
]);