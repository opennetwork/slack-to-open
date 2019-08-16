import * as t from "io-ts";
import * as Definitions from "../definitions";
import { Message } from "./message";

export const Group = t.intersection([
  t.type({
    created: t.union([
      t.string,
      t.Int
    ]),
    creator: Definitions.UserId,
    id: Definitions.GroupId,
    members: t.array(Definitions.UserId),
    name: t.string,
    name_normalized: t.string,
    purpose: t.type({
      creator: Definitions.TopicPurposeCreator,
      last_set: t.union([
        t.string,
        t.Int
      ]),
      value: t.string
    }, "DefinitionsObjsGroupPropertiesPurpose"),
    topic: t.type({
      creator: Definitions.TopicPurposeCreator,
      last_set: t.union([
        t.string,
        t.Int
      ]),
      value: t.string
    }, "DefinitionsObjsGroupPropertiesTopic")
  }),
  t.partial({
    is_archived: t.boolean,
    is_deleted: t.boolean,
    is_group: t.boolean,
    is_moved: t.union([
      t.string,
      t.Int
    ]),
    is_mpim: t.boolean,
    is_open: t.boolean,
    is_pending_ext_shared: t.boolean,
    last_read: Definitions.Ts,
    latest: t.array(t.union([
      Message,
      t.null
    ])),
    num_members: t.union([
      t.string,
      t.Int
    ]),
    priority: t.number,
    unread_count: t.union([
      t.string,
      t.Int
    ]),
    unread_count_display: t.union([
      t.string,
      t.Int
    ])
  })
], "DefinitionsObjsGroup");