import * as t from "io-ts";

export const ResponseMetadata = t.exact(t.type({
  next_cursor: t.string
}));