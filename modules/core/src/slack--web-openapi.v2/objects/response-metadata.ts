import * as t from "io-ts";

export const ResponseMetadata = t.type({
  next_cursor: t.string
}, "DefinitionsObjsResponseMetadata");