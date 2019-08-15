import { UserID, ChannelID, TS, Team, ChannelName } from "../../definitions";
import { exact, intersection, type, partial, Int, boolean, nullType, union, array, string, number, interface } from "io-ts";
import { Message } from "../message";
import { ChannelPurpose } from "./purpose";

export * from "./purpose";

export const Channel = exact(
  intersection([
    type({
      id: ChannelID,
      name: string,
      created: Int,
      creator: UserID,
      is_channel: boolean,
      is_org_shared: boolean,
      is_private: boolean,
      is_mpim: boolean,
      is_shared: boolean,
      name_normalized: string,
      // TODO this should be a unique array
      members: array(UserID),
      purpose: ChannelPurpose,
      topic: ChannelPurpose,
    }),
    partial({
      accepted_user: UserID,
      is_archived: boolean,
      is_general: boolean,
      is_member: boolean,
      is_moved: Int,
      is_pending_ext_shared: boolean,
      is_read_only: boolean,
      last_read: TS,
      latest: array(union([nullType, Message])),
      num_members: Int,
      // TODO this should be a unique array
      pending_shared: array(Team),
      // TODO this should be a unique array
      previous_names: array(ChannelName),
      priority: number,
      unlinked: Int,
      unread_count: Int,
      unread_count_display: Int
    })
  ])
);
