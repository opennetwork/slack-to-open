import * as t from "io-ts";

export const CommentId = t.string;
export type SlackCommentId = t.TypeOf<typeof CommentId>;