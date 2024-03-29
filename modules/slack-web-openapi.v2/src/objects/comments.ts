import * as t from "io-ts";
import { Comment } from "./comment";

export const Comments = t.array(Comment);
export type SlackComments = t.TypeOf<typeof Comments>;