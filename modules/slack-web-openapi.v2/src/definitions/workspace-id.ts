import * as t from "io-ts";

export const WorkspaceId = t.string;
export type SlackWorkspaceId = t.TypeOf<typeof WorkspaceId>;