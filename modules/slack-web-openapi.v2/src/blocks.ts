import * as t from "io-ts";

export const Blocks = t.array(t.type({
  type: t.string
}, "DefinitionsBlocksItems"));
export type SlackBlocks = t.TypeOf<typeof Blocks>;