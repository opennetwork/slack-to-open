import * as t from "io-ts";

export const FileId = t.string;
export type SlackFileId = t.TypeOf<typeof FileId>;